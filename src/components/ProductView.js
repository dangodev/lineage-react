import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';
import parse from 'url-parse';

import { color, font, grid, layer } from '../lib/theme';
import { formatPrice } from '../lib/tools';

import Waves from './Waves';

import bagGreen from '../assets/bag-green.jpg';
import bagPink from '../assets/bag-pink.jpg';
import bagWhite from '../assets/bag-white.jpg';
import bagYellow from '../assets/bag-yellow.jpg';

const bag = {
  green: bagGreen,
  pink: bagPink,
  white: bagWhite,
  yellow: bagYellow,
};

/**
 * Template
 */

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    const productType = this.props.product.type.toLowerCase();

    /* Limit quantity to 5 */
    const quantities = [];
    for (var n = 1; n <= 5; n++) {
      quantities.push(n);
    }

    this.state = {
      isCoffee: productType === 'coffee' || productType === 'coffee beans',
      option1: null,
      option2: null,
      option3: null,
      quantities,
      quantity: 1,
      selectedVariant: null,
    };

    this.goBack.bind(this);
    this.setOption.bind(this);
    this.setQuantity.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      /* Set variant from query */
      const variantID = parse(window.location.href, true).query.variant;
      const selectedVariant = this.props.product.variants.find(({ id }) => id === parseInt(variantID, 10))
        || this.props.product.variants[0];
      this.setState({
        selectedVariant,
        option1: selectedVariant.option1,
        option2: selectedVariant.option2,
        option3: selectedVariant.option3,
      });

      document.body.classList.add(IsShowing);
      window.addEventListener('keydown', e => this.goBack(e));
    }
  }

  componentWillUnmount() {
    document.body.classList.remove(IsShowing);
    window.removeEventListener('keydown', e => this.goBack(e));
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

  addToCart(e) {
    e.preventDefault();
    this.props.addToCart({
      variant: this.state.selectedVariant,
      quantity: this.state.quantity,
    });
  }

  setQuantity(quantity) {
    this.setState({ quantity: quantity });
  }

  goBack(e) {
    if (e.keyCode === 27) {
      this.props.history.push(this.props.returnTo);
    }
  }

  render() {
    return (
      <Container>
        <Grid>
          <Modal>
            <Image>
              <img
                alt={this.props.product.title}
                src={bag[this.props.product.metafields.color]}
              />
            </Image>
            <Close to={this.props.returnTo}>✕</Close>
            <Info>
              <Heading>{this.props.product.title}</Heading>
              {this.state.isCoffee && [
                <Subheading>Notes</Subheading>,
                <Notes>{this.props.product.tags.join(', ')}</Notes>,
              ]}
              <Subheading>Description</Subheading>
              {/* <div dangerouslySetInnerHTML={{ __html: this.props.product.content }} /> */}
              <Description>
                <p>
                  Way to plant, Ann! What, so the guy we are meeting with can’t
                  even grow his own hair? COME ON! Taste the happy, Michael.
                  Taste it. It tastes kind of like sad. Everything they do is
                  so dramatic and flamboyant.
                </p>
              </Description>
              {this.props.product.options.length > 0 && this.props.product.options[0] !== 'Title' &&
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
                  <QuantityWholesale>
                    Need more? Try 5lb bags, or <Link to="/pages/wholesale">wholesale</Link>.
                  </QuantityWholesale>
                </Options>
              </Quantity>
            </Info>
            <Price>{formatPrice(this.state.selectedVariant.price)}</Price>
            <Actions>
              <Waves width="42.5%" />
              <Button onClick={e => this.addToCart(e)}>
                Add to Cart
              </Button>
            </Actions>
            {this.state.isCoffee &&
              <Data>
                <Subheading>Deets</Subheading>
                <Stats>
                  <Key>Elevation</Key>
                  <Value>{this.props.product.metafields.elevation}</Value>
                  <Key>Origin</Key>
                  <Value>{this.props.product.metafields.country}</Value>
                  <Key>Farm</Key>
                  <Value>{this.props.product.metafields.grower}</Value>
                  <Key>Variety</Key>
                  <Value>{this.props.product.metafields.variety}</Value>
                  <Key>Size</Key>
                  <Value>{this.props.product.metafields.size}</Value>
                  <Key>Process</Key>
                  <Value>{this.props.product.metafields.processing_method}</Value>
                  <Key>Freshness Peak</Key>
                  <Value>{this.props.product.metafields.peak_flavor}</Value>
                </Stats>
              </Data>
            }
          </Modal>
        </Grid>
        <Overlay to={this.props.returnTo} flavor={this.props.product.metafields.color} />
      </Container>
    );
  }
}

ProductView.defaultProps = {
  returnTo: '\\',
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
  returnTo: PropTypes.string,
};

/**
 * Styles
 */

const Container = glamorous.div({
  height: '100vh',
  left: 0,
  overflowY: 'scroll',
  position: 'fixed',
  right: 0,
  top: 0,
  WebkitOverflowScrolling: 'touch',
  zIndex: layer.modal,
});

const Grid = glamorous.div({
  marginBottom: 2 * grid,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 2 * grid,
  maxWidth: `calc(100vw - ${grid}px)`,
  width: '75vw',
  zIndex: layer.modal + 1,
});

const Modal = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  display: 'block',
  paddingBottom: 1.5 * grid,
  paddingRight: 1.5 * grid,
  paddingTop: grid,
  position: 'relative',
  zIndex: layer.modal + 1,
});

const Close = glamorous(Link)({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'grid',
  fontSize: 28,
  fontWeight: 500,
  height: 2 * grid,
  justifyContent: 'center',
  lineHeight: 1,
  position: 'absolute',
  right: 0,
  textDecoration: 'none',
  top: 0,
  width: 2 * grid,
  zIndex: layer.base,
});

const Overlay = glamorous(Link)(
  {
    backgroundColor: `rgba(${color.black}, 0.4)`,
    cursor: 'pointer',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: layer.modal,
  },
  ({ flavor = 'black' }) => ({
    backgroundColor: `rgba(${color[flavor]}, 0.7)`,
  })
);

const Heading = glamorous.h1({
  fontSize: font.up3,
  lineHeight: 1,
  marginBottom: 0.5 * grid,
  marginTop: 0,
  textTransform: 'uppercase',
});

const Image = glamorous.div({
  left: 0,
  position: 'absolute',
  top: 0,
  maxWidth: 5 * grid,
  width: '25%',

  '& img': {
    height: 'auto',
    transform: `translate(-${0.5 * grid}px, -${0.5 * grid}px)`,
    maxWidth: '100%',
  },
});

const Description = glamorous.div({
  fontSize: font.down1,
  paddingRight: `calc(32.5% + ${2 * grid}px)`,

  ' & p': {
    lineHeight: 1.8,
    marginBottom: 0,
    marginTop: 0,

    '& + p': {
      marginTop: 0.5 * grid,
    },
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
  marginTop: 0.25 * grid,
  flexWrap: 'wrap',

  '> * + *': {
    marginLeft: 0.25 * grid,
  },
});

const Option = glamorous.div({
  display: 'block',
  lineHeight: 1,
  overflow: 'hidden',
  position: 'relative',

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
    width: 2 * grid,
  },

  '& input:checked + label': {
    backgroundColor: `rgb(${color.black})`,
    boxShadow: `inset 0 0 0 2px rgba(${color.gray}, 0)`,
    color: `rgb(${color.white})`,
  },
});

const Info = glamorous.div({
  paddingLeft: '25%',
});

const Data = glamorous.div({
  backgroundColor: `rgb(${color.offwhite})`,
  padding: grid,
  position: 'absolute',
  right: 0,
  top: 0,
  width: '32.5%',
});

const Stats = glamorous.dl({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: font.down2,
  justifyContent: 'space-apart',
});

const Key = glamorous.dt({
  fontWeight: 500,
  margin: 0,
  paddingTop: 0.25 * grid,
  width: '50%',
});

const Price = glamorous.div({
  fontFamily: font.kaufmann,
  fontSize: font.up3,
  marginTop: grid,
  textAlign: 'center',
});

const Value = glamorous.dd({
  margin: 0,
  paddingTop: 0.25 * grid,
  textAlign: 'right',
  width: '50%',
});

const Quantity = glamorous.div({
  display: 'flex',
});

const QuantityWholesale = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  fontSize: font.down2,

  '& a': {
    color: `rgb(${color.green})`,
    fontWeight: 500,
    textDecoration: 'none',
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

const Button = glamorous.button({
  alignItems: 'center',
  appearance: 'none',
  backgroundColor: `rgb(${color.blueT})`,
  border: 'none',
  color: `rgb(${color.black})`,
  cursor: 'pointer',
  display: 'flex',
  fontFamily: font.din,
  fontSize: '1em',
  fontWeight: 700,
  height: 1.5 * grid,
  justifyContent: 'center',
  padding: 0,
  textTransform: 'uppercase',
  width: 6 * grid,
});

/* State */

const IsShowing = css({
  height: '100vw',
  overflow: 'hidden',
});

export default withRouter(ProductView);
