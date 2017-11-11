import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

const CartZero = () => (
  <Container>
    <Heading>Cart Empty</Heading>
    <Subheading>Go get you somethin’!</Subheading>
    <Actions>
      <SuggestedLink to="/collections/coffee">Coffee & Subscriptions</SuggestedLink>
      <SuggestedLink to="/collections/gear">Gear & Apparel</SuggestedLink>
    </Actions>
  </Container>
);

const Container = glamorous.div({
  borderRadius: 0.5 * grid,
  boxShadow: `0 0 0 1px rgba(${color.gray}, 0.25)`,
  color: `rgb(${color.gray})`,
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: grid,
  marginLeft: grid,
  marginRight: grid,
  paddingBottom: 2 * grid,
  paddingTop: 2 * grid,
  textAlign: 'center',
  textTransform: 'uppercase',
});

const Heading = glamorous.h4({
  fontSize: font.up2,
  marginBottom: 0,
  marginTop: 0,
});

const Subheading = glamorous.small({
  display: 'block',
  fontSize: font.down2,
  fontWeight: 400,
  marginTop: 0.25 * grid,
  textTransform: 'none',
});

const Actions = glamorous.menu({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 0,
  marginTop: 0.5 * grid,
  padding: 0,
});

const SuggestedLink = glamorous(Link)({
  color: `rgb(${color.blue})`,
  fontSize: font.down1,
  fontWeight: 700,
  marginLeft: '0.5em',
  marginRight: '0.5em',
  textDecoration: 'none',
  textTransform: 'uppercase',
});

export default CartZero;
