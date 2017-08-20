/**
 * Cart
 * “Cart.” Rather skeumorphic, don’tcha think?
 */

import React from 'react';

export default (props) => {
  const cart = props.client.fetchCart().then(cart => console.log(cart));

  <div>Cart</div>
};
