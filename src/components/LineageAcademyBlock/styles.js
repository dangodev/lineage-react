import styled from '@emotion/styled';
import { color, font } from 'lib/theme';

export const Actions = styled.menu`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 4rem;
  padding-bottom: 0;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0;
  position: relative;

  & > * + * {
    margin-top: 1rem;

    @media (min-width: 600px) {
      margin-left: 2rem;
      margin-top: 0;
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const Body = styled.p`
  font-size: ${font.up1};
  line-height: 1.8;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

export const Container = styled.div`
  background-color: rgb(${color.white});
  background-image: linear-gradient(35deg, rgba(${color.white}, 1) 25%, rgba(${color.white}, 0)),
    url('https://cdn-images-1.medium.com/max/2000/1*3FfxQ5V16HhHLWojCQI__A.jpeg');
  background-position: center center;
  background-size: cover;
  padding-top: 6rem;
  padding-bottom: 4rem;
`;

export const Content = styled.div`
  max-width: 35em;
  padding-left: 2rem;

  @media (min-width: 600px) {
    padding-left: 4rem;
    width: 50%;
  }
`;

export const Heading = styled.h3`
  font-size: ${font.up4};
  margin-bottom: 0;
  margin-top: 0;
  text-transform: uppercase;
`;
