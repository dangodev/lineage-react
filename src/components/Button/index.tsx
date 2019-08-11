import React, { SyntheticEvent } from 'react';

import * as theme from 'lib/theme';
import * as Styled from './styles';

interface ButtonProps {
  color?: keyof typeof theme.color;
  disabled?: boolean;
  href?: string;
  onClick?: (event: SyntheticEvent) => any;
  rel?: string;
  small?: boolean;
  target?: string;
  to?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  color = 'blueT',
  children,
  disabled = false,
  href,
  to,
  ...rest
}) => {
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

export default Button;
