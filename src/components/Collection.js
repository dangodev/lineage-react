import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

import CollectionHeader from './CollectionHeader';
import ProductList from './ProductList';
import Subscriptions from './Subscriptions';
import WholesaleBlock from './WholesaleBlock';

/**
 * Template
 */

const Collection = (props) => {
  if (!props.collection) return false;

  const collectionProducts = props.allProducts.filter(product =>
    product.collections.indexOf(props.collection.handle) !== -1);

  return (
    <div>
      <CollectionHeader collection={props.collection} />
      {props.collection.handle === 'coffee' &&
        <Subheading>Individual Bags</Subheading>
      }
      <Container>
        <ProductList products={collectionProducts} isShowing={props.isShowing} />
        {props.collection.handle === 'coffee' &&
          <Subscriptions allProducts={props.allProducts} isShowing={props.isShowing} />
        }
      </Container>
      {props.collection.handle === 'coffee' &&
        <WholesaleBlock />
      }
    </div>
  );
};

Collection.defaultProps = {
  isShowing: true,
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
  paddingBottom: 3 * grid,
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
