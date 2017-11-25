import React from 'react';
import PropTypes from 'prop-types';

import CollectionHeader from 'components/CollectionHeader';
import ProductList from 'components/ProductList';
import Subscriptions from 'components//Subscriptions';
import WholesaleBlock from 'components/WholesaleBlock';

import Styled from './styles';

const Collection = (props) => {
  if (!props.collection) return false;

  const collectionProducts = props.allProducts.filter(product =>
    product.collections.indexOf(props.collection.handle) !== -1);

  return (
    <div>
      <CollectionHeader collection={props.collection} />
      {props.collection.handle === 'coffee' &&
        <Styled.Subheading>Individual Bags</Styled.Subheading>
      }
      <Styled.Container>
        <ProductList products={collectionProducts} isShowing={props.isShowing} />
        {props.collection.handle === 'coffee' &&
          <Subscriptions allProducts={props.allProducts} isShowing={props.isShowing} />
        }
      </Styled.Container>
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


export default Collection;
