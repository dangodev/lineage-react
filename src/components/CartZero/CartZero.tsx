import * as React from 'react';
import { COLLECTION } from 'lib/routes';
import * as Styled from './styles';

const CartZero = () => (
  <Styled.Container>
    <Styled.Heading>Cart Empty</Styled.Heading>
    <Styled.Subheading>Go get you somethin’!</Styled.Subheading>
    <Styled.Actions>
      <Styled.SuggestedLink to={COLLECTION.coffee}>Coffee & Subscriptions</Styled.SuggestedLink>
      <Styled.SuggestedLink to={COLLECTION.gear}>Gear & Apparel</Styled.SuggestedLink>
    </Styled.Actions>
  </Styled.Container>
);

export default CartZero;
