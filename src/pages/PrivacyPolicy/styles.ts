import styled from 'react-emotion';
import { font } from 'lib/theme';

export const Content = styled.div`
  padding-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 55em;

  @media (min-width: 600px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  & p {
    font-size: ${font.up1};
    margin-bottom: 1rem;
    margin-top: 1rem;
    line-height: 1.6;
  }
`;
