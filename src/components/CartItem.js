import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';
import { formatPrice } from '../lib/tools';

import speckle from '../assets/speckle.png';

const CartItem = (props) => {
  const product = props.allProducts.find(({ id }) => id === props.lineItem.product_id);
  const productType = product.type.toLowerCase();

  return (
    <Container>
      <ThumbContainer color={product.metafields.color}>
        <Thumb src={product.featured_image} alt={product.title} />
      </ThumbContainer>
      <ProductInfo>
        <Heading>{product.title}</Heading>
        <ProductType>{product.type}</ProductType>
        <Description>
          {(productType === 'coffee' || productType === 'coffee beans') &&
            product.tags.join(' / ')
          }
        </Description>
        <Price>{formatPrice(props.lineItem.price)}</Price>
      </ProductInfo>
      <QuantityLabel>
        <Quantity
          defaultValue={props.lineItem.quantity}
          min="0"
          onChange={(e) => {
            if (parseInt(e.target.value, 10) === 0) {
              confirm(`Remove ${product.title}?`, () => props.updateLineItem(props.lineItem.id, e.target.value));
            } else if (e.target.value) {
              props.updateLineItem(props.lineItem.id, e.target.value);
            }
          }}
          type="number"
        />
        {(productType === 'coffee' || productType === 'coffee beans') ? 'bags' : 'count' }
      </QuantityLabel>
    </Container>
  );
};

CartItem.propTypes = {
  allProducts: PropTypes.array.isRequired,
  lineItem: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

/**
 * Styles
 */

const Container = glamorous.div({
  display: 'flex',
  position: 'relative',

  '& + *': {
    marginTop: grid,
  },
});

const Heading = glamorous.h3({
  fontSize: '1em',
  fontWeight: 700,
  marginBottom: 0,
  marginTop: 0,
  textTransform: 'uppercase',
});

const Price = glamorous.div({
  fontFamily: font.kaufmann,
  fontSize: font.up1,
  marginTop: 0.25 * grid,
});

const ProductType = glamorous.div({
  fontSize: font.down1,
});

const ProductInfo = glamorous.div({
  flexGrow: 1,
  paddingLeft: 0.625 * grid,
  paddingRight: 0.625 * grid,
  width: `calc(100% - ${4 * grid})`,
});

const ThumbContainer = glamorous.div(
  {
    backgroundImage: `url(${speckle})`,
    backgroundSize: '400px auto',
    padding: 0.25 * grid,
    width: 2 * grid,
  },
  props => ({
    backgroundColor: `rgb(${color[props.color] ? color[props.color] : color.pink})`,
  })
);

const Thumb = glamorous.img({
  borderRadius: 0.25 * grid,
  boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${grid}px rgba(${color.black}, 0.1)`,
  display: 'block',
  height: 'auto',
  overflow: 'hidden',
  transform: `translate(-${0.75 * grid}px, -${0.625 * grid}px)`,
  width: 2 * grid,
});

const QuantityLabel = glamorous.div({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'flex',
  flexDirection: 'column',
  fontSize: font.down3,
  letterSpacing: '0.1em',
  paddingRight: grid,
  paddingTop: 0.5 * grid,
  textTransform: 'uppercase',
  width: 2 * grid,
});

const Quantity = glamorous.input({
  appearance: 'none',
  border: 'none',
  borderRadius: '50%',
  boxShadow: `0 0 0 2px rgb(${color.blue})`,
  fontSize: font.up3,
  fontWeight: 500,
  height: grid,
  letterSpacing: 0,
  marginBottom: 0.25 * grid,
  outline: 'none',
  padding: 0,
  textAlign: 'center',
  width: grid,

  '::-webkit-inner-spin-button, ::-webkit-inner-spin-button': {
    appearance: 'none',
  },
});

const Description = glamorous.div({
  display: 'block',
  fontSize: font.down2,
  fontWeight: 400,
  marginTop: 0.25 * grid,
});

const Note = glamorous.div({
  lineHeight: 1.5,
  textTransform: 'capitalize',
});

export default CartItem;
