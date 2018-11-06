import React from 'react';

import * as Styled from './styles';

const CartZero = () => (
  <Styled.Container>
    <Styled.Heading>Cart Empty</Styled.Heading>
    <Styled.Subheading>Go get you somethin’!</Styled.Subheading>
    <Styled.Actions>
      <Styled.SuggestedLink to="/collections/coffee">Coffee & Subscriptions</Styled.SuggestedLink>
      <Styled.SuggestedLink to="/collections/gear">Gear & Apparel</Styled.SuggestedLink>
    </Styled.Actions>
  </Styled.Container>
);

export default CartZero;
