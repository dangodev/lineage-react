import * as React from 'react';
import FourOhFour from 'pages/404';
import Meta from 'containers/Meta';
import Collection from 'components/Collection';

const CollectionContainer = (props: {
  collection: string;
  collections: ShopifyBuy.Collection[];
}) => {
  const { collection, collections, subscriptionProducts } = props;
  const foundCollection = collections.find(({ handle }) => handle === collection);

  return foundCollection ? (
    <React.Fragment>
      <Meta title={`${foundCollection.title} • Lineage Coffee Roasting`} />
      <Collection collection={foundCollection} subscriptionProducts={subscriptionProducts} />
    </React.Fragment>
  ) : (
    <FourOhFour />
  );
};

export default CollectionContainer;
