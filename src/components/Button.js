import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

const Button = props => (
  <Container onClick={props.onClick} color={props.color}>
    {props.children}
  </Container>
);

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: 'blueT',
};

/**
 * Styles
 */

const textColors = {
  blue: `rgb(${color.black})`,
  white: `rgb(${color.black})`,
};

const Container = glamorous.button(
  {
    alignItems: 'center',
    appearance: 'none',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: font.din,
    fontSize: '1em',
    fontWeight: 700,
    height: 1.5 * grid,
    justifyContent: 'center',
    minWidth: 6 * grid,
    paddingLeft: grid,
    paddingRight: 0,
    paddingRight: grid,
    paddingTop: 0,
    textTransform: 'uppercase',
  },
  props => ({
    backgroundColor: `rgb(${color[props.color]})`,
    color: textColors[props.color],
  })
);

export default Button;
