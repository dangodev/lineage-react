/**
 * Cart
 * “Cart.” Rather skeumorphic, don’tcha think?
 * @param {boolean} isCartOpen
 * @param {array} cartItems
 */

import React from 'react';
import PropTypes from 'prop-types';

const Cart = props => (
  <div style={props.isCartOpen ? { display: 'block' } : { display: 'none' }}>
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
  isCartOpen: false,
};

Cart.propTypes = {
  cartItems: PropTypes.array,
  isCartOpen: PropTypes.bool,
};

export default Cart;
