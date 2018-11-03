import * as React from 'react';
import ProductList from 'components/ProductList';
import * as Styled from './styles';

const Subscriptions = (props: { isShowing: boolean; products: Product[] }) => {
  const { isShowing, products = [] } = props;

  return (
    <Styled.Container>
      <Styled.Subheading>Coffee Subscriptions</Styled.Subheading>
      <ProductList products={products} isShowing={isShowing} />
    </Styled.Container>
  );
};

export default Subscriptions;
