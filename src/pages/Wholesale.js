import React from 'react';
import glamorous from 'glamorous';

import { grid } from '../lib/theme';

const Wholesale = () => (
  <Container>
    <Header>
      <h1>Wholesale</h1>
    </Header>
  </Container>
);

const Container = glamorous.div({
});

const Header = glamorous.header({
  paddingTop: 2 * grid,
  paddingBottom: 2 * grid,
});

export default Wholesale;
