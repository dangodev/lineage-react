import React from 'react';
import glamorous from 'glamorous';

import Button from './Button';
import Waves from './Waves';

import { color, font, grid } from '../lib/theme';

const WholesaleBlock = () => (
  <Container>
    <Content>
      <h1>Wholesale</h1>
      <p>
        Every month we ship hundreds of pounds of our just-roasted gourmet
        coffee to offices and restaurants around the state. Ready to make
        Lineage part of your workday?
      </p>
    </Content>
    <Actions>
      <Waves width={`${3 * grid}px`} />
      <Button color="white" to="/pages/wholesale">Learn More</Button>
    </Actions>
  </Container>
);

/**
 * Styles
 */

const Container = glamorous.div({
  backgroundColor: `rgb(${color.blue})`,
  paddingTop: 3 * grid,
  paddingBottom: 2 * grid,

  '& h1': {
    fontSize: font.up4,
    marginBottom: 0,
    marginTop: 0,
    textTransform: 'uppercase',
  },

  '& p': {
    fontSize: font.up1,
    lineHeight: 1.8,
    marginBottom: grid,
    marginTop: grid,
  },
});

const Content = glamorous.div({
  maxWidth: '35em',
  paddingLeft: 2 * grid,
  width: '50%',
});

const Actions = glamorous.menu({
  display: 'flex',
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 2 * grid,
  paddingBottom: 0,
  paddingLeft: 2 * grid,
  paddingRight: 0,
  paddingTop: 0,
  position: 'relative',
});

export default WholesaleBlock;
