import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Inner: glamorous.dl({
    display: 'flex',
    flexWrap: 'wrap',
    lineHeight: 1,
    margin: 0,
    paddingTop: 0,

    '@media (min-width: 600px)': {
      paddingTop: grid,
    },
  }),

  Key: glamorous.dt({
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
    fontSize: font.down2,
    margin: 0,
    padding: 0.75 * grid,
  }),

  Value: glamorous.dd({
    margin: 0,
    textAlign: 'right',
    width: '50%',

    '& ~ dd': {
      paddingTop: 0.375 * grid,
    },
  }),
};
