import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from 'lib/tools';

import Styled from './styles';

const CartItem = (props) => {
  const product = props.allProducts.find(({ id }) => id === props.lineItem.product_id);
  if (!product) {
    console.log(props);
    props.removeLineItem(props.lineItem.id);
    return false;
  }
  const productType = product.type.toLowerCase();

  const { color } = product.metafields.c_f || '';

  const clickHandler = (e) => {
    e.preventDefault();
    if (confirm(`Remove ${product.title}?`)) {
      props.removeLineItem(props.lineItem.id);
    }
  };

  return (
    <Styled.Container>
      <Styled.ThumbContainer color={color}>
        <Styled.Thumb src={product.featured_image} alt={product.title} />
      </Styled.ThumbContainer>
      <Styled.ProductInfo>
        <Styled.Heading>
          {product.title}
          {props.lineItem.variant_title !== 'Default Title' &&
            ` (${productType === 'coffee subscription' ? 'Every ' : ''}${props.lineItem.variant_title})`
          }
        </Styled.Heading>
        <Styled.ProductType>{product.type}</Styled.ProductType>
        <Styled.Description>
          {(productType === 'coffee' || productType === 'coffee beans') &&
            <Styled.Notes>{product.tags.join(' / ')}</Styled.Notes>
          }
        </Styled.Description>
        <Styled.Price>{formatPrice(props.lineItem.price)}</Styled.Price>
      </Styled.ProductInfo>
      <Styled.QuantityLabel>
        <Styled.Quantity
          defaultValue={props.lineItem.quantity}
          min="0"
          onChange={(e) => {
            if (parseInt(e.target.value, 10) === 0 && confirm(`Remove ${product.title}?`)) {
              props.removeLineItem(props.lineItem.id);
            } else if (e.target.value) {
              props.updateLineItem(props.lineItem.id, e.target.value);
            }
          }}
          type="number"
        />
        {(productType === 'coffee' || productType === 'coffee beans') ? 'bags' : 'count' }
        <Styled.Remove onClick={e => clickHandler(e)}>
          Remove
        </Styled.Remove>
      </Styled.QuantityLabel>
    </Styled.Container>
  );
};

CartItem.propTypes = {
  allProducts: PropTypes.array.isRequired,
  lineItem: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

export default CartItem;
