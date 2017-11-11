ismport React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';
import { formatPrice } from '../lib/tools';

import speckle from '../assets/speckle.png';

const FeaturedCartProduct = (props) => {
  const productType = props.product.type.toLowerCase();

  return (
    <Container>
      <Label color={props.product.metafields.color}>Featured Item</Label>
      <Grid>
        <ProductInfo>
          <Image src={props.product.featured_image} alt={props.product.title} />
          <Heading>{props.product.title}</Heading>
          {(productType === 'coffee' || productType === 'coffee beans') &&
            <Notes>{props.product.tags.join(' / ')}</Notes>
          }
          <Price>{formatPrice(props.product.price)}</Price>
        </ProductInfo>
        <ViewProduct to={`/products/${props.product.handle}`}>View</ViewProduct>
      </Grid>
    </Container>
  );
};

FeaturedCartProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

/**
 * Style
 */

const textColors = {
  blue: `rgb(${color.black})`,
  blueT: `rgb(${color.black})`,
  pink: `rgb(${color.black})`,
  red: `rgb(${color.white})`,
  white: `rgb(${color.black})`,
  yellow: `rgb(${color.black})`,
};

const Container = glamorous.div({
  backgroundColor: `rgb(${color.offwhite})`,
  marginBottom: grid,
  marginTop: grid,
});

const ProductInfo = glamorous.div({
  flexGrow: 1,
  paddingBottom: 0.5 * grid,
  paddingLeft: 2.75 * grid,
});

const Heading = glamorous.h1({
  fontSize: '1em',
  fontWeight: 700,
  marginTop: 0.25 * grid,
  marginBottom: 0,
  textTransform: 'uppercase',
});

const Grid = glamorous.div({
  display: 'flex',
  paddingRight: grid,
  position: 'relative',
});

const Image = glamorous.img({
  borderRadius: 0.25 * grid,
  boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${grid}px rgba(${color.black}, 0.1)`,
  height: 'auto',
  left: `-${0.5 * grid}`,
  overflow: 'hidden',
  position: 'absolute',
  top: `-${0.5 * grid}`,
  width: 2.25 * grid,
});

const Price = glamorous.div({
  fontFamily: font.kaufmann,
  fontSize: font.up1,
  marginTop: 0.25 * grid,
});

const ViewProduct = glamorous(Link)({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'flex',
  fontSize: '1em',
  fontWeight: 700,
  justifyContent: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color 200ms',

  ':hover': {
    color: `rgb(${color.blue})`,
  },
});

const Label = glamorous.div(
  {
    backgroundImage: `url(${speckle})`,
    backgroundSize: '400px auto',
    fontSize: font.down2,
    fontWeight: 700,
    paddingBottom: 0.25 * grid,
    paddingLeft: 2.75 * grid,
    paddingTop: 0.25 * grid,
    textTransform: 'uppercase',
  },
  ({ themeColor = 'pink' }) => ({
    backgroundColor: `rgb(${color[themeColor]})`,
    color: textColors[themeColor],
  })
);

const Notes = glamorous.div({
  fontSize: font.down2,
  textTransform: 'capitalize',
});

export default FeaturedCartProduct;
