import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import glamorous from 'glamorous';

import Button from './Button';
import CartItem from './CartItem';
import FeaturedCartProduct from './FeaturedCartProduct';
import Waves from './Waves';

import { color, font, grid, layer, transition } from '../lib/theme';

class Cart extends React.Component {
  componentWillMount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.addEventListener('keydown', keydownHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isShowing(nextProps)) {
      document.body.classList.add(scrollLock);
    } else {
      document.body.classList.remove(scrollLock);
    }
  }

  componentWillUnmount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.removeEventListener('keydown', keydownHandler);
  }

  keydownHandler(e) {
    if (this.isShowing() && e.keyCode === 27) {
      this.closeCart();
    }
  }

  addToCart(e) {
    if (e) { e.preventDefault(); }

    this.props.addToCart(e, {
      variant: this.props.featuredCartProduct,
      quantity: 1,
    });
  }

  closeCart(e) {
    if (e) { e.preventDefault(); }

    if (this.props.history.action === 'PUSH') {
      this.props.history.goBack();
    } else {
      this.props.history.push('/collections/coffee');
    }
  }

  isShowing(nextProps = this.props) {
    return nextProps.location.pathname === '/cart';
  }

  render() {
    return (
      <div>
        <Inner isShowing={this.isShowing()}>
          <Heading>
            Cart
            <Count empty={this.props.lineItems.length === 0}>
              {this.props.lineItems.length}
            </Count>
          </Heading>
          <Close href="/" onClick={e => this.closeCart(e)}>✕</Close>
          {this.props.isLoading &&
            <div>
              Loading…
            </div>
          }
          {this.props.isLoading === false &&
            <div>
              {this.props.lineItems.map(lineItem => (
                <CartItem
                  key={lineItem.id}
                  allProducts={this.props.allProducts}
                  lineItem={lineItem}
                  removeLineItem={this.props.removeLineItem}
                  updateLineItem={this.props.updateLineItem}
                />
              ))}
              {this.props.lineItems.length === 0 && (
                <ZeroState>
                  Cart Empty
                  <small>Go get you somethin’!</small>
                </ZeroState>
              )}
            </div>
          }
          {this.props.featuredCartProduct &&
            <FeaturedCartProduct product={this.props.featuredCartProduct} />
          }
          <Actions>
            <WaveContainer>
              <Waves width="55%" />
              <Button
                href={this.props.checkoutUrl}
                rel="noopener"
                disabled={this.props.lineItems.length === 0}
              >
                Check Out
              </Button>
            </WaveContainer>
            <ShopButton href="/" onClick={e => this.closeCart(e)}>
              Keep Shopping
            </ShopButton>
          </Actions>
        </Inner>
        <Overlay isShowing={this.isShowing()} onClick={e => this.closeCart(e)} />
      </div>
    );
  }
};

Cart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  allProducts: PropTypes.array.isRequired,
  checkoutUrl: PropTypes.string,
  featuredCartProduct: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  lineItems: PropTypes.array,
  location: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  checkoutUrl: '/checkout',
  lineItems: [],
};

/**
 * Styles
 */

const Inner = glamorous.div(
  {
    backgroundImage: `linear-gradient(90deg, rgba(${color.white}, 0) ${grid}px, rgb(${color.white}) ${grid}px)`,
    backgroundRepeat: 'repeat-y',
    backgroundSize: '100% 100%',
    bottom: 0,
    maxWidth: '30em',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: grid,
    paddingLeft: grid,
    position: 'fixed',
    right: 0,
    top: 0,
    transform: 'translateX(100%, 0)',
    width: '100%',
    zIndex: layer.cart + 1,

    '@media (min-width: 600px)': {
      widtH: '50vw',
    },
  },
  props => ({
    transform: props.isShowing ? 'translateX(0)' : 'translateX(100%)',
    transition: props.isShowing ? `transform 200ms ${transition.standard}` : `transform 200ms ${transition.standard}, visibility 0ms 200ms`,
    visibility: props.isShowing ? 'visible' : 'hidden',
  })
);

const Count = glamorous.div(
  {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'flex',
    fontSize: font.down2,
    height: 0.625 * grid,
    justifyContent: 'center',
    lineHeight: 1,
    marginLeft: 0.125 * grid,
    width: 0.625 * grid,
  },
  props => ({
    backgroundColor: props.empty ? `rgba(${color.black}, 0.1)` : `rgb(${color.red})`,
    color: props.empty ? `rgb(${color.black}, 0.4)` : `rgb(${color.white})`,
  })
);

const Heading = glamorous.h1({
  alignItems: 'center',
  display: 'flex',
  fontSize: font.down1,
  fontWeight: 700,
  height: 1.5 * grid,
  justifyContent: 'center',
  marginBottom: 0,
  marginTop: 0,
  textTransform: 'uppercase',
});

const Overlay = glamorous.div(
  {
    backgroundColor: `rgb(${color.pink})`,
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: layer.cart,
  },
  props => ({
    opacity: props.isShowing ? 0.8 : 0,
    visibility: props.isShowing ? 'visible' : 'hidden',
    transition: props.isShowing ? 'opacity 200ms' :'opacity 200ms, visibility 0ms 200ms',
  }),
);

const Actions = glamorous.menu({
  alignItems: 'flex-end',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: grid,
  paddingLeft: 0,
  paddingRight: grid,
});

const WaveContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
  width: '100%',
});

const ShopButton = glamorous.a({
  color: `rgb(${color.green})`,
  display: 'block',
  fontSize: font.down2,
  fontWeight: 700,
  marginTop: 0.5 * grid,
  textDecoration: 'none',
  textAlign: 'center',
});

const ZeroState = glamorous.div({
  borderRadius: 0.5 * grid,
  boxShadow: `0 0 0 1px rgba(${color.gray}, 0.25)`,
  color: `rgb(${color.gray})`,
  fontSize: font.up2,
  fontWeight: '500',
  marginBottom: grid,
  marginLeft: grid,
  marginRight: grid,
  paddingBottom: 2 * grid,
  paddingTop: 2 * grid,
  textAlign: 'center',
  textTransform: 'uppercase',

  '& small': {
    display: 'block',
    fontSize: font.down2,
    fontWeight: 400,
    marginTop: 0.25 * grid,
    textTransform: 'none',
  },
});

const Close = glamorous.a({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'grid',
  fontSize: 24,
  fontWeight: 500,
  height: 1.5 * grid,
  justifyContent: 'center',
  lineHeight: 1,
  position: 'absolute',
  right: 0,
  textDecoration: 'none',
  top: 0,
  width: 1.5 * grid,
});

/* State */

const scrollLock = css({
  overflow: 'hidden',
});

export default Cart;
