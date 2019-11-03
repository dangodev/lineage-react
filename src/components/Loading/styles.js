import styled, { keyframes } from 'react-emotion';
import { ifProp } from 'styled-tools';
import { color, layer, transition } from '../../lib/theme';

const progress = keyframes`
  0% {
    transform: scaleX(0);
  }
  25% {
    transform: scaleX(0.2);
  }
  50% {
    transform: scaleX(0.45);
  }
  75% {
    transform: scaleX(0.63);
  }
  100% {
    transform: scaleX(0.9);
  }
`;

export const Container = styled.div`
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-name: ${ifProp({ isLoading: true }, progress, '')};
  animation-timing-function: ${transition.deceleration};
  background-color: rgb(${color.blue});
  height: 4px;
  left: 0;
  opacity: ${ifProp({ isLoading: true }, 1, 0)};
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transform-origin: 0 0;
  transition: ${ifProp({ isLoading: true }, 'none', 'opacity 200ms')};
  width: 100vw;
  z-index: ${layer.loading};
`;
