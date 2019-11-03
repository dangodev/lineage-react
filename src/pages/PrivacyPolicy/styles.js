import styled from '@emotion/styled';
import { font } from '../../lib/theme';

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 55em;
  padding-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;

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
