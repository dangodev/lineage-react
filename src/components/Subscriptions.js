import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const Subscriptions = props => {
  const subscriptionProducts = props.allProducts.filter(product =>

  return (
    <Container>
      <ProductList products={props.products} isShowing={props.isShowing} />
    </Container>
  );
};

Subscriptions.propTypes = {
  allProducts: PropTypes.array.isRequired,
  isShowing: PropTypes.bool.isRequired,
};

/**
 * Styles
 */

const Container = glamorous.div({
});

export default Subscriptions;
