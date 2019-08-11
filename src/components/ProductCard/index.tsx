import React from 'react';

import { color as themeColor } from 'lib/theme';
import * as Styled from './styles';

interface ProductCardProps {
  delay?: number;
  isShowing?: boolean;
  product: ShopifyCustom.Product;
}

const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  delay = 0,
  isShowing = false,
  product,
  ...props
}) => {
  const productType = product.productType.toLowerCase();
  const { altitude, color, country } = product.metafields.c_f || '';

  return (
    <Styled.Container
      flavor={color as keyof typeof themeColor}
      to={`/products/${product.handle}`}
      isShowing={isShowing}
      delay={delay}
      {...props}
    >
      <Styled.Image>
        <img alt={product.title} src={product.images[0].src} />
      </Styled.Image>
      <Styled.Inner>
        <Styled.Heading>{product.title}</Styled.Heading>
        {(productType === 'coffee' || productType === 'coffee beans') && country && altitude && (
          <Styled.Meta>
            {country} / {altitude}m
          </Styled.Meta>
        )}
        {(productType === 'coffee' || productType === 'coffee beans') && [
          <Styled.NoteHeading key="notes-heading">Tasting Notes</Styled.NoteHeading>,
          <Styled.NoteList key="notes">
            {product.tags.map(({ value }: { value: string }) => (
              <Styled.Note key={value}>{value}</Styled.Note>
            ))}
          </Styled.NoteList>,
        ]}
        {productType !== 'coffee' && productType !== 'coffee beans' && (
          <Styled.Content
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml,
            }}
          />
        )}
        <Styled.Colophon>
          <Styled.Price>${product.variants[0].price}</Styled.Price>
          <Styled.HoverLink>View</Styled.HoverLink>
        </Styled.Colophon>
      </Styled.Inner>
    </Styled.Container>
  );
};

export default ProductCard;
