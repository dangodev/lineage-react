import PropTypes from 'prop-types';
import React from 'react';

import * as Styled from './styles';

const Button = ({ color = 'blueT', children, disabled = false, href, to, ...rest }) => {
  if (to) {
    return (
      <Styled.LinkButton {...rest} color={color} disabled={disabled} to={to}>
        {children}
      </Styled.LinkButton>
    );
  } else if (href) {
    return (
      <Styled.AnchorButton {...rest} color={color} disabled={disabled} href={href}>
        {children}
      </Styled.AnchorButton>
    );
  }
  return (
    <Styled.ActionButton {...rest} color={color} disabled={disabled}>
      {children}
    </Styled.ActionButton>
  );
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
