import React, { SyntheticEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Button from 'components/Button';
import CoffeeData from 'components/CoffeeData';
import Waves from 'components/Waves';
import { color } from 'lib/theme';
import { isShallowEqual } from 'utils/shallow-equal';
import * as Styled from './styles';

interface ProductViewProps extends RouteComponentProps {
  addLineItem: (lineItem: ShopifyBuy.AttributeInput) => void;
  isShowing: boolean;
  product?: ShopifyCustom.Product;
  returnTo: string;
}

interface ProductViewState {
  quantities: number[];
  quantity: number;
  selectedInterval: string;
  selectedOptions?: { [key: string]: string };
  selectedVariant?: ShopifyBuy.ProductVariant;
}

class ProductView extends React.Component<ProductViewProps, ProductViewState> {
  static defaultProps = {
    isShowing: false,
    returnTo: '\\',
  };

  componentDidMount() {
    this.setDefaultVariant(this.props);
    window.addEventListener('keydown', this.keydownHandler);
  }

  UNSAFE_componentWillReceiveProps(nextProps: ProductViewProps) {
    this.setDefaultVariant(nextProps);
    this.setState({ quantity: 1 }); // go back to 1 quantity on product change
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  state: ProductViewState = {
    quantities: [1, 2, 3, 4, 5],
    quantity: 1,
    selectedInterval: '1',
    selectedVariant: this.props.product && this.props.product.variants[0],
  };

  addLineItem = (e?: SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!this.state.selectedVariant || !this.props.product) {
      return;
    }

    const lineItem: ShopifyBuy.AttributeInput = {
      variantId: `${this.state.selectedVariant.id}`,
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
    this.props.history.push('/cart');
  };

  close = (e: SyntheticEvent | KeyboardEvent) => {
    e.preventDefault();
    this.props.history.push(this.props.returnTo);
  };

  get flavor(): keyof typeof color {
    const { product } = this.props;

    if (!product || !product.metafields.c_f || !product.metafields.c_f.color) {
      return 'pink';
    }
    return product.metafields.c_f.color as keyof typeof color;
  }

  isSelectedOption = ({ name, value }: { name: string; value: string }): boolean => {
    if (!this.props.product || !this.state.selectedVariant) {
      return false;
    }

    return (
      this.state.selectedVariant.selectedOptions.findIndex(
        option => option.name === name && option.value === value
      ) !== -1
    );
  };

  keydownHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.close(e);
    }
  };

  setDefaultVariant = ({ product }: ProductViewProps) => {
    if (!product) {
      return;
    }

    if (product.variants.length === 1) {
      this.setState({ selectedVariant: product.variants[0] });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const variantID = params.get('variant') || undefined;
    const selectedVariant =
      product.variants.find(variant => variant.id === variantID) || product.variants[0];

    this.setState({
      selectedVariant: selectedVariant || product.variants[0],
    });
  };

  setOption = (name: string, value: string) => {
    const { product } = this.props;

    if (!product) {
      return;
    }

    const options = { ...this.state.selectedOptions, [name]: value };

    const selectedVariant =
      product.variants.find(variant =>
        isShallowEqual(
          options,
          variant.optionValues.reduce((a, b) => ({ ...a, [b.name]: b.value }), {})
        )
      ) || product.variants[0];

    this.setState({ selectedOptions: options, selectedVariant });

    this.props.history.replace(`${this.props.location.pathname}?variant=${selectedVariant.id}`);
  };

  setQuantity = (quantity: number) => this.setState({ quantity });

  setSelectedInterval = (interval: string) => this.setState({ selectedInterval: `${interval}` });

  get shouldShowVariants() {
    if (!this.props.product) {
      return false;
    }

    return this.props.product.options.length > 0 && this.props.product.options[0].values.length > 1;
  }

  get shouldShowSubscriptions() {
    return (
      this.props.product &&
      this.props.product.productType.toLowerCase().indexOf('subscription') >= 0
    );
  }

  render() {
    const { isShowing, product, returnTo } = this.props;
    const {
      quantities,
      quantity,
      selectedInterval,
      selectedVariant = product && product.variants[0],
    } = this.state;
    const isCoffee = !this.props.product
      ? false
      : ['coffee', 'coffee beans'].indexOf(this.props.product.productType.toLowerCase()) !== -1;
    const subscriptionIntervals: string[] =
      product && typeof product.metafields.subscriptions.shipping_interval_frequency === 'string'
        ? product.metafields.subscriptions.shipping_interval_frequency.replace(/\s/g, '').split(',')
        : [];

    return (
      <Styled.Container isShowing={isShowing}>
        {product && (
          <Styled.Grid>
            <Styled.Modal isShowing={isShowing}>
              <Styled.Image>
                <img alt={product.title} src={product.images[0].src} />
              </Styled.Image>
              <Styled.Close href={returnTo} onClick={this.close}>
                ✕
              </Styled.Close>
              <Styled.Info>
                <Styled.CoreInfo>
                  <Styled.Heading>{product.title}</Styled.Heading>
                  {isCoffee && (
                    <div>
                      <Styled.Subheading>Notes</Styled.Subheading>
                      <Styled.Notes>
                        {product.tags.map(({ value }: { value: string }) => value).join(', ')}
                      </Styled.Notes>
                    </div>
                  )}
                  <Styled.Subheading>Description</Styled.Subheading>
                  <Styled.Description
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </Styled.CoreInfo>
                {isCoffee && <CoffeeData metafields={product.metafields} />}
              </Styled.Info>
              <Styled.Selections>
                {this.shouldShowVariants &&
                  product.options.map(option => (
                    <div key={option.name}>
                      <Styled.Subheading>{option.name}</Styled.Subheading>
                      <Styled.OptionList>
                        {option.values.map(value => (
                          <Styled.Option key={value.option_id}>
                            <input
                              type="radio"
                              id={`${option.name}-${value.option_id}`}
                              name={option.name}
                              defaultChecked={this.isSelectedOption({
                                name: option.name,
                                value: value.value,
                              })}
                              onChange={() => this.setOption(option.name, value.value)}
                              onClick={() => this.setOption(option.name, value.value)}
                              value={value.value}
                            />
                            <label htmlFor={`${option.name}-${value.option_id}`}>
                              {value.value}
                            </label>
                          </Styled.Option>
                        ))}
                      </Styled.OptionList>
                    </div>
                  ))}
                {this.shouldShowSubscriptions && (
                  <div>
                    <Styled.Subheading>Ship Every:</Styled.Subheading>
                    <Styled.OptionList>
                      {subscriptionIntervals.map(interval => (
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
                    {quantities.map(q => (
                      <Styled.Option key={q}>
                        <input
                          type="radio"
                          id={`quantity-${q}`}
                          name="quantity"
                          defaultChecked={q === quantity}
                          onChange={() => this.setQuantity(q)}
                          value={q}
                        />
                        <label htmlFor={`quantity-${quantity}`}>{quantity}</label>
                      </Styled.Option>
                    ))}
                    {/* {isCoffee() &&
                      <Styled.QuantityWholesale>
                        Need more? Try 5lb bags, or <Link to="/pages/wholesale">wholesale</Link>.
                      </Styled.QuantityWholesale>
                    } */}
                  </Styled.OptionList>
                </Styled.Quantity>
              </Styled.Selections>
              <Styled.Price>${(selectedVariant && selectedVariant.price) || ''}</Styled.Price>
              <Styled.Actions>
                <Waves width="42.5%" />
                <Button onClick={this.addLineItem}>Add to Cart</Button>
              </Styled.Actions>
            </Styled.Modal>
          </Styled.Grid>
        )}
        <Styled.Overlay
          flavor={this.flavor}
          href={returnTo}
          isShowing={isShowing}
          onClick={this.close}
        />
      </Styled.Container>
    );
  }
}

export default withRouter(ProductView);
