import * as React from 'react';
import ProductCard from 'components/ProductCard';
import * as Styled from './styles';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const date = typeof window !== 'undefined' ? new Date() : undefined;
const thisMonth = date ? months[date.getMonth()] : '';
const thisYear = date ? date.getFullYear() : '';

const FeaturedProduct = (props: { featuredProduct: ShopifyBuy.Product }) => (
  <Styled.Container>
    <Styled.Grid>
      <Styled.Content>
        <Styled.Heading>
          Featured Product{' '}
          <small>
            {thisMonth} {thisYear}
          </small>
        </Styled.Heading>
        <ProductCard product={props.featuredProduct} />
      </Styled.Content>
    </Styled.Grid>
  </Styled.Container>
);

export default FeaturedProduct;
