import React from 'react';
import glamorous from 'glamorous';

import Page from '../components/Page';

import { grid } from '../lib/theme';

const Wholesale = () => (
  <div>
    <Header backgroundImage="https://cdn.shopify.com/s/files/1/0746/4367/files/LNG_BREW_METHOD-3.jpg?7108445487488165633">
      <h1>Wholesale</h1>
    </Header>
    <Page>
      <p>Something here</p>
    </Page>
  </div>
);

const Header = glamorous.header(
  {
    backgroundColor: 'rgb(212, 224, 236)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingBottom: 2 * grid,
    paddingTop: 2 * grid,
  },
  props => ({
    backgroundImage: `url(${props.backgroundImage})`,
  })
);

export default Wholesale;
