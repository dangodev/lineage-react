/**
 * Collections
 * View products in a grid
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div>
    {props.products.map((product) => (
      <div key={product.id}>
        {product.title}
        <Link to={`/product/${product.attrs.handle}`}>View</Link>
      </div>
    ))}
  </div>
);
