import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, grid, layer, transition } from '../lib/theme';

const Cart = props => {
  const isShowing = props.location.pathname === '/cart';
  const navigate = (e) => {
    e.preventDefault();
    if (props.history.action === 'PUSH') {
      return props.history.goBack();
    }
    return props.history.push('/');
  };

  return (
    <div>
      <Inner isShowing={isShowing}>
        <Close href="/" onClick={navigate}>✕</Close>
        {props.cartItems.map((lineItem) => (
          <div key={lineItem.id}>{lineItem.title}</div>
        ))}
        {props.cartItems.length === 0 && (
          <div>No Items</div>
        )}
      </Inner>
      <Overlay isShowing={isShowing} />
    </div>
  );
};

Cart.defaultProps = {
  cartItems: [],
};

Cart.propTypes = {
  cartItems: PropTypes.array,
  location: PropTypes.object.isRequired,
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
    backgroundColor: `rgb(${color.black})`,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'fixed',
    right: 0,
    top: 0,
    transition: 'opacity 200ms',
    zIndex: layer.cart,
  },
  props => ({
    opacity: props.isShowing ? 0.8 : 0,
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
