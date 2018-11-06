import styled from 'react-emotion';

import { font } from 'lib/theme';

export const BrewHeading = styled.h1`
  font-family: ${font.kaufmann};
  font-size: ${font.up6};
  margin-bottom: 0;
  margin-top: 2rem;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  padding-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    padding-bottom: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
