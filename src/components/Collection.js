import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

import CollectionHeader from './CollectionHeader';
import ProductList from './ProductList';

/**
 * Template
 */

const Collection = (props) => {
  if (!props.collection) return false;

  const collectionProducts = props.allProducts.filter(product => product.collections.indexOf(props.collection.handle) !== -1);

  return (
    <div>
      <CollectionHeader collection={props.collection} />
      {props.collection.handle === 'coffee' &&
        <Subheading>Individual Bags</Subheading>
      }
      <Container>
        <ProductList products={collectionProducts} isShowing={props.isShowing} />
      </Container>
    </div>
  );
};

Collection.propTypes = {
  allProducts: PropTypes.array.isRequired,
  collection: PropTypes.object,
  isShowing: PropTypes.bool,
};

Collection.defaultProps = {
  isShowing: false,
  collection: undefined,
};

/**
 * Styles
 */

const Container = glamorous.div({
  backgroundColor: `rgb(${color.offWhite})`,
  paddingBottom: 4 * grid,
  paddingLeft: grid,
  paddingRight: grid,
  paddingTop: 2 * grid,

  '@media (min-width: 600px)': {
    paddingLeft: 2 * grid,
    paddingRight: 2 * grid,
  },
});

const Subheading = glamorous.h3({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  marginBottom: 0,
  marginTop: grid,
  textAlign: 'center',
});

export default Collection;
