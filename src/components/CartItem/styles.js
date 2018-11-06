import styled from 'react-emotion';
import { color, font } from 'lib/theme';
import speckle from 'assets/speckle.png';

export const Container = styled.div`
  display: flex;
  position: relative;

  & + * {
    margin-top: 1rem;
  }
`;

export const Description = styled.div`
  display: block;
  font-size: ${font.down2};
  font-weight: 400;
  margin-top: 0.25rem;
`;

export const Heading = styled.h3`
  font-size: 1em;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0;
  margin-top: 0;
  text-transform: uppercase;
`;

export const Notes = styled.div`
  line-height: 1.5;
  text-transform: capitalize;
`;

export const Price = styled.div`
  font-family: ${font.kaufmann};
  font-size: ${font.up1};
  margin-top: 0.25rem;
`;

export const ProductInfo = styled.div`
  flex-grow: 1;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  width: calc(100% - 4rem);
`;

export const ProductType = styled.div`
  font-size: ${font.down1};
`;

export const Quantity = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgb(${color.blue});
  cursor: pointer;
  font-size: ${font.up3};
  font-weight: 500;
  height: 1rem;
  letter-spacing: 0;
  margin-bottom: 0.25rem;
  outline: none;
  padding: 0;
  text-align: center;
  transition: background-color 200ms linear;
  width: 1rem;

  &:hover {
    background-color: rgba(${color.blue}, 0.2);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }
`;

export const QuantityLabel = styled.div`
  align-items: center;
  color: rgb(${color.black});
  display: flex;
  flex-direction: column;
  font-size: ${font.down3};
  letter-spacing: 0.1em;
  padding-right: 1rem;
  padding-top: 0.5rem;
  text-transform: uppercase;
  width: 2rem;
`;

export const Remove = styled.button`
  appearance: none;
  background: none;
  border: none;
  color: rgb(${color.red});
  cursor: pointer;
  font-size: ${font.down2};
  font-weight: 400;
  margin-top: 0.25rem;
  outline: none;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
`;

export const Thumb = styled.img`
  border-radius: 0.25rem;
  box-shadow: 0.25rem 0.25rem 1rem rgba(${color.black}, 0.1);
  display: block;
  height: auto;
  overflow: hidden;
  transform: translate(-0.75rem, -0.625rem);
  width: 2rem;
`;

export const ThumbContainer = styled.div`
  background-color: rgb(${props => color[props.color] || color.pink});
  background-image: url(${speckle});
  background-size: 400px auto;
  padding: 0.25rem;
  width: 2rem;
`;
