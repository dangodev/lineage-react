/**
 * Product Detail View
 * @param {object} product
 */

import React from 'react';
import PropTypes from 'prop-types';

const ProductView = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

ProductView.defaultProps = {
  product: {
    title: '',
    description: '',
  },
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
