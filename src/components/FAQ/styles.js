import styled from 'react-emotion';
import { ifProp } from 'styled-tools';
import { color, font, transition } from '../../lib/theme';

export const Answer = styled.div`
  height: ${ifProp({ isMeasuring: true }, 'auto', ({ fullHeight, isOpen }) =>
    isOpen ? fullHeight : 0
  )};
  transition: ${ifProp({ isMeasuring: true }, 'none', `height 200ms ${transition.standard}`)};
  overflow: hidden;

  @media (min-width: 600px) {
    padding-left: 37.5%;
  }

  & p {
    margin-bottom: 0;
    margin-top: 0;
    max-width: 20em;

    & + p {
      margin-top: 2rem;
    }
  }
`;

export const AnswerInner = styled.div`
  padding-bottom: 2rem;
  padding-top: 1rem;
`;

export const Trigger = styled.button`
  appearance: none;
  background: none;
  border: none;
  box-shadow: 0 1px rgba(${color.black}, 0.5);
  cursor: pointer;
  display: block;
  font-family: ${font.din};
  font-size: 1em;
  font-weight: 500;
  outline: none;
  padding-bottom: 0.5rem;
  padding-left: 0;
  padding-right: 3rem;
  padding-top: 0.5rem;
  position: relative;
  text-align: left;
  text-transform: uppercase;
  transition: background-color 200ms linear;
  width: 100%;

  &::after {
    box-shadow: 2px 2px rgb(${color.black});
    content: '';
    height: 0.5rem;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: ${ifProp({ isOpen: true }, 'rotate(-135deg)', 'translateY(-75%) rotate(45deg)')};
    transition: transform 200ms ${transition.standard};
    width: 0.5rem;
  }

  &:hover {
    background-color: rgba(${color.black}, 0.05);
  }
`;
