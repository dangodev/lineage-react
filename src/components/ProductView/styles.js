import styled from 'react-emotion';
import { ifProp } from 'styled-tools';
import { color, font, layer, transition } from 'lib/theme';

export const Actions = styled.menu`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 1rem;
  padding: 0;
  position: relative;
`;

export const Close = styled.a`
  align-items: center;
  color: rgb(${color.black});
  display: grid;
  font-size: 28px;
  font-weight: 500;
  height: 2rem;
  justify-content: center;
  left: 0;
  line-height: 1;
  position: fixed;
  text-decoration: none;
  top: 0;
  width: 2rem;
  z-index: ${layer.modal};

  @media (min-width: 600px) {
    left: auto;
    position: absolute;
    right: 0;
  }
`;

export const Container = styled.div`
  height: 100vh;
  left: 0;
  overflow-y: scroll;
  position: fixed;
  right: 0;
  top: 0;
  -webkit-overflow-scrolling: touch;
  z-index: ${layer.modal};
  visibility: ${ifProp({ isShowing: true }, 'visibile', 'hidden')};
  transition: ${ifProp({ isShowing: true }, 'none', 'visibility 0ms 200ms')};
`;

export const CoreInfo = styled.div`
  flex: 4;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 600px) {
    margin-bottom: 0;
    padding-left: 0;
  }
`;

export const Description = styled.div`
  font-size: ${font.down1};

  & p {
    line-height: 1.8;
    margin-bottom: 0;
    margin-top: 0;

    & + p {
      margin-top: 0.5rem;
    }
  }
`;

export const Grid = styled.div`
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  max-width: calc(100vw - 1rem);
  width: 100vw;
  z-index: ${layer.modal + 1};

  @media (min-width: 600px) {
    width: 75vw;
  }
`;

export const Heading = styled.h1`
  font-size: ${font.up3};
  line-height: 1;
  margin-bottom: 0.5rem;
  margin-top: 0;
  text-transform: uppercase;

  @media (min-width: 600px) {
    padding-top: 1rem;
  }
`;

export const Image = styled.figure`
  border-radius: 0.5rem;
  box-shadow: 0.25rem 0.25rem 1rem rgba(${color.black}, 0.1);
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  transform: translateY(-1rem);
  width: 87.5%;

  @media (min-width: 600px) {
    left: 0;
    margin: 0;
    position: absolute;
    top: 0;
    transform: translate(-2rem, -1rem);
    width: 6rem;
  }

  & img {
    display: block;
    height: auto;
    width: 100%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    padding-left: 25%;
  }
`;

export const Modal = styled.div`
  background-color: rgb(${color.white});
  display: block;
  padding-bottom: 1rem;
  position: relative;
  transition: opacity 200ms, transform 200ms ${transition.standard};
  z-index: ${layer.modal + 1};
  opacity: ${ifProp({ isShowing: true }, 1, 0)};
  transform: ${ifProp({ isShowing: true }, 'translateY(0)', 'translateY(3rem)')};
`;

export const Notes = styled.p`
  font-size: ${font.down1};
  line-height: 1.8;
  margin-bottom: 0;
  margin-top: 0;
  text-transform: capitalize;
`;

export const Option = styled.div`
  display: block;
  flex-grow: 1;
  line-height: 1;
  overflow: hidden;
  position: relative;

  @media (min-width: 600px) {
    flex-grow: 0;
  }

  & input {
    position: absolute;
    right: 200%;
  }

  & label {
    align-items: 'center';
    box-shadow: inset 0 0 0 2px rgba(${color.gray}, 1);
    color: rgb(${color.gray});
    cursor: pointer;
    display: flex;
    font-size: ${font.down1};
    font-weight: 500;
    height: 1rem;
    justify-content: center;
    padding: 0;
    transition: background-color 200ms, box-shadow 200ms, color 200ms;

    @media (min-width: 600px) {
      width: 2rem;
    }
  }

  & input:checked + label {
    background-color: rgb(${color.black});
    box-shadow: inset 0 0 0 2px rgba(${color.gray}, 0);
    color: rgb(${color.white});
  }
`;

export const OptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.25rem;
  width: 100%;

  @media (min-width: 600px) {
    & > * + * {
      margin-left: 0.25rem;
    }
  }
`;

export const Overlay = styled.a`
  background-color: ${ifProp(
    { flavor: 'white' },
    `rgba(${color.black}, 0.7)`,
    `rgba(${({ flavor }) => color[flavor]}, 0.7)`
  )};
  opacity: ${ifProp({ isShowing: true }, 1, 0)};
  cursor: pointer;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 200ms;
  z-index: ${layer.modal};
`;

export const Price = styled.div`
  font-family: ${font.kaufmann};
  font-size: ${font.up3};
  margin-top: 1rem;
  text-align: center;
`;

export const Quantity = styled.div`
  display: flex;
`;

export const QuantityWholesale = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 100%;
  font-size: ${font.down2};
  height: 1rem;
  justify-content: center;

  @media (min-width: 600px) {
    flex: 1 0 auto;
    height: auto;
    justify-content: flex-start;
  }

  & a {
    color: rgb(${color.green});
    font-weight: 500;
    text-decoration: none;
    width: auto;
  }
`;

export const Selections = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 600px) {
    padding-left: 25%;
    padding-right: 0;
  }
`;

export const Subheading = styled.h3`
  font-size: ${font.down2};
  letter-spacing: 0.075em;
  margin-bottom: 0;
  margin-top: 0.5rem;
  text-transform: uppercase;
`;
