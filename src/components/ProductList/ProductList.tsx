import * as React from 'react';
import ProductCard from 'components/ProductCard';
import * as Styled from './styles';

const ProductList = (props: { isShowing: boolean; products: Product[] }) => {
  const { isShowing, products = [] } = props;

  return (
    <Styled.Grid>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isShowing={isShowing}
          style={{ transitionDelay: index * 100 }}
        />
      ))}
      {products.length === 0 && <Styled.Zero>No products to display</Styled.Zero>}
    </Styled.Grid>
  );
};

export default ProductList;
