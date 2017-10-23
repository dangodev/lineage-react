import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

const format = (price) => `$${Math.round(price/100)}`;

const ProductCard = props => (
  <Container>
    <Heading>{props.product.title}</Heading>
    <Meta>{props.product.metafields.country} / {props.product.metafields.altitude}m</Meta>
    <Notes>
      {props.product.tags.map(note =>
        <Note key={note}>{note}</Note>
      )}
    </Notes>
    <Colophon>
      <Price>
        {format(props.product.price)}
      </Price>
      <StyledLink to={`/product/${props.product.handle}`}>View</StyledLink>
    </Colophon>
  </Container>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

/**
 * Styles
 */

const Container = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  boxShadow: `0 ${0.5 * grid}px ${0.5 * grid}px rgba(${color.black}, 0.2)`,
  lineHeight: 1,
  padding: grid,
});

const Heading = glamorous.h1({
  fontSize: font.up1,
  fontWeight: 500,
  margin: 0,
  textTransform: 'uppercase',
});

const Meta = glamorous.aside({
  display: 'block',
  fontSize: font.down1,
  fontWeight: 400,
  marginTop: 0.25 * grid,
  marginBottom: 0,
});

const Notes = glamorous.div({
  fontSize: font.down2,
  marginBottom: 0.75 * grid,
  marginTop: 0.75 * grid,
});

const Note = glamorous.p({
  margin: 0,
  lineHeight: 1.75,
});

const StyledLink = glamorous(Link)({
  color: `rgb(${color.black})`,
  display: 'block',
  fontWeight: 500,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color 200ms',
  '&:hover': {
    color: `rgb(${color.blue})`,
  },
});

const Colophon = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const Price = glamorous.div({
  fontFamily: font.kaufmann,
  fontSize: font.up2,
  letterSpacing: '-0.05em',
});

export default ProductCard;
