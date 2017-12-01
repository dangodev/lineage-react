import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Inner: glamorous.dl({
    display: 'flex',
    flexWrap: 'wrap',
    lineHeight: 1.2,
    margin: 0,
    paddingTop: 0,
  }),

  Heading: glamorous.h3({
    fontSize: font.down1,
    letterSpacing: '0.075em',
    marginBottom: 0.375 * grid,
    marginTop: 0,
    textTransform: 'uppercase',

    '@media (min-width: 600px)': {
      marginTop: 1.5 * grid,
    },
  }),

  Key: glamorous.dt({
    color: `rgb(${color.gray})`,
    fontWeight: 500,
    margin: 0,
    width: '50%',

    '& ~ dt': {
      paddingTop: 0.375 * grid,
    },
  }),

  Metafields: glamorous.div({
    backgroundColor: `rgb(${color.white})`,
    flex: 2,
    fontSize: font.down1,
    margin: 0,
    padding: 0.75 * grid,
  }),

  Value: glamorous.dd(
    {
      fontSize: font.down1,
      lineHeight: 1.4,
      margin: 0,

      '& ~ dd': {
        paddingTop: 0.375 * grid,
      },
    },
    props => ({
      textAlign: props.full ? 'left' : 'right',
      width: props.full ? '100%' : '50%',
    }),
  ),
};
