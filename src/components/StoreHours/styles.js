import styled from 'react-emotion';
import { ifProp } from 'styled-tools';
import { color, font } from 'lib/theme';

const colorState = {
  Open: `rgb(${color.blue})`,
  'Closing Soon': `rgb(${color.red})`,
};

export const Container = styled.div`
  font-size: ${font.down1};
  padding-bottom: 2rem;
  padding-top: 1rem;

  @media (min-width: 600px) {
    font-size: 1em;
  }
`;

export const Days = styled.dt`
  display: block;
  margin: 0;
  width: 50%;
`;

export const Grid = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(12, 1fr);

  @media (min-width: 600px) {
    grid-column-gap: 1.5rem;
  }
`;

export const Heading = styled.h1`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  text-align: center;
`;

export const Hours = styled.dl`
  color: ${ifProp({ isToday: true }, `rgb(${color.black})`, `rgb(${color.gray})`)};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  line-height: 1;
`;

export const Location = styled.div`
  grid-column: 2 / span 5;
  margin-top: 1rem;
  max-width: 20em;

  &:nth-of-type(even) {
    grid-column-start: 7;
  }

  @media (min-width: 600px) {
    grid-column: 4 / span 3;
    margin-left: 0;
    margin-right: 0;

    &:nth-of-type(even) {
      grid-column-start: 7;
    }
  }
`;

export const LocationAddress = styled.a`
  color: rgb(${color.blue});
  display: block;
  font-size: ${font.down1};
  margin-top: 0.125rem;
  text-decoration: 'none';
`;

export const LocationName = styled.h2`
  font-size: ${font.up1};
  font-weight: 700;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
`;

export const Range = styled.dd`
  display: block;
  margin: 0;
  text-align: right;
  width: 50%;
`;

export const Status = styled.h3`
  color: ${props => colorState[props.status] || `rgb(${color.gray})`};
  font-family: ${font.kaufmann};
  font-size: ${font.up3};
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0.25rem;
`;
