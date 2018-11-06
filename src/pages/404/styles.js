import styled from 'react-emotion';

import { color, font } from 'lib/theme';

export const Body = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;

  & a {
    color: rgb(${color.blue});
  }
`;

export const Container = styled.div`
  background-color: #e7cbc7;
  background-image: url('https://cdn.shopify.com/s/files/1/0746/4367/files/Cafe_Sneak-12.jpg?7295630232810353631');
  background-position: center bottom;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1rem);
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: center;
  width: 100vw;

  @media (min-width: 600px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

export const Heading = styled.h1`
  font-family: ${font.din};
  font-size: ${font.up10};
  font-weight: 700;
  margin: 0;
`;

export const Subheading = styled.h2`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  margin: 0;
`;
