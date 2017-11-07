import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Button from './Button';

import { color, font, grid, layer, transition } from '../lib/theme';

class Cart extends React.Component {
  componentWillMount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.addEventListener('keydown', keydownHandler);
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

  remove(e, id) {
    if (e) { e.preventDefault(); }

    this.props.removeFromCart(id);
  }

  updateQuantity(e, id) {
    this.props.updateQuantity(id, e.target.value);
  }

  isShowing() {
    return this.props.location.pathname === '/cart';
  }

  render() {
    return (
      <div>
        <Inner isShowing={this.isShowing()}>
          <Heading>Cart</Heading>
          <Close href="/" onClick={e => this.closeCart(e)}>✕</Close>
          {this.props.isLoading &&
            <div>
              Loading…
            </div>
          }
          {this.props.isLoading === false &&
            <div>
              {this.props.lineItems.map(lineItem => {console.log(lineItem);return(
                <div key={lineItem.id}>
                  {lineItem.title}
                  <input
                    defaultValue={lineItem.quantity}
                    onChange={e => this.updateQuantity(e, lineItem.id)}
                    type="number"
                  />
                  <Button
                    color="red"
                    small
                    onClick={e => this.remove(e, lineItem.id)}
                  >
                    Remove
                  </Button>
                </div>
              )})}
              {this.props.lineItems.length === 0 && (
                <ZeroState>
                  Cart Empty
                  <small>Go get you somethin’!</small>
                </ZeroState>
              )}
            </div>
          }
          <Actions>
            <Button
              href={this.props.checkoutUrl}
              rel="noopener"
              disabled={this.props.lineItems.length === 0}
            >
              Check Out
            </Button>
            <ShopButton href="/" onClick={e => this.closeCart(e)}>
              Keep Shopping
            </ShopButton>
          </Actions>
          {this.props.featuredCartProduct &&
            <div>
              {this.props.featuredCartProduct.title}
              <Button
                to={`/product/${this.props.featuredCartProduct.handle}`}
                onClick={e => this.addToCart(e)}
              >
                Add To Cart
              </Button>
            </div>
          }
        </Inner>
        <Overlay isShowing={this.isShowing()} onClick={e => this.closeCart(e)} />
      </div>
    );
  }
};

Cart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  checkoutUrl: PropTypes.string,
  featuredCartProduct: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  lineItems: PropTypes.array,
  location: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
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
    backgroundColor: `rgb(${color.white})`,
    bottom: 0,
    maxWidth: '20em',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: grid,
    paddingLeft: grid,
    paddingRight: grid,
    position: 'fixed',
    right: 0,
    top: 0,
    transform: 'translateX(100%, 0)',
    width: '50vw',
    zIndex: layer.cart + 1,
  },
  props => ({
    transform: props.isShowing ? 'translateX(0)' : 'translateX(100%)',
    transition: props.isShowing ? `transform 200ms ${transition.standard}` : `transform 200ms ${transition.standard}, visibility 0ms 200ms`,
    visibility: props.isShowing ? 'visible' : 'hidden',
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
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: grid,
  padding: 0,
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

export default Cart;
