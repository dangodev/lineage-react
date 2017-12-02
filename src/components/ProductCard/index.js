import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from 'lib/tools';

import Styled from './styles';

const ProductCard = (props) => {
  const productType = props.product.type.toLowerCase();

  return (
    <Styled.Container
      flavor={props.product.metafields.color}
      to={`/products/${props.product.handle}`}
      isShowing={props.isShowing}
      delay={props.delay}
    >
      <Styled.Image>
        <img alt={props.product.title} src={props.product.featured_image} />
      </Styled.Image>
      <Styled.Inner>
        <Styled.Heading>{props.product.title}</Styled.Heading>
        {(productType === 'coffee' || productType === 'coffee beans') &&
          <Styled.Meta>{props.product.metafields.country} / {props.product.metafields.altitude}m</Styled.Meta>
        }
        {(productType === 'coffee' || productType === 'coffee beans') && [
          <Styled.NoteHeading key="notes-heading">Tasting Notes</Styled.NoteHeading>,
          <Styled.NoteList key="notes">
            {props.product.tags.map(note => <Styled.Note key={note}>{note}</Styled.Note>)}
          </Styled.NoteList>,
        ]}
        {(productType !== 'coffee' && productType !== 'coffee beans') &&
          <Styled.Content dangerouslySetInnerHTML={{ __html: props.product.content }} />
        }
        <Styled.Colophon>
          <Styled.Price>{formatPrice(props.product.price)}</Styled.Price>
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
