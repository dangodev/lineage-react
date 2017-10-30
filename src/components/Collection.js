import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, grid } from '../lib/theme';

import CollectionHeader from './CollectionHeader';
import ProductCard from './ProductCard';

/**
 * Template
 */

const Collection = (props) => {
  if (!props.collection) return false;

  const collectionProducts = props.allProducts.filter(product => product.collections.indexOf(props.collection.handle) !== -1);

  return (
    <div>
      <CollectionHeader collection={props.collection} />
      <Container>
        <Grid>
          {collectionProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isShowing={props.isShowing}
              delay={index * 100}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
};

Collection.defaultProps = {
  isShowing: false,
  collection: undefined,
};

Collection.propTypes = {
  allProducts: PropTypes.array.isRequired,
  collection: PropTypes.object,
  isShowing: PropTypes.bool,
};

/**
 * Styles
 */

const Container = glamorous.div({
  backgroundColor: `rgb(${color.offWhite})`,
  paddingBottom: 4 * grid,
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

export default Collection;
