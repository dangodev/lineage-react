import * as React from 'react';
import CollectionHeader from 'components/CollectionHeader';
import ProductList from 'components/ProductList';
import Subscriptions from 'components/Subscriptions';
import WholesaleBlock from 'components/WholesaleBlock';
import * as Styled from './styles';

const COFFEE = 'coffee';

const Collection = (props: {
  collection: ShopifyBuy.Collection;
  subscriptionProducts?: ShopifyBuy.Product[];
}) => {
  const { collection, subscriptionProducts } = props;

  if (!collection) {
    return null;
  }

  return (
    <div>
      <CollectionHeader collection={collection} />
      {collection.handle === COFFEE && <Styled.Subheading>Individual Bags</Styled.Subheading>}
      <Styled.Container>
        <ProductList products={collection.products} />
        {collection.handle === COFFEE && <Subscriptions products={subscriptionProducts} />}
      </Styled.Container>
      {collection.handle === COFFEE && <WholesaleBlock />}
    </div>
  );
};

export default Collection;
