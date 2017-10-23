import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import glamorous from 'glamorous';

import { color, font } from '../lib/theme';

css.global('html, body', {
  backgroundColor: `rgb(${color.white})`,
  fontFamily: font.din,
  fontSize: '16px',
  lineHeight: 1.5,
});

/**
 * Template
 */

const GlobalStyles = props => <Container>{props.children}</Container>;

GlobalStyles.propTypes = {
  children: PropTypes.node,
};

/**
 * Styles
 */

const Container = glamorous.div({
  backgroundColor: `rgb(${color.offwhite})`,
});

export default GlobalStyles;
