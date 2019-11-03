import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const ProductCard = props => {
  const productType = props.product.productType.toLowerCase();
  const { altitude, color, country } = props.product.metafields.c_f || '';

  return (
    <Styled.Container
      flavor={color}
      to={`/products/${props.product.handle}`}
      isShowing={props.isShowing}
      delay={props.delay}
    >
      <Styled.Image>
        <img alt={props.product.title} src={props.product.images[0].src} />
      </Styled.Image>
      <Styled.Inner>
        <Styled.Heading>{props.product.title}</Styled.Heading>
        {(productType === 'coffee' || productType === 'coffee beans') && country && altitude && (
          <Styled.Meta>
            {country} / {altitude}m
          </Styled.Meta>
        )}
        {(productType === 'coffee' || productType === 'coffee beans') && [
          <Styled.NoteHeading key="notes-heading">Tasting Notes</Styled.NoteHeading>,
          <Styled.NoteList key="notes">
            {Array.isArray(props.product.tags) &&
              props.product.tags.map(note => (
                <Styled.Note key={note.value}>{note.value}</Styled.Note>
              ))}
          </Styled.NoteList>,
        ]}
        {productType !== 'coffee' && productType !== 'coffee beans' && (
          <Styled.Content
            dangerouslySetInnerHTML={{
              __html: props.product.descriptionHtml,
            }}
          />
        )}
        <Styled.Colophon>
          <Styled.Price>${props.product.variants[0].price}</Styled.Price>
          <Styled.HoverLink>View</Styled.HoverLink>
        </Styled.Colophon>
      </Styled.Inner>
    </Styled.Container>
  );
};

ProductCard.defaultProps = {
  delay: 0,
  isShowing: true,
  product: undefined,
};

ProductCard.propTypes = {
  delay: PropTypes.number,
  isShowing: PropTypes.bool,
  product: PropTypes.object,
};

export default ProductCard;
