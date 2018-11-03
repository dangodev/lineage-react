import * as React from 'react';
import { navigate } from '@reach/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';
import * as queryString from 'query-string';
import Button from 'components/Button';
import CoffeeData from 'components/CoffeeData';
import Waves from 'components/Waves';
import * as Styled from './styles';

const QUANTITIES = [1, 2, 3, 4, 5];

class ProductView extends React.Component {
  componentWillMount() {
    this.setDefaultVariant(this.props);
    // eslint-disable-next-line no-undef
    if (typeof window !== 'undefined') {
      this.keydown$ = Observable.fromEvent(window, 'keydown')
        .throttleTime(16)
        .subscribe(e => this.keydownHandler(e));
    }
  }

  componentWillReceiveProps(nextProps: any) {
    this.setDefaultVariant(nextProps);
    this.setState({ quantity: 1 }); // go back to 1 quantity on product change
  }

  componentWillUnmount() {
    if (this.keydown$) {
      this.keydown$.unsubscribe();
    }
  }

  state = {
    quantity: 1,
    selectedInterval: '1',
    selectedVariant: {},
  };

  keydown$: any;

  addLineItem = e => {
    if (e) {
      e.preventDefault();
    }

    let lineItem = {
      variantId: this.state.selectedVariant.id,
      quantity: this.state.quantity,
    };

    if (this.shouldShowSubscriptions) {
      lineItem.customAttributes = [
        {
          key: 'shipping_interval_frequency',
          value: this.state.selectedInterval,
        },
        {
          key: 'shipping_interval_unit_type',
          value: this.props.product.metafields.subscriptions.shipping_interval_unit_type,
        },
        {
          key: 'subscription_id',
          value: this.props.product.metafields.subscriptions.subscription_id,
        },
      ];
    }

    this.props.addLineItem(lineItem);
    navigate('/cart');
  };

  close = e => {
    e.preventDefault();
    navigate(this.props.returnTo);
  };

  get flavor() {
    if (
      !this.props.product ||
      !this.props.product.metafields.c_f ||
      !this.props.product.metafields.c_f.color
    ) {
      return 'pink';
    }

    return this.props.product.metafields.c_f.color;
  }

  get subscriptionIntervals() {
    return (
      this.props.product.metafields.subscriptions['shipping_interval_frequency']
        .replace(/\s/g, '')
        .split(',') || []
    );
  }

  get isCoffee() {
    if (!this.props.product) return false;
    return ['coffee', 'coffee beans'].indexOf(this.props.product.productType.toLowerCase()) !== -1;
  }

  get variantID() {
    return queryString.parse(this.props.location.search).variant;
  }

  isSelectedOption = (product: { name: string; value: string }) => {
    const { name, value } = product;
    if (!this.props.product || !this.state.selectedVariant) {
      return false;
    }

    return this.state.selectedVariant.selectedOptions.find(
      option => option.name === name && option.value === value
    );
  };

  keydownHandler = e => {
    if (e.keyCode === 27) {
      this.close(e);
    }
  };

  setDefaultVariant = (props: { product: ShopifyBuy.Product }) => {
    const { product } = props;

    if (!product) {
      return false;
    }

    if (product.variants.length === 1) {
      return this.setState({ selectedVariant: product.variants[0] });
    }

    const selectedVariant =
      product.variants.find(variant => variant.id === this.variantID) || product.variants[0];

    this.setState({
      selectedVariant: selectedVariant || product.variants[0],
    });
  };

  setOption = (name: string, value: string) => {
    function isShallowEqual(v, o) {
      for (var key in v) {
        if (!(key in o) || v[key] !== o[key]) {
          return false;
        }
      }

      for (var key in o) {
        if (!(key in v) || v[key] !== o[key]) {
          return false;
        }
      }

      return true;
    }

    const options = {
      ...this.state.selectedOptions,
      [name]: value,
    };

    const selectedVariant =
      this.props.product.variants.find(variant =>
        isShallowEqual(
          options,
          variant.selectedOptions.reduce((a, b) => ({ ...a, [b.name]: b.value }), {})
        )
      ) || this.props.product.variants[0];

    this.setState({
      selectedOptions: options,
      selectedVariant,
    });

    navigate(`${this.props.location.pathname}?variant=${selectedVariant.id}`, { replace: true });
  };

  setQuantity = quantity => this.setState({ quantity });

  setSelectedInterval = interval => this.setState({ selectedInterval: `${interval}` });

  get shouldShowVariants() {
    const { product } = this.props;

    if (!product) {
      return false;
    }

    return product.options.length > 0 && product.options[0].values.length > 1;
  }

  get shouldShowSubscriptions() {
    return (
      this.props.product &&
      this.props.product.productType.toLowerCase().indexOf('subscription') >= 0
    );
  }

  render() {
    const { isShowing = false, product, returnTo = '/' } = this.props;
    const { selectedInterval, selectedVariant, quantity } = this.state;

    return (
      <Styled.Container isShowing={isShowing}>
        {product && (
          <Styled.Grid>
            <Styled.Modal isShowing={isShowing}>
              <Styled.Image>
                <img alt={product.title} src={product.images[0].src} />
              </Styled.Image>
              <Styled.Close href={returnTo} onClick={e => this.close(e)}>
                ✕
              </Styled.Close>
              <Styled.Info>
                <Styled.CoreInfo>
                  <Styled.Heading>{product.title}</Styled.Heading>
                  {this.isCoffee && (
                    <div>
                      <Styled.Subheading>Notes</Styled.Subheading>
                      <Styled.Notes>{product.tags.map(note => note.value).join(', ')}</Styled.Notes>
                    </div>
                  )}
                  <Styled.Subheading>Description</Styled.Subheading>
                  <Styled.Description
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                </Styled.CoreInfo>
                {this.isCoffee && <CoffeeData metafields={product.metafields} />}
              </Styled.Info>
              <Styled.Selections>
                {this.shouldShowVariants &&
                  product.options.map(option => (
                    <div key={option.id}>
                      <Styled.Subheading>{option.name}</Styled.Subheading>
                      <Styled.OptionList>
                        {option.values.map((value, index) => (
                          <Styled.Option key={value}>
                            <input
                              type="radio"
                              id={`${option.id}-${index}`}
                              name={option.id}
                              defaultChecked={this.isSelectedOption({
                                name: option.name,
                                value: value.value,
                              })}
                              onChange={() => this.setOption(option.name, value.value)}
                              onClickange={() => this.setOption(option.name, value.value)}
                              value={value.value}
                            />
                            <label htmlFor={`${option.id}-${index}`}>{value.value}</label>
                          </Styled.Option>
                        ))}
                      </Styled.OptionList>
                    </div>
                  ))}
                {this.shouldShowSubscriptions && (
                  <div>
                    <Styled.Subheading>Ship Every:</Styled.Subheading>
                    <Styled.OptionList>
                      {this.subscriptionIntervals.map(interval => (
                        <Styled.Option key={`week-${interval}`}>
                          <input
                            type="radio"
                            id={`week-${interval}`}
                            name="subscription-interval"
                            defaultChecked={interval === selectedInterval}
                            onChange={() => this.setSelectedInterval(interval)}
                            value={interval}
                          />
                          <label htmlFor={`week-${interval}`}>
                            {interval} Week
                            {interval !== '1' ? 's' : ''}
                          </label>
                        </Styled.Option>
                      ))}
                    </Styled.OptionList>
                  </div>
                )}
                <Styled.Subheading>Quantity</Styled.Subheading>
                <Styled.Quantity>
                  <Styled.OptionList>
                    {QUANTITIES.map(option => (
                      <Styled.Option key={option}>
                        <input
                          type="radio"
                          id={`quantity-${option}`}
                          name="quantity"
                          defaultChecked={option === quantity}
                          onChange={() => this.setQuantity(option)}
                          value={option}
                        />
                        <label htmlFor={`quantity-${option}`}>{option}</label>
                      </Styled.Option>
                    ))}
                    {/* {this.isCoffee() &&
                      <Styled.QuantityWholesale>
                        Need more? Try 5lb bags, or <Link to="/pages/wholesale">wholesale</Link>.
                      </Styled.QuantityWholesale>
                    } */}
                  </Styled.OptionList>
                </Styled.Quantity>
              </Styled.Selections>
              <Styled.Price>${selectedVariant.price}</Styled.Price>
              <Styled.Actions>
                <Waves width="42.5%" />
                <Button onClick={e => this.addLineItem(e)}>Add to Cart</Button>
              </Styled.Actions>
            </Styled.Modal>
          </Styled.Grid>
        )}
        <Styled.Overlay
          flavor={this.flavor}
          href={returnTo}
          isShowing={isShowing}
          onClick={e => this.close(e)}
        />
      </Styled.Container>
    );
  }
}

export default ProductView;
