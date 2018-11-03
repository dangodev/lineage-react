import { ifProp } from 'styled-tools';
import styled from 'react-emotion';
import { Link } from '@reach/router';
import { color, font, layer, transition } from 'lib/theme';

import speckle from 'assets/speckle.png';

export const Colophon = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  width: 100%;
`;

export const Container = styled(Link)`
  background-color: rgb(${({ flavor }) => color[flavor]});
  opacity: ${ifProp({ isShowing: true }, 1, 0)};
  transform: ${ifProp({ isShowing: true }, 'translateY(0)', 'translateY(1rem)')};
  transition: opacity 400ms, transform 400ms ${transition.deceleration};
  background-image: url(${speckle});
  background-size: 400px auto;
  background-repeat: repeat;
  box-shadow: 0 0.25rem 0.5rem rgba(${color.black}, 0.1);
  color: rgb(${color.black});
  display: grid;
  font-size: 14px;
  line-height: 1;
  padding-left: 25%;
  position: relative;
  text-decoration: none;

  @media (min-width: 600px) {
    font-size: 16px;
  }

  &:hover figure {
    transform: translate(-0.75rem, -0.75rem) rotate(4deg);
  }
`;

export const Content = styled.div`
  font-size: ${font.down2};
  line-height: 1.5;
  margin-bottom: 0.5 rem;
  margin-top: 0.5 rem;

  & p {
    margin: 0;

    & + p {
      margin-top: 0.5 rem;
    }
  }
`;

export const Heading = styled.h1`
  font-size: ${font.up1};
  font-weight: 700;
  line-height: 0.8;
  margin: 0;
  text-transform: uppercase;
`;

export const HoverLink = styled.span`
  color: rgb(${color.black});
  display: block;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 200ms;

  &:hover {
    color: rgb(${color.blue});
  }
`;

export const Image = styled.figure`
  border-radius: 0.25 rem;
  box-shadow: 0.25rem 0.25rem 1rem rgba(${color.black}, 0.1);
  left: 0;
  margin: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform: translate(-0.5rem, -0.5rem);
  transition: transform 200ms ${transition.standard};
  width: 25%;
  z-index: ${layer.base};

  & img {
    height: auto;
    max-width: 100%;
  }
`;

export const Inner = styled.div`
  background-color: rgb(${color.white});
  display: grid;
  flex-direction: column;
  padding: 0.5rem;

  @media (min-width: 600px) {
    padding: 1rem;
  }
`;

export const Meta = styled.aside`
  display: block;
  font-size: ${font.down2};
  font-weight: 400;
  margin-top: 0.25rem;
  margin-bottom: 0;
`;

export const Note = styled.p`
  margin: 0;
  text-transform: capitalize;
  line-height: 1.75;
`;

export const NoteHeading = styled.h3`
  font-size: ${font.down3};
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 0.125rem;
  margin-top: 0.5rem;
  text-transform: uppercase;

  @media (min-width: 600px) {
    margin-top: 0.75rem;
  }
`;

export const NoteList = styled.div`
  font-size: ${font.down1};
  margin-bottom: 0.5rem;
  margin-top: 0;

  @media (min-width: 600px) {
    margin-bottom: 0.75rem;
  }
`;

export const Price = styled.div`
  font-family: ${font.kaufmann};
  font-size: ${font.up2};
  letter-spacing: -0.05em;
`;
