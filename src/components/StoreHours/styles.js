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
    paddingBottom: 2 * grid,
    paddingTop: grid,
  }),

  Days: glamorous.dt({
    display: 'block',
    margin: 0,
    width: '50%',
  }),

  Grid: glamorous.div({
    display: 'block',

    '@media (min-width: 600px)': {
      display: 'grid',
      gridColumnGap: grid,
      gridTemplateColumns: 'repeat(12, 1fr)',
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
    gridColumn: '8 / span 2',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: grid,
    maxWidth: '20em',
    width: `calc(100vw - ${2 * grid}px)`,

    '@media (min-width: 600px)': {
      gridColumn: '4 / span 3',
      marginLeft: 0,
      marginRight: 0,
      width: 'auto',

      '&:nth-of-type(even)': {
        gridColumnStart: '7',
      },
    },
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
