import React from 'react';
import PropTypes from 'prop-types';

import ProductCard from '../ProductCard';
import * as Styled from './styles';

const ProductList = props => (
  <Styled.Grid>
    {props.products.map((product, index) => (
      <ProductCard
        key={product.id}
        product={product}
        isShowing={props.isShowing}
        delay={index * 100}
      />
    ))}
    {props.products.length === 0 && <Styled.Zero>No products to display</Styled.Zero>}
  </Styled.Grid>
);

ProductList.defaultProps = {
  products: [],
};

ProductList.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  products: PropTypes.array,
};

export default ProductList;
