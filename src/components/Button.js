import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import { color, font, grid } from '../lib/theme';

const Button = (props) => {
  if (props.to) {
    return <LinkButton to={props.to} color={props.color} small={props.small}>{props.children}</LinkButton>;
  }
  return <ActionButton onClick={props.onClick} color={props.color} small={props.small}>{props.children}</ActionButton>;
};

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  to: PropTypes.string,
};

Button.defaultProps = {
  color: 'blueT',
  onClick: e => e.preventDefault(),
  small: false,
  to: undefined,
};

/**
 * Styles
 */

const textColors = {
  blue: `rgb(${color.black})`,
  red: `rgb(${color.white})`,
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
    fontWeight: 700,
    justifyContent: 'center',
    minWidth: 6 * grid,
    paddingBottom: 0,
    paddingTop: 0,
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  props => ({
    backgroundColor: `rgb(${color[props.color]})`,
    color: textColors[props.color],
    fontSize: props.small ? font.down1 : '1em',
    height: props.small ? grid : 1.5 * grid,
    paddingLeft: props.small ? 0.5 * grid : grid,
    paddingRight: props.small ? 0.5 * grid : grid,
  })
);

const LinkButton = ActionButton.withComponent(Link);

export default Button;
