import styled from '@emotion/styled';
import { ifProp, ifNotProp } from 'styled-tools';
import { color, font, layer, transition } from 'lib/theme';

export const Actions = styled.menu`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 2rem;
  padding-left: 0;
  padding-right: 2rem;
`;

export const Close = styled.a`
  align-items: center;
  color: rgb(${color.black});
  display: grid;
  font-size: 1.5rem;
  font-weight: 500;
  height: 3rem;
  justify-content: center;
  line-height: 1;
  position: absolute;
  right: 0;
  text-decoration: none;
  top: 0;
  width: 3rem;
`;

export const Count = styled.div`
  align-items: center;
  border-radius: 50%;
  background-color: ${ifProp({ empty: true }, `rgba(${color.black}, 0.1)`, `rgb(${color.red})`)};
  color: ${ifProp({ empty: true }, `rgba(${color.black}, 0.4)`, `rgb(${color.white})`)};
  display: flex;
  font-size: ${font.down2};
  height: 1.25rem;
  justify-content: center;
  line-height: 1;
  margin-left: 0.25rem;
  width: 1.25rem;
`;

export const Heading = styled.h1`
  align-items: center;
  display: flex;
  font-size: ${font.down1};
  font-weight: 700;
  height: 3rem;
  justify-content: center;
  margin-bottom: 0;
  margin-top: 0;
  text-transform: uppercase;
`;

export const Inner = styled.div`
  background-image: linear-gradient(90deg, rgba(${color.white}, 0) 2rem, rgb(${color.white}) 2rem);
  background-repeat: repeat-y;
  background-size: 100% 100%;
  bottom: 0;
  max-width: 30em;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2rem;
  padding-left: 2rem;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(${ifProp({ isShowing: true }, 0, '100%')});
  transition: transform 200ms ${transition.standard}
    ${ifNotProp('isShowing', ', visibility 0ms 200ms')};
  visibility: ${ifProp({ isShowing: true }, 'visible', 'hidden')};
  width: 100%;
  z-index: ${layer.cart + 1};

  @media (min-width: 600px) {
    width: 50vw;
  }
`;

export const Overlay = styled.div`
  background-color: rgb(${color.pink});
  bottom: 0;
  cursor: pointer;
  left: 0;
  opacity: ${ifProp({ isShowing: true }, 0.8, 0)};
  position: fixed;
  right: 0;
  top: 0;
  transition: ${ifProp(
    { isShowing: true },
    'opacity 200ms',
    'opacity 200ms, visibility 0ms 200ms'
  )};
  visibility: ${ifProp({ isShowing: true }, 'visible', 'hidden')};
  z-index: ${layer.cart};
`;

export const ShopButton = styled.a`
  color: rgb(${color.green});
  display: block;
  font-size: ${font.down2};
  font-weight: 700;
  margin-top: 1rem;
  text-decoration: none;
  text-align: center;
`;

export const WaveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
`;
