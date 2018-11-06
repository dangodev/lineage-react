import PropTypes from 'prop-types';
import React from 'react';

import * as Styled from './styles';

const Button = (props) => {
  if (props.to) {
    return <Styled.LinkButton {...props}>{props.children}</Styled.LinkButton>;
  } else if (props.href) {
    return <Styled.AnchorButton {...props}>{props.children}</Styled.AnchorButton>;
  }
  return <Styled.ActionButton {...props}>{props.children}</Styled.ActionButton>;
};

Button.defaultProps = {
  children: undefined,
  color: 'blueT',
  disabled: false,
  href: undefined,
  onClick: undefined,
  small: undefined,
  to: undefined,
};

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  to: PropTypes.string,
};

export default Button;
