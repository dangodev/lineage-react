import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

import speckle from '../assets/speckle.png';

const format = price => `$${Math.round(price / 100)}`;

const ProductCard = (props) => {
  const productType = props.product.type.toLowerCase();

  return (
    <Container flavor={props.product.metafields.color} to={`/product/${props.product.handle}`}>
      <Inner>
        <Heading>{props.product.title}</Heading>
        {(productType === 'coffee' || productType === 'coffee beans') &&
          <Meta>{props.product.metafields.country} / {props.product.metafields.altitude}m</Meta>
        }
        <Notes>
          {props.product.tags.map(note =>
            <Note key={note}>{note}</Note>
          )}
        </Notes>
        <Colophon>
          <Price>
            {format(props.product.price)}
          </Price>
          <HoverLink>View</HoverLink>
        </Colophon>
      </Inner>
    </Container>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

/**
 * Styles
 */

const Container = glamorous(Link)(
  {
    backgroundImage: `url(${speckle})`,
    backgroundSize: '400 auto',
    backgroundRepeat: 'repeat',
    boxShadow: `0 ${0.25 * grid}px ${0.5 * grid}px rgba(${color.black}, 0.1)`,
    color: `rgb(${color.black})`,
    display: 'grid',
    textDecoration: 'none',
    lineHeight: 1,
    paddingLeft: '25%',
  },
  ({ flavor = 'pink' }) => ({
    backgroundColor: `rgb(${color[flavor]})`,
  })
);

const Inner = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  display: 'grid',
  flexDirection: 'column',
  padding: grid,
});

const Heading = glamorous.h1({
  fontSize: font.up1,
  fontWeight: 700,
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
  textTransform: 'capitalize',
  lineHeight: 1.75,
});

const HoverLink = glamorous.span({
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
  marginTop: 'auto',
  width: '100%',
});

const Price = glamorous.div({
  fontFamily: font.kaufmann,
  fontSize: font.up2,
  letterSpacing: '-0.05em',
});

export default ProductCard;
