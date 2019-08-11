import React from 'react';

import { color as themeColor } from 'lib/theme';
import * as Styled from './styles';

interface FeaturedCartProductProps {
  product: ShopifyCustom.Product;
}

const FeaturedCartProduct: React.FunctionComponent<FeaturedCartProductProps> = ({ product }) => {
  const productType = product.productType.toLowerCase();
  const color = product.metafields.c_f.color as keyof typeof themeColor;

  return (
    <Styled.Container>
      <Styled.Label color={color}>Featured Item</Styled.Label>
      <Styled.Grid>
        <Styled.ProductInfo>
          <Styled.Image src={product.selectedVariantImage.src} alt={product.title} />
          <Styled.Heading>{product.title}</Styled.Heading>
          {(productType === 'coffee' || productType === 'coffee beans') && (
            <Styled.Notes>{product.tags.join(' / ')}</Styled.Notes>
          )}
          <Styled.Price>${product.variants[0].price}</Styled.Price>
        </Styled.ProductInfo>
        <Styled.ViewProduct to={`/products/${product.handle}`}>View</Styled.ViewProduct>
      </Styled.Grid>
    </Styled.Container>
  );
};

export default FeaturedCartProduct;
