import React from 'react';

import ProductList from 'components/ProductList';
import * as Styled from './styles';

interface SubscriptionsProps {
  isShowing: boolean;
  products: ShopifyCustom.Product[];
}

const Subscriptions: React.FunctionComponent<SubscriptionsProps> = ({
  isShowing,
  products = [],
}) => {
  return (
    <Styled.Container>
      <Styled.Subheading>Coffee Subscriptions</Styled.Subheading>
      <ProductList products={products} isShowing={isShowing} />
    </Styled.Container>
  );
};

export default Subscriptions;
