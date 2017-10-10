/**
 * Cart
 * “Cart.” Rather skeumorphic, don’tcha think?
 * @param {boolean} isCartOpen
 * @param {array} cartItems
 */

import React from 'react';
import PropTypes from 'prop-types';

const Cart = props => (
  <div style={{ display: props.location.pathname === '/cart' ? 'block' : 'none' }}>
    {props.cartItems.map((lineItem) => (
      <div key={lineItem.id}>{lineItem.title}</div>
    ))}
    {props.cartItems.length === 0 && (
      <div>No Items</div>
    )}
  </div>
);

Cart.defaultProps = {
  cartItems: [],
};

Cart.propTypes = {
  cartItems: PropTypes.array,
  location: PropTypes.object.isRequired,
};

export default Cart;
