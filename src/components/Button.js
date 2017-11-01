import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import { color, font, grid } from '../lib/theme';

const Button = props =>
  props.to
    ? <LinkButton to={props.to} color={props.color}>{props.children}</LinkButton>
    : <ActionButton action={props.onClick} color={props.color}>{props.children}</ActionButton>;

Button.defaultProps = {
  action: () => {},
  to: undefined,
},

Button.propTypes = {
  action: PropTypes.func,
  color: PropTypes.string,
  to: PropTypes.string,
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

const ActionButton = glamorous.button(
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
    paddingRight: grid,
    paddingTop: 0,
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  props => ({
    backgroundColor: `rgb(${color[props.color]})`,
    color: textColors[props.color],
  })
);

const LinkButton = ActionButton.withComponent(Link);

export default Button;
