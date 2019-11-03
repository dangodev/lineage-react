import styled from 'react-emotion';
import { font } from '../../lib/theme';

export const Award = styled.a`
  display: block;

  & img {
    height: auto;
    width: 100%;
  }
`;

export const AwardList = styled.div`
  display: 2rem;
  grid-column-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;

  @media (min-width: 600px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 60em;
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

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

export const Grid = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0;

  @media (min-width: 600px) {
    max-width: 50em;
    padding-bottom: 6rem;
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

export const SectionHeading = styled.h1`
  font-family: ${font.kaufmann};
  font-size: ${font.up6};
  margin-bottom: 0;
  margin-top: 4rem;
  text-align: center;
`;
