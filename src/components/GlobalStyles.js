import React from 'react';
import glamorous from 'glamorous';

import { font } from '../lib/theme';

const GlobalStyles = props => <Container>{ props.children }</Container>;

const Container = glamorous.div({
  fontFamily: font.din,
  fontSize: '16px',
  lineHeight: 1.5,
});

export default GlobalStyles;
