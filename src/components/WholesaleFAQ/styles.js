import styled from 'react-emotion';
import { font } from 'lib/theme';

export const Container = styled.div`
  font-size: ${font.down1};
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 600px) {
    font-size: 1em;
    margin-left: auto;
    margin-right: auto;
    max-width: 60em;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
