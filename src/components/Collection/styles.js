import styled from 'react-emotion';
import { color, font } from 'lib/theme';

export const Container = styled.div`
  background-color: rgb(${color.offwhite});
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;

  @media (min-width: 600px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const Subheading = styled.h3`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  margin-bottom: 0;
  margin-top: 1rem;
  text-align: center;
`;
