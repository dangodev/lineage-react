import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import ProductCard from './ProductCard';

import { font, grid } from '../lib/theme';

const ProductList = props => (
  <Grid>
    {props.products.map((product, index) => (
      <ProductCard
        key={product.id}
        product={product}
        isShowing={props.isShowing}
        delay={index * 100}
      />
    ))}
    {props.products.length === 0 &&
      <Zero>
        No products to display
      </Zero>
    }
  </Grid>
);

ProductList.defaultProps = {
  products: [],
};

ProductList.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  products: PropTypes.array,
};

/**
 * Styles
 */

const Grid = glamorous.div({
  display: 'grid',
  gridColumnGap: grid,
  gridRowGap: grid,

  '@media (min-width: 920px)': {
    gridTemplateColumns: '1fr 1fr',
  },
});

const Zero = glamorous.div({
  paddingBottom: grid,
  paddingTop: grid,
  textAlign: 'center',
});

export default ProductList;
