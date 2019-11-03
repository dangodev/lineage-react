import React from 'react';
import PropTypes from 'prop-types';

import CollectionHeader from '../CollectionHeader';
import ProductList from '../ProductList';
import Subscriptions from '../Subscriptions';
import WholesaleBlock from '../WholesaleBlock';

import * as Styled from './styles';

const Collection = props => {
  if (!props.collection) {
    return null;
  }

  return (
    <div>
      <CollectionHeader collection={props.collection} />
      {props.collection.handle === 'coffee' && (
        <Styled.Subheading>Individual Bags</Styled.Subheading>
      )}
      <Styled.Container>
        <ProductList products={props.collection.products} isShowing={props.isShowing} />
        {props.collection.handle === 'coffee' && (
          <Subscriptions products={props.subscriptionProducts} isShowing={props.isShowing} />
        )}
      </Styled.Container>
      {props.collection.handle === 'coffee' && <WholesaleBlock />}
    </div>
  );
};

Collection.defaultProps = {
  isShowing: true,
  collection: undefined,
  subscriptionProducts: undefined,
};

Collection.propTypes = {
  collection: PropTypes.object,
  isShowing: PropTypes.bool,
  subscriptionProducts: PropTypes.array,
};

export default Collection;
