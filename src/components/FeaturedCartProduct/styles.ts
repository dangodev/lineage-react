import styled from 'react-emotion';
import { Link } from '@reach/router';
import { color, font } from 'lib/theme';
import speckle from 'assets/speckle.png';

const textColors = {
  blue: `rgb(${color.black})`,
  blueT: `rgb(${color.black})`,
  pink: `rgb(${color.black})`,
  red: `rgb(${color.white})`,
  white: `rgb(${color.black})`,
  yellow: `rgb(${color.black})`,
};

export const Container = styled.div`
  background-color: rgb(${color.offwhite});
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const ProductInfo = styled.div`
  flex-grow: 1;
  padding-bottom: 0.5rem;
  padding-left: 2.75rem;
`;

export const Heading = styled.h1`
  font-size: 1em;
  font-weight: 700;
  margin-top: 0.25rem;
  margin-bottom: 0;
  text-transform: uppercase;
`;

export const Grid = styled.div`
  display: flex;
  padding-right: 1rem;
  position: relative;
`;

export const Image = styled.img`
  border-radius: 0.25rem;
  box-shadow: 0.25rem 0.25rem 1rem rgba(${color.black}, 0.1);
  height: auto;
  left: -0.5rem;
  overflow: hidden;
  position: absolute;
  top: -0.5 rem;
  width: 2.25rem;
`;

export const Price = styled.div`
  font-family: ${font.kaufmann};
  font-size: ${font.up1};
  margin-top: 0.25rem;
`;

export const ViewProduct = styled(Link)`
  align-items: center;
  color: rgb(${color.black});
  display: flex;
  font-size: 1em;
  font-weight: 700;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 200ms;

  &:hover {
    color: rgb(${color.blue});
  }
`;

export const Label = styled.div`
  background-color: rgb(${({ themeColor }) => color[themeColor]});
  color: ${({ themeColor }) => textColors[themeColor]};
  background-image: url(${speckle});
  background-size: 400px auto;
  font-size: ${font.down2};
  font-weight: 700;
  padding-bottom: 0.25rem;
  padding-left: 2.75rem;
  padding-top: 0.25rem;
  text-transform: uppercase;
`;

export const Notes = styled.div`
  font-size: ${font.down2};
  text-transform: capitalize;
`;
