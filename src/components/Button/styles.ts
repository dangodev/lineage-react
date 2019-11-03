import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { color, font } from '../../lib/theme';

const textColors = {
  blue: `rgb(${color.black})`,
  blueT: `rgb(${color.black})`,
  red: `rgb(${color.white})`,
  white: `rgb(${color.black})`,
};

interface ButtonProps {
  color: keyof typeof textColors;
  disabled: boolean;
  small: boolean;
}

export const ActionButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: ${(props: ButtonProps) =>
    props.disabled ? `rgba(${color.gray}, 0.25)` : `rgb(${color[props.color] || color.blueT})`};
  border-radius: 0;
  border: none;
  color: ${(props: ButtonProps) =>
    props.disabled ? `rgba(${color.black}, 0.375)` : textColors[props.color]};
  cursor: pointer;
  display: flex;
  font-family: ${font.din};
  font-size: ${({ small }: ButtonProps) => (small === true ? font.down2 : font.down1)};
  font-weight: 700;
  height: ${({ small }: ButtonProps) => (small === true ? 'rem' : '3rem')};
  justify-content: center;
  min-width: 12rem;
  padding-bottom: 0;
  padding-left: ${({ small }: ButtonProps) => (small === true ? '1rem' : '2rem')};
  padding-right: ${({ small }: ButtonProps) => (small === true ? '1rem' : '2rem')};
  padding-top: 0;
  pointer-events: ${({ disabled }: ButtonProps) => (disabled === true ? 'none' : 'normal')};
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 200ms;

  &:focus,
  &:hover {
    background-color: rgba(${props => color[props.color] || color.blueT}, 0.6);
  }

  @media (min-width: 600px) {
    font-size: ${({ small }: ButtonProps) => (small === true ? font.down1 : '1em')};
  }
`;
export const AnchorButton = ActionButton.withComponent('a');

export const LinkButton = ActionButton.withComponent(Link);
