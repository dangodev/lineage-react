import React from 'react';

import ProductCard from 'components/ProductCard';
import * as Styled from './styles';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const date = new Date();
const thisMonth = date ? months[date.getMonth()] : '';
const thisYear = date ? date.getFullYear() : '';

interface FeaturedProductProps {
  featuredProduct: ShopifyCustom.Product;
}

const FeaturedProduct: React.FunctionComponent<FeaturedProductProps> = ({ featuredProduct }) => (
  <Styled.Container>
    <Styled.Grid>
      <Styled.Content>
        <Styled.Heading>
          Featured Product{' '}
          <small>
            {thisMonth} {thisYear}
          </small>
        </Styled.Heading>
        <ProductCard product={featuredProduct} />
      </Styled.Content>
    </Styled.Grid>
  </Styled.Container>
);

export default FeaturedProduct;
