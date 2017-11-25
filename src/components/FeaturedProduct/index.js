import React from 'react';
import PropTypes from 'prop-types';

import ProductCard from 'components/ProductCard';
import Styled from './styles';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const date = new window.Date();
const thisMonth = months[date.getMonth()];
const thisYear = date.getFullYear();

const FeaturedProduct = props => (
  <Styled.Container>
    <Styled.Grid>
      <Styled.Content>
        <Styled.Heading>Featured Product <small>{thisMonth} {thisYear}</small></Styled.Heading>
        <ProductCard product={props.featuredProduct} />
      </Styled.Content>
    </Styled.Grid>
  </Styled.Container>
);

FeaturedProduct.propTypes = {
  featuredProduct: PropTypes.object,
};

export default FeaturedProduct;
