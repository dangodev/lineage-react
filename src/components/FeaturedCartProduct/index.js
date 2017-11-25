import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from 'lib/tools';

import Styled from './styles';

const FeaturedCartProduct = (props) => {
  const productType = props.product.type.toLowerCase();

  return (
    <Styled.Container>
      <Styled.Label color={props.product.metafields.color}>Featured Item</Styled.Label>
      <Styled.Grid>
        <Styled.ProductInfo>
          <Styled.Image src={props.product.featured_image} alt={props.product.title} />
          <Styled.Heading>{props.product.title}</Styled.Heading>
          {(productType === 'coffee' || productType === 'coffee beans') &&
            <Styled.Notes>{props.product.tags.join(' / ')}</Styled.Notes>
          }
          <Styled.Price>{formatPrice(props.product.price)}</Styled.Price>
        </Styled.ProductInfo>
        <Styled.ViewProduct to={`/products/${props.product.handle}`}>View</Styled.ViewProduct>
      </Styled.Grid>
    </Styled.Container>
  );
};

FeaturedCartProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default FeaturedCartProduct;
