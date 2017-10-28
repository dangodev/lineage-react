/**
 * Product List
 * @param {array} products
 * @param {object} product -  {title, description, images}
 */

import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, grid } from '../lib/theme';

import ProductCard from './ProductCard';

const ProductList = props => (
  <Container>
    <Grid>
      {props.products && props.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  </Container>
);

ProductList.defaultProps = {
  products: [],
  product: {},
};

ProductList.propTypes = {
  products: PropTypes.array,
  product: PropTypes.object,
};

const Container = glamorous.div({
  backgroundColor: `rgb(${color.offWhite})`,
  paddingBottom: 2 * grid,
  paddingLeft: 2 * grid,
  paddingRight: 2 * grid,
  paddingTop: 2 * grid,
});

const Grid = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridColumnGap: grid,
  gridRowGap: grid,
});

export default ProductList;
