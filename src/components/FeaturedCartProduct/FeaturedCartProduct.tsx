import * as React from 'react';
import * as Styled from './styles';

const FeaturedCartProduct = (props: { product: Product }) => {
  const { product } = props;

  const productType = product.productType.toLowerCase();

  return (
    <Styled.Container>
      <Styled.Label color={product.metafields.c_f.color}>Featured Item</Styled.Label>
      <Styled.Grid>
        <Styled.ProductInfo>
          <Styled.Image src={product.featured_image} alt={product.title} />
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
