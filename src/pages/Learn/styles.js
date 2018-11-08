import styled from 'react-emotion';

import { font } from 'lib/theme';

export const BrewHeading = styled.h1`
  font-family: ${font.kaufmann};
  font-size: ${font.up6};
  margin-bottom: 0;
  margin-top: 4rem;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-column-gap: 2rem;
  grid-row-gap: 3rem;
  padding-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 4rem;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    padding-bottom: 6rem;
    padding-left: 4rem;
    padding-right: 4rem;
  }

  @media (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
