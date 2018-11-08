import styled from 'react-emotion';
import { color, font } from 'lib/theme';

export const Actions = styled.menu`
  display: flex;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 4rem;
  padding-bottom: 0;
  padding-left: 4rem;
  padding-right: 0;
  padding-top: 0;
  position: relative;
`;

export const Body = styled.p`
  font-size: ${font.up1};
  line-height: 1.8;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

export const Container = styled.div`
  background-color: rgb(${color.blue});
  padding-top: 1.25rem;
  padding-bottom: 2rem;

  @media (min-width: 600px) {
    padding-top: 6rem;
    padding-bottom: 4rem;
  }
`;

export const Content = styled.div`
  max-width: 35em;
  padding-left: 2rem;
  padding-right: 2rem;

  @media (min-width: 600px) {
    padding-left: 4rem;
    padding-right: 0;
    width: 50%;
  }
`;

export const Heading = styled.h3`
  font-size: ${font.up4};
  margin-bottom: 0;
  margin-top: 0;
  text-transform: uppercase;
`;
