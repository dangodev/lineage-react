/**
 * Product
 * Product Shopify view
 */

import React from 'react';

export default props => {
  const product = Object.assign({
    title: '',
    description: '',
  }, props.product);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};
