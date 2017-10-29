import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid, layer } from '../lib/theme';
import { formatPrice } from '../lib/tools';

import speckle from '../assets/speckle.png';
import bagGreen from '../assets/bag-green.jpg';
import bagPink from '../assets/bag-pink.jpg';
import bagWhite from '../assets/bag-white.jpg';
import bagYellow from '../assets/bag-yellow.jpg';

const bag = {
  green: bagGreen,
  pink: bagPink,
  white: bagWhite,
  yellow: bagYellow,
};

const ProductCard = (props) => {
  const productType = props.product.type.toLowerCase();

  return (
    <Container flavor={props.product.metafields.color} to={`/product/${props.product.handle}`}>
      <Image>
        <img alt={props.product.title} src={bag[props.product.metafields.color]} />
      </Image>
      <Inner>
        <Heading>{props.product.title}</Heading>
        {(productType === 'coffee' || productType === 'coffee beans') &&
          <Meta>{props.product.metafields.country} / {props.product.metafields.altitude}m</Meta>
        }
        {(productType === 'coffee' || productType === 'coffee beans') &&
          <Notes>
            {props.product.tags.map(note => <Note key={note}>{note}</Note>)}
          </Notes>
        }
        {(productType !== 'coffee' && productType !== 'coffee beans') &&
          <p __dangerouslySetInnerHTML={props.product.content} />
        }
        <Colophon>
          <Price>{formatPrice(props.product.price)}</Price>
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
    lineHeight: 1,
    paddingLeft: '25%',
    position: 'relative',
    textDecoration: 'none',
  },
  ({ flavor = 'pink' }) => ({
    backgroundColor: `rgb(${color[flavor]})`,
  })
);

const Image = glamorous.div({
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '25%',
  zIndex: layer.base,

  '& img': {
    height: 'auto',
    transform: `translate(-${0.5 * grid}px, -${0.5 * grid}px)`,
    maxWidth: '100%',
  },
});

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
