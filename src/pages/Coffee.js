/**
 * Coffee Page
 * But first, ☕️!
 */

import React from 'react';

import CoffeeProducts from '../containers/CoffeeProducts';

export default (props) => (
  <CoffeeProducts client={props.client} cart={props.client} />
);
