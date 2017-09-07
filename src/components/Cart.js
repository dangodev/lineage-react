/**
 * Cart
 * “Cart.” Rather skeumorphic, don’tcha think?
 */

import React from 'react';
import styled from 'styled-components';

export default props => (
  <div style={props.isCartOpen ? { display: 'block' } : { display: 'none' }}>
    {props.cart.lineItems.length > 0 && props.cart.lineItems.map((lineItem) => (
      <div key={lineItem.id}>{lineItem.title}</div>
    ))}
    {props.cart.lineItems.length === 0 && (
      <div>No Items</div>
    )}
  </div>
);
