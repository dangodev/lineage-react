import styled from 'react-emotion';
import { color, font } from 'lib/theme';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-end: 6;
  grid-column-start: 2;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 800px) {
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding-left: 0;
    padding-right: 0;
  }

  & h2 {
    font-size: ${font.up2};
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 0;
    text-transform: uppercase;
  }

  & p {
    font-size: 1em;
    line-height: 1.5;
    margin-bottom: 0;
    margin-top: 0;

    & + p {
      margin-top: 1rem;
    }
  }
`;

export const CTA = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;

  & p {
    margin-bottom: 0;
    margin-top: 1rem;

    & a {
      color: rgb(${color.blue});
      font-weight: 500;
      transition: color 200ms;

      &:hover {
        color: rgb(${color.blueT});
      }
    }
  }
`;

export const CTAHeading = styled.h3`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  margin-bottom: 1rem;
  margin-top: 0;
`;

export const FAQHeading = styled.h3`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  margin-bottom: 1.5rem;
  margin-top: 0;
  text-align: 'center';
`;

export const Grid = styled.div`
  margin-bottom: 2 rem;
  margin-top: 2 rem;

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 0.5rem;
  }
`;

export const Photo = styled.figure`
  align-items: center;
  display: flex;
  grid-column-end: 13;
  grid-column-start: 7;
  margin: 0;
  padding: 0;

  & img {
    height: auto;
    width: 100%;
  }
`;

export const ProductHeading = styled.h3`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  margin-bottom: 1.5rem;
  margin-top: 0;
  text-align: center;
`;

export const ProductWrapper = styled.div`
  margin-top: 2rem;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;

  @media (min-width: 600px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
