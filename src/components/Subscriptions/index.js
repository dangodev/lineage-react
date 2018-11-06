import React from 'react';
import PropTypes from 'prop-types';

import ProductList from 'components/ProductList';
import * as Styled from './styles';

const Subscriptions = props => {
  return (
    <Styled.Container>
      <Styled.Subheading>Coffee Subscriptions</Styled.Subheading>
      <ProductList products={props.products} isShowing={props.isShowing} />
    </Styled.Container>
  );
};

Subscriptions.defaultProps = {
  products: [],
};

Subscriptions.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  products: PropTypes.array,
};

export default Subscriptions;
