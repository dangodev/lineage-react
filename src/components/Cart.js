import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Button from './Button';

import { color, grid, layer, transition } from '../lib/theme';

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

    console.log(this.featuredItem());

    this.props.addToCart(e, {
      variant: this.featuredItem().variants[0],
      quantity: 1,
    });
  }

  closeCart(e) {
    if (e) { e.preventDefault(); }

    if (this.props.history.action === 'PUSH') {
      this.props.history.goBack();
    } else {
      this.props.history.push('/');
    }
  }

  remove(e, id) {
    if (e) { e.preventDefault(); }

    this.props.removeFromCart(id);
  }

  updateQuantity(e, id) {
    this.props.updateQuantity(id, e.target.value);
  }

  featuredItem() {
    return this.props.collections
      .find(collection => collection.handle === 'cart')
      .products[0];
  }

  isShowing() {
    return this.props.location.pathname === '/cart';
  }

  render() {
    return (
      <div>
        <Inner isShowing={this.isShowing()}>
          <Close href="/" onClick={e => this.closeCart(e)}>✕</Close>
          {this.props.isLoading &&
            <div>
              Loading…
            </div>
          }
          {this.props.isLoading === false &&
            <div>
              {this.props.lineItems.map(lineItem => (
                <div key={lineItem.id}>
                  {lineItem.title}
                  <input
                    defaultValue={lineItem.quantity}
                    onChange={e => this.updateQuantity(e, lineItem.id)}
                    type="number"
                  />
                  <Button color="red" small onClick={e => this.remove(e, lineItem.id)}>Remove</Button>
                </div>
              ))}
              {this.props.lineItems.length === 0 && (
                <div>No Items</div>
              )}
            </div>
          }
          {this.props.featuredProduct &&
            <div>
              {this.props.featuredProduct.title}
              <Button
                to={`/product/${this.props.featuredProduct.handle}`}
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
  featuredProduct: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  lineItems: PropTypes.array,
  location: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

Cart.defaultProps = {
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
    padding: grid,
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
