import styled from 'react-emotion';
import { color, font } from 'lib/theme';
import speckle from 'assets/speckle.png';

export const Container = styled.div`
  background-color: rgb(${color.green});
  background-image: linear-gradient(rgb(250, 196, 170), rgb(255, 182, 170)), url(${speckle});
  background-position: 0 0, 0 0;
  background-repeat: repeat-x, repeat;
  background-size: 100% 4rem, 400px auto;
  padding-bottom: 2rem;
  padding-top: 1rem;
`;

export const Content = styled.div`
  background-color: ${color.white};
  grid-column-end: 11;
  grid-column-start: 3;

  @media (min-width: 600px) {
    grid-column-end: 10;
    grid-column-start: 4;
  }
`;

export const Grid = styled.div`
  align-items: center;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(12, 1fr);
`;

export const Heading = styled.h1`
  font-family: ${font.kaufmann};
  font-size: ${font.up3};
  line-height: 1;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 600px) {
    font-size: ${font.up5};
  }

  & small {
    display: block;
    font-family: ${font.din};
    font-size: ${font.down5};
    font-weight: 500;
    text-transform: uppercase;
  }
`;
