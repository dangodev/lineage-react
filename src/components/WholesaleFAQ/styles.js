import styled from 'react-emotion';
import { font } from 'lib/theme';

export const Container = styled.div`
  font-size: ${font.down1};
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;

  @media (min-width: 600px) {
    font-size: 1em;
    margin-left: auto;
    margin-right: auto;
    max-width: 60em;
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;
