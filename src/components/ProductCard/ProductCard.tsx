import * as React from 'react';
import * as Styled from './styles';

const COFFEE = 'coffee';
const COFFEE_BEANS = 'coffee beans';

const ProductCard = (props: { isShowing: boolean; product: Product }) => {
  const { isShowing = false, product, ...rest } = props;
  const productType = product.productType.toLowerCase();
  const { altitude, color, country } = product.metafields.c_f;

  return (
    <Styled.Container
      {...rest}
      flavor={color}
      to={`/products/${product.handle}`}
      isShowing={isShowing}
    >
      <Styled.Image>
        <img alt={product.title} src={product.images[0].src} />
      </Styled.Image>
      <Styled.Inner>
        <Styled.Heading>{product.title}</Styled.Heading>
        {(productType === COFFEE || productType === COFFEE_BEANS) &&
          country &&
          altitude && (
            <Styled.Meta>
              {country} / {altitude}m
            </Styled.Meta>
          )}
        {(productType === COFFEE || productType === COFFEE_BEANS) && [
          <Styled.NoteHeading key="notes-heading">Tasting Notes</Styled.NoteHeading>,
          <Styled.NoteList key="notes">
            {product.tags.map(note => (
              <Styled.Note key={note.value}>{note.value}</Styled.Note>
            ))}
          </Styled.NoteList>,
        ]}
        {productType !== COFFEE &&
          productType !== COFFEE_BEANS && (
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

ProductCard.defaultProps = {
  isShowing: true,
  product: undefined,
};

export default ProductCard;
