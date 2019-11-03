import React from 'react';

import * as Styled from './styles';

interface ButtonProps {
  color?: 'blue' | 'blueT' | 'red' | 'white';
  disabled?: boolean;
  href?: string;
  rel?: string;
  small?: boolean;
  target?: string;
  to?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  color = 'blueT',
  disabled = false,
  href,
  small = false,
  to,
  ...rest
}) => {
  if (to) {
    return (
      <Styled.LinkButton {...rest} color={color} disabled={disabled} to={to} small={small}>
        {children}
      </Styled.LinkButton>
    );
  }
  if (href) {
    return (
      <Styled.AnchorButton {...rest} color={color} disabled={disabled} href={href} small={small}>
        {children}
      </Styled.AnchorButton>
    );
  }
  return (
    <Styled.ActionButton {...rest} color={color} disabled={disabled} small={small}>
      {children}
    </Styled.ActionButton>
  );
};

export default Button;
