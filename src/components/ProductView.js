/**
 * Product Detail View
 * @param {object} product
 */

import React from 'react';
import PropTypes from 'prop-types';

const ProductView = props => (
  <div>
    <h1>{props.product.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: props.product.description }} />
  </div>
);

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductView;
