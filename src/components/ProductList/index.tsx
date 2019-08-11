import React from 'react';

import ProductCard from 'components/ProductCard';
import * as Styled from './styles';

interface ProductListProps {
  isShowing: boolean;
  products: ShopifyCustom.Product[];
}

const ProductList: React.FunctionComponent<ProductListProps> = ({ isShowing, products = [] }) => (
  <Styled.Grid>
    {products.map((product, index) => (
      <ProductCard key={product.id} product={product} isShowing={isShowing} delay={index * 100} />
    ))}
    {products.length === 0 && <Styled.Zero>No products to display</Styled.Zero>}
  </Styled.Grid>
);

export default ProductList;
