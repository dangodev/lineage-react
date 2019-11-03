import styled, { keyframes } from 'react-emotion';
import { color, layer, transition } from '../../lib/theme';

const fadeIn = keyframes`
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    `;

export const Container = styled.div`
  background-color: rgb(${color.pink});
  height: 56vw;
  overflow: hidden;
  position: relative;
`;

export const Pink = styled.div`
  background-color: rgb(${color.pink});
  height: 100%;
  left: 0;
  mix-blend-mode: multiply;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${layer.base};
`;

export const Pink2 = styled.div`
  background-image: linear-gradient(rgba(${color.pink}, 0), rgba(${color.pink}, 1));
  background-size: 100% 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${layer.base};
`;

export const BigLogo = styled.img`
  animation-delay: 1s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-name: ${fadeIn};
  animation-timing-function: ${transition.deceleration};
  height: 8rem;
  left: 50%;
  position: absolute;
  top: 50%;
  opacity: 0;
  transform: translate(-50%, -25%);
  width: 10rem;
  z-index: ${layer.base + 1};

  @media (min-width: 600px) {
    width: 16rem;
  }
`;

export const Stretch = styled.div`
  left: 50%;
  padding-top: 56.25%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  & video {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
`;
