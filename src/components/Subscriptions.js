import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import ProductList from './ProductList';

import { color, font, grid } from '../lib/theme';

const Subscriptions = (props) => {
  const subscriptionProducts = props.allProducts.filter(product =>
    product.collections.indexOf('subscriptions') !== -1);

  return (
    <Container>
      <Subheading>Coffee Subscriptions</Subheading>
      <ProductList products={subscriptionProducts} isShowing={props.isShowing} />
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
  paddingTop: 2 * grid,
});

const Subheading = glamorous.h3({
  fontFamily: font.kaufmann,
  fontSize: font.up4,
  marginBottom: grid,
  marginTop: 0,
  textAlign: 'center',
});

export default Subscriptions;
