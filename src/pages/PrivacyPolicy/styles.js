import styled from 'react-emotion';
import { font } from 'lib/theme';

export const Content = styled.div`
  padding-bottom: 4rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
  max-width: 55em;

  @media (min-width: 600px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  & p {
    font-size: ${font.up1};
    margin-bottom: 2rem;
    margin-top: 2rem;
    line-height: 1.6;
  }
`;
