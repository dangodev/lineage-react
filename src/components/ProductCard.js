import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

const ProductCard = props => (
  <Container>
    <Heading>{props.product.title}</Heading>
    <Meta>{props.product.metafields.country} / {props.product.metafields.elevation}m</Meta>
    <Notes>{props.product.metafields.notes}</Notes>
    <StyledLink to={`/product/${props.product.handle}`}>View</StyledLink>
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
  fontSize: font.down2,
  fontWeight: 400,
  marginTop: 0.25 * grid,
  marginBottom: 0,
});

const Notes = glamorous.p({
  display: 'block',
  fontSize: font.down1,
  lineHeight: 1.5,
  marginBottom: 0,
  marginTop: 0.5 * grid,
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

export default ProductCard;
