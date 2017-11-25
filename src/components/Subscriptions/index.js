import React from 'react';
import PropTypes from 'prop-types';

import ProductList from 'components/ProductList';
import Styled from './styles';

const Subscriptions = (props) => {
  const subscriptionProducts = props.allProducts.filter(product =>
    product.collections.indexOf('subscriptions') !== -1);

  return (
    <Styled.Container>
      <Styled.Subheading>Coffee Subscriptions</Styled.Subheading>
      <ProductList products={subscriptionProducts} isShowing={props.isShowing} />
    </Styled.Container>
  );
};

Subscriptions.propTypes = {
  allProducts: PropTypes.array.isRequired,
  isShowing: PropTypes.bool.isRequired,
};

export default Subscriptions;
