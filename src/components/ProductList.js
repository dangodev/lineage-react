/**
 * Product List
 * @param {array} products
 * @param {object} product -  {title, description, images}
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProductView from './ProductView';

const ProductList = (props) => (
  <div>
    {props.products && props.products.map((product) => (
      <div key={product.id}>
        {product.title}
        <Link to={`/product/${product.attrs.handle}`}>View</Link>
      </div>
    ))}
    <ProductView product={props.product} />
  </div>
);

ProductList.defaultProps = {
  products: [],
  product: {},
};

ProductList.propTypes = {
  products: PropTypes.array,
  product: PropTypes.object,
};

export default ProductList;
