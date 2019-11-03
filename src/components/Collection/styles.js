import styled from 'react-emotion';
import { color, font } from '../../lib/theme';

export const Container = styled.div`
  background-color: rgb(${color.offwhite});
  padding-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 4rem;

  @media (min-width: 600px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

export const Subheading = styled.h3`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  margin-bottom: 0;
  margin-top: 2rem;
  text-align: center;
`;
