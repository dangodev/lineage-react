import styled from 'react-emotion';
import { ifProp } from 'styled-tools';
import { color, font } from 'lib/theme';

export const Inner = styled.dl`
  display: flex;
  flex-wrap: wrap;
  line-height: 1.2;
  margin: 0;
  padding-top: 0;
`;

export const Heading = styled.h3`
  font-size: ${font.down1};
  letter-spacing: 0.075em;
  margin-bottom: 0.75rem;
  margin-top: 0;
  text-transform: uppercase;

  @media (min-width: 600px) {
    margin-top: 3rem;
  }
`;

export const Key = styled.dt`
  color: rgb(${color.gray});
  font-weight: 500;
  margin: 0;
  width: 50%;

  & ~ dt {
    padding-top: 0.75rem;
  }
`;

export const Metafields = styled.div`
  background-color: rgb(${color.white});
  flex: 2;
  font-size: ${font.down1};
  margin: 0;
  padding: 1.5rem;
`;

export const Value = styled.dd`
  font-size: ${font.down1};
  line-height: 1.4;
  text-align: ${ifProp({ full: true }, 'left', 'right')};
  width: ${ifProp({ full: true }, '100%', '50%')};
  margin: 0;

  & ~ dd {
    padding-top: 0.75rem;
  }
`;
