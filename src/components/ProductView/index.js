import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import parse from 'url-parse';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

import { formatPrice } from 'lib/tools';

import Button from 'components/Button';
import CoffeeData from 'components/CoffeeData';
import Waves from 'components/Waves';
import Styled from './styles';

const maximumQuantity = 5;

class ProductView extends React.Component {
  constructor(props) {
    super(props);

    const quantities = [];
    for (var n = 1; n <= maximumQuantity; n++) {
      quantities.push(n);
    }

    this.state = {
      quantities,
      quantity: 1,
      selectedVariant: {},
    };

    this.isCoffee = this.isCoffee.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.setOption = this.setOption.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  componentWillMount() {
    this.setDefaultVariant(this.props);
    if (typeof window !== 'undefined') {
      this.keydown$ = Observable.fromEvent(window, 'keydown')
        .throttleTime(16)
        .subscribe(e => this.keydownHandler(e));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultVariant(nextProps);
    this.setState({ quantity: 1 }); // go back to 1 quantity on product change
  }

  componentWillUnmount() {
    if (this.keydown$) {
      this.keydown$.unsubscribe();
    }
  }

  setDefaultVariant(nextProps) {
    if (!nextProps.product) return false;

    const variantID = parse(window.location.href, true).query.variant;
    const selectedVariant = nextProps.product.variants.find(({ id }) => id === parseInt(variantID, 10))
      || nextProps.product.variants[0];

    this.setState({
      option1: selectedVariant.option1,
      option2: selectedVariant.option2,
      option3: selectedVariant.option3,
      selectedVariant: {
        productId: nextProps.product.id,
        productTitle: nextProps.product.title,
        ...selectedVariant,
      },
    });
  }

  setOption(key, value) {
    const newOptions = {
      option1: this.state.option1,
      option2: this.state.option2,
      option3: this.state.option3,
      [key]: value,
    };

    const selectedVariant = this.props.product.variants.find(variant =>
      variant.option1 === newOptions.option1
      && variant.option2 === newOptions.option2
      && variant.option3 === newOptions.option3);

    this.setState({
      [key]: value,
      selectedVariant,
    });

    this.props.history.replace(`${this.props.location.pathname}?variant=${selectedVariant.id}`);
  }

  setQuantity(quantity) {
    this.setState({ quantity });
  }

  getFlavor() {
    if (!this.props.product || !this.props.product.metafields.color) return 'pink';
    return this.props.product.metafields.color;
  }

  addToCart(e) {
    if (e) { e.preventDefault(); }

    this.props.addToCart({
      quantity: this.state.quantity,
      variant: this.state.selectedVariant,
    });
    this.props.history.push('/cart');
  }

  keydownHandler(e) {
    if (e.keyCode === 27) { this.close(e); }
  }

  close(e) {
    e.preventDefault();
    this.props.history.push(this.props.returnTo);
  }

  isCoffee() {
    if (!this.props.product) return false;
    return ['coffee', 'coffee beans'].indexOf(this.props.product.type.toLowerCase()) !== -1;
  }

  shouldShowVariants() {
    if (!this.props.product) return false;

    return this.props.product.options.length > 0 && this.props.product.options[0] !== 'Title';
  }

  render() {
    return (
      <Styled.Container isShowing={this.props.isShowing}>
        {this.props.product &&
          <Styled.Grid>
            <Styled.Modal isShowing={this.props.isShowing}>
              <Styled.Image>
                <img alt={this.props.product.title} src={this.props.product.images[0]} />
              </Styled.Image>
              <Styled.Close href={this.props.returnTo} onClick={e => this.close(e)}>✕</Styled.Close>
              <Styled.Info>
                <Styled.CoreInfo>
                  <Styled.Heading>{this.props.product.title}</Styled.Heading>
                  {this.isCoffee() &&
                    <div>
                      <Styled.Subheading>Notes</Styled.Subheading>
                      <Styled.Notes>{this.props.product.tags.join(', ')}</Styled.Notes>
                    </div>
                  }
                  <Styled.Subheading>Description</Styled.Subheading>
                  <Styled.Description dangerouslySetInnerHTML={{ __html: this.props.product.content }} />
                </Styled.CoreInfo>
                {this.isCoffee() && <CoffeeData metafields={this.props.product.metafields} />}
              </Styled.Info>
              <Styled.Selections>
                {this.shouldShowVariants() &&
                  this.props.product.options.map((option, index) => {
                    const optionIndex = index + 1;
                    return (
                      <div key={option}>
                        <Styled.Subheading>{option}</Styled.Subheading>
                        <Styled.OptionList>
                          {this.props.product.variants
                            .filter(variant => variant[`option${optionIndex}`].length > 0)
                            .map((variant, vIndex) => (
                              <Styled.Option key={variant[`option${optionIndex}`]}>
                                <input
                                  type="radio"
                                  id={`option${optionIndex}-${vIndex}`}
                                  name={`option${optionIndex}`}
                                  defaultChecked={variant[`option${optionIndex}`] === this.state.selectedVariant[`option${optionIndex}`]}
                                  onChange={() => this.setOption(`option${optionIndex}`, variant[`option${optionIndex}`])}
                                  value={variant.id}
                                />
                                <label htmlFor={`option${optionIndex}-${vIndex}`}>
                                  {variant[`option${optionIndex}`]}
                                </label>
                              </Styled.Option>
                            ))
                          }
                        </Styled.OptionList>
                      </div>
                    );
                  })
                }
                <Styled.Subheading>Quantity</Styled.Subheading>
                <Styled.Quantity>
                  <Styled.OptionList>
                    {this.state.quantities.map(quantity => (
                      <Styled.Option key={quantity}>
                        <input
                          type="radio"
                          id={`quantity-${quantity}`}
                          name="quantity"
                          defaultChecked={quantity === this.state.quantity}
                          onChange={() => this.setQuantity(quantity)}
                          value={quantity}
                        />
                        <label htmlFor={`quantity-${quantity}`}>{quantity}</label>
                      </Styled.Option>
                    ))}
                    {this.isCoffee() &&
                      <Styled.QuantityWholesale>
                        Need more? Try 5lb bags, or <Link to="/pages/wholesale">wholesale</Link>.
                      </Styled.QuantityWholesale>
                    }
                  </Styled.OptionList>
                </Styled.Quantity>
              </Styled.Selections>
              <Styled.Price>{formatPrice(this.state.selectedVariant.price)}</Styled.Price>
              <Styled.Actions>
                <Waves width="42.5%" />
                <Button onClick={e => this.addToCart(e)}>Add to Cart</Button>
              </Styled.Actions>
            </Styled.Modal>
          </Styled.Grid>
        }
        <Styled.Overlay
          flavor={this.getFlavor()}
          href={this.props.returnTo}
          isShowing={this.props.isShowing}
          onClick={e => this.close(e)}
        />
      </Styled.Container>
    );
  }
}

ProductView.defaultProps = {
  isShowing: false,
  product: undefined,
  returnTo: '\\',
};

ProductView.propTypes = {
  addToCart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isShowing: PropTypes.bool,
  location: PropTypes.object.isRequired,
  product: PropTypes.object,
  returnTo: PropTypes.string,
};

export default withRouter(ProductView);
