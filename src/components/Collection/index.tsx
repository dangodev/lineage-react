import React from 'react';

import CollectionHeader from 'components/CollectionHeader';
import ProductList from 'components/ProductList';
import Subscriptions from 'components/Subscriptions';
import WholesaleBlock from 'components/WholesaleBlock';

import * as Styled from './styles';

interface CollectionProps {
  collection?: ShopifyCustom.CollectionWithProducts;
  isShowing: boolean;
  subscriptionProducts: ShopifyCustom.Product[];
}

const Collection: React.FunctionComponent<CollectionProps> = ({
  collection,
  isShowing = true,
  subscriptionProducts,
}) => {
  if (!collection) {
    return null;
  }

  return (
    <div>
      <CollectionHeader collection={collection} />
      {collection.handle === 'coffee' && <Styled.Subheading>Individual Bags</Styled.Subheading>}
      <Styled.Container>
        <ProductList products={collection.products} isShowing={isShowing} />
        {collection.handle === 'coffee' && (
          <Subscriptions products={subscriptionProducts} isShowing={isShowing} />
        )}
      </Styled.Container>
      {collection.handle === 'coffee' && <WholesaleBlock />}
    </div>
  );
};

export default Collection;
