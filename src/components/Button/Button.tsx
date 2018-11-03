import * as React from 'react';
import * as Styled from './styles';

const Button = (props: {
  children: any;
  color: string;
  disabled: boolean;
  href: string;
  to: string;
}) => {
  const { children, color = 'blueT', disabled = false, href, to, ...rest } = props;

  if (to) {
    return (
      <Styled.LinkButton {...rest} color={color} to={to}>
        {children}
      </Styled.LinkButton>
    );
  } else if (href) {
    return (
      <Styled.AnchorButton {...rest} color={color} href={href}>
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
