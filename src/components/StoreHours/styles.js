import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

const colorState = (status) => {
  switch (status) {
    case 'Open':
      return `rgb(${color.blue})`;
    case 'Closing Soon':
      return `rgb(${color.red})`;
    default:
      return `rgb(${color.gray})`;
  }
};

export default {
  Container: glamorous.div({
    fontSize: font.down1,
    paddingBottom: 2 * grid,
    paddingTop: grid,

    '@media (min-width: 600px)': {
      fontSize: '1em',
    },
  }),

  Days: glamorous.dt({
    display: 'block',
    margin: 0,
    width: '50%',
  }),

  Grid: glamorous.div({
    boxSizing: 'border-box',
    display: 'grid',
    gridColumnGap: 0.5 * grid,
    gridTemplateColumns: 'repeat(12, 1fr)',

    '@media (min-width: 600px)': {
      gridColumnGap: 1.5 * grid,
    },
  }),

  Heading: glamorous.h1({
    fontFamily: font.kaufmann,
    fontSize: font.up4,
    textAlign: 'center',
  }),

  Hours: glamorous.dl(
    {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      fontWeight: 500,
      lineHeight: 1,
    },
    props => ({
      color: props.isToday ? `rgb(${color.black})` : `rgb(${color.gray})`,
    }),
  ),

  Location: glamorous.div({
    gridColumn: '2 / span 5',
    marginTop: grid,
    maxWidth: '20em',

    '&:nth-of-type(even)': {
      gridColumnStart: '7',
    },

    '@media (min-width: 600px)': {
      gridColumn: '4 / span 3',
      marginLeft: 0,
      marginRight: 0,

      '&:nth-of-type(even)': {
        gridColumnStart: '7',
      },
    },
  }),

  LocationAddress: glamorous.a({
    color: `rgb(${color.blue})`,
    display: 'block',
    fontSize: font.down1,
    marginTop: 0.125 * grid,
    textDecoration: 'none',
  }),

  LocationName: glamorous.h2({
    fontSize: font.up1,
    fontWeight: 700,
    lineHeight: 1,
    margin: 0,
    textTransform: 'uppercase',
  }),

  Range: glamorous.dd({
    display: 'block',
    margin: 0,
    textAlign: 'right',
    width: '50%',
  }),

  Status: glamorous.h3(
    {
      fontFamily: font.kaufmann,
      fontSize: font.up3,
      lineHeight: 1,
      marginBottom: 0,
      marginTop: 0.25 * grid,
    },
    props => ({
      color: colorState(props.status),
    }),
  ),
};
