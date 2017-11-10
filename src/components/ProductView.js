import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import glamorous from 'glamorous';
import parse from 'url-parse';

import { color, font, grid, layer, transition } from '../lib/theme';
import { formatPrice } from '../lib/tools';

import Button from './Button';
import CoffeeData from './CoffeeData';
import Waves from './Waves';

/**
 * Template
 */

class ProductView extends React.Component {
  constructor(props) {
    super(props);

    /* Limit quantity to 5 */
    const quantities = [];
    for (var n = 1; n <= 5; n++) {
      quantities.push(n);
    }

    this.state = {
      quantities,
      quantity: 1,
      selectedVariant: {},
    };

    this.isCoffee = this.isCoffee.bind(this);
    this.setOption = this.setOption.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  componentWillMount() {
    this.setDefaultVariant(this.props);
    const keydownHandler = this.keydownHandler.bind(this);
    window.addEventListener('keydown', e => keydownHandler(e));
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultVariant(nextProps);
    this.setState({ quantity: 1 }); // go back to 1 quantity on product change
  }

  componentWillUnmount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.removeEventListener('keydown', e => keydownHandler(e));
  }

  setDefaultVariant(nextProps) {
    if (!nextProps.product) return false;

    /* Set variant from query */
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
    this.setState({ quantity: quantity });
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
    if (e.keyCode === 27) {
      this.close(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.props.history.push(this.props.returnTo);
  }

  isCoffee() {
    if (!this.props.product) return false;

    return [
      'coffee',
      'coffee beans',
    ].indexOf(this.props.product.type.toLowerCase()) !== -1;
  }

  shouldShowVariants() {
    if (!this.props.product) return false;

    return this.props.product.options.length > 0 && this.props.product.options[0] !== 'Title';
  }

  render() {
    return (
      <Container isShowing={this.props.isShowing}>
        {this.props.product &&
          <Grid>
            <Modal isShowing={this.props.isShowing}>
              <Image>
                <img
                  alt={this.props.product.title}
                  src={this.props.product.images[0]}
                />
              </Image>
              <Close href={this.props.returnTo} onClick={e => this.close(e)}>✕</Close>
              <Info>
                <CoreInfo>
                  <Heading>{this.props.product.title}</Heading>
                  {this.isCoffee() &&
                    <div>
                      <Subheading>Notes</Subheading>
                      <Notes>{this.props.product.tags.join(', ')}</Notes>
                    </div>
                  }
                  <Subheading>Description</Subheading>
                  <Description dangerouslySetInnerHTML={{ __html: this.props.product.content }} />
                </CoreInfo>
                {this.isCoffee() && <CoffeeData metafields={this.props.product.metafields} />}
              </Info>
              <Selections>
                {this.shouldShowVariants() &&
                  this.props.product.options.map((option, index) => {
                    const optionIndex = index + 1;
                    return (
                      <div key={option}>
                        <Subheading>{option}</Subheading>
                        <Options>
                          {this.props.product.variants
                            .filter(variant => variant[`option${optionIndex}`].length > 0)
                            .map((variant, vIndex) => (
                              <Option key={variant[`option${optionIndex}`]}>
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
                              </Option>
                            ))
                          }
                        </Options>
                      </div>
                    );
                  })
                }
                <Subheading>Quantity</Subheading>
                <Quantity>
                  <Options>
                    {this.state.quantities.map(quantity => (
                      <Option key={quantity}>
                        <input
                          type="radio"
                          id={`quantity-${quantity}`}
                          name="quantity"
                          defaultChecked={quantity === this.state.quantity}
                          onChange={() => this.setQuantity(quantity)}
                          value={quantity}
                        />
                        <label htmlFor={`quantity-${quantity}`}>{quantity}</label>
                      </Option>
                    ))}
                    {this.isCoffee() &&
                      <QuantityWholesale>
                        Need more? Try 5lb bags, or <Link to="/pages/wholesale">wholesale</Link>.
                      </QuantityWholesale>
                    }
                  </Options>
                </Quantity>
              </Selections>
              <Price>{formatPrice(this.state.selectedVariant.price)}</Price>
              <Actions>
                <Waves width="42.5%" />
                <Button onClick={e => this.addToCart(e)}>
                  Add to Cart
                </Button>
              </Actions>
            </Modal>
          </Grid>
        }
        <Overlay
          flavor={this.getFlavor()}
          href={this.props.returnTo}
          isShowing={this.props.isShowing}
          onClick={e => this.close(e)}
        />
      </Container>
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
  product: PropTypes.object,
  returnTo: PropTypes.string,
};

/**
 * Styles
 */

const Container = glamorous.div(
  {
    height: '100vh',
    left: 0,
    overflowY: 'scroll',
    position: 'fixed',
    right: 0,
    top: 0,
    WebkitOverflowScrolling: 'touch',
    zIndex: layer.modal,
  },
  ({ isShowing }) => ({
    visibility: isShowing ? 'visibile' : 'hidden',
    transition: isShowing ? 'none' : 'visibility 0ms 200ms',
  }),
);

const Grid = glamorous.div({
  marginBottom: grid,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 2 * grid,
  maxWidth: `calc(100vw - ${grid}px)`,
  width: '100vw',
  zIndex: layer.modal + 1,

  '@media (min-width: 600px)': {
    width: '75vw',
  },
});

const Modal = glamorous.div(
  {
    backgroundColor: `rgb(${color.white})`,
    display: 'block',
    paddingBottom: grid,
    position: 'relative',
    transition: `opacity 200ms, transform 200ms ${transition.standard}`,
    zIndex: layer.modal + 1,
  },
  ({ isShowing }) => ({
    opacity: isShowing ? 1 : 0,
    transform: isShowing ? 'translateY(0)' : `translateY(${3 * grid}px)`,
  })
);

const Close = glamorous.a({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'grid',
  fontSize: 28,
  fontWeight: 500,
  height: 2 * grid,
  justifyContent: 'center',
  left: 0,
  lineHeight: 1,
  position: 'fixed',
  textDecoration: 'none',
  top: 0,
  width: 2 * grid,
  zIndex: layer.modal,

  '@media (min-width: 600px)': {
    left: 'auto',
    position: 'absolute',
    right: 0,
  },
});

const Overlay = glamorous.a(
  {
    cursor: 'pointer',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    transition: 'opacity 200ms',
    zIndex: layer.modal,
  },
  ({ flavor, isShowing = false }) => ({
    backgroundColor: flavor === 'white' ? `rgba(${color.black}, 0.7)` : `rgba(${color[flavor]}, 0.7)`,
    opacity: isShowing ? 1 : 0,
  })
);

const Heading = glamorous.h1({
  fontSize: font.up3,
  lineHeight: 1,
  marginBottom: 0.5 * grid,
  marginTop: 0,
  textTransform: 'uppercase',

  '@media (min-width: 600px)': {
    paddingTop: grid,
  },
});

const Image = glamorous.figure({
  borderRadius: 0.5 * grid,
  boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${grid}px rgba(${color.black}, 0.1)`,
  marginLeft: 'auto',
  marginRight: 'auto',
  overflow: 'hidden',
  transform: `translateY(-${grid}px)`,
  width: '87.5%',

  '@media (min-width: 600px)': {
    left: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    transform: `translate(-${2 * grid}px, -${grid}px)`,
    width: 6 * grid,
  },

  '& img': {
    display: 'block',
    height: 'auto',
    width: '100%',
  },
});

const Description = glamorous.div({
  fontSize: font.down1,

  ' & p': {
    lineHeight: 1.8,
    marginBottom: 0,
    marginTop: 0,

    '& + p': {
      marginTop: 0.5 * grid,
    },
  },
});

const Selections = glamorous.div({
  paddingLeft: grid,
  paddingRight: grid,

  '@media (min-width: 600px)': {
    paddingLeft: '25%',
    paddingRight: 0,
  },
});

const Subheading = glamorous.h3({
  fontSize: font.down2,
  letterSpacing: '0.075em',
  marginBottom: 0,
  marginTop: 0.5 * grid,
  textTransform: 'uppercase',
});

const Notes = glamorous.p({
  fontSize: font.down1,
  lineHeight: 1.8,
  marginBottom: 0,
  marginTop: 0,
  textTransform: 'capitalize',
});

const Options = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 0.25 * grid,
  width: '100%',

  '@media (min-width: 600px)': {

    '> * + *': {
      marginLeft: 0.25 * grid,
    },
  },
});

const Option = glamorous.div({
  display: 'block',
  flexGrow: 1,
  lineHeight: 1,
  overflow: 'hidden',
  position: 'relative',

  '@media (min-width: 600px)': {
    flexGrow: 0,
  },

  '& input': {
    position: 'absolute',
    right: '200%',
  },

  '& label': {
    alignItems: 'center',
    boxShadow: `inset 0 0 0 2px rgba(${color.gray}, 1)`,
    color: `rgb(${color.gray})`,
    cursor: 'pointer',
    display: 'flex',
    fontSize: font.down1,
    fontWeight: 500,
    height: grid,
    justifyContent: 'center',
    padding: 0,
    transition: 'background-color 200ms, box-shadow 200ms, color 200ms',

    '@media (min-width: 600px)': {
      width: 2 * grid,
    },
  },

  '& input:checked + label': {
    backgroundColor: `rgb(${color.black})`,
    boxShadow: `inset 0 0 0 2px rgba(${color.gray}, 0)`,
    color: `rgb(${color.white})`,
  },
});

const Info = glamorous.div({
  display: 'flex',
  flexDirection: 'column',

  '@media (min-width: 600px)': {
    flexDirection: 'row',
    paddingLeft: '25%',
  },
});

const CoreInfo = glamorous.div({
  flex: 5,
  marginBottom: grid,
  paddingLeft: grid,
  paddingRight: grid,

  '@media (min-width: 600px)': {
    marginBottom: 0,
    paddingLeft: 0,
  },
});


const Price = glamorous.div({
  fontFamily: font.kaufmann,
  fontSize: font.up3,
  marginTop: grid,
  textAlign: 'center',
});

const Quantity = glamorous.div({
  display: 'flex',
});

const QuantityWholesale = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 100%',
  fontSize: font.down2,
  height: grid,
  justifyContent: 'center',

  '@media (min-width: 600px)': {
    flex: '1 0 auto',
    height: 'auto',
    justifyContent: 'flex-start',
  },

  '& a': {
    color: `rgb(${color.green})`,
    fontWeight: 500,
    textDecoration: 'none',
    width: 'auto',
  },
});

const Actions = glamorous.menu({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: grid,
  padding: 0,
  position: 'relative',
});

export default withRouter(ProductView);
