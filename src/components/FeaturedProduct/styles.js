import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

import speckle from 'assets/speckle.png';

export default {
  Container: glamorous.div({
    backgroundColor: `rgb(${color.green})`,
    backgroundImage: `linear-gradient(rgb(250, 196, 170), rgb(255, 182, 170)), url(${speckle})`,
    backgroundPosition: '0 0, 0 0',
    backgroundRepeat: 'repeat-x, repeat',
    backgroundSize: `100% ${4 * grid}px, 400px auto`,
    paddingBottom: 2 * grid,
    paddingTop: grid,
  }),

  Content: glamorous.div({
    backgroundColor: color.white,
    gridColumnEnd: 11,
    gridColumnStart: 3,

    '@media (min-width: 600px)': {
      gridColumnEnd: 10,
      gridColumnStart: 4,
    },
  }),

  Grid: glamorous.div({
    alignItems: 'center',
    display: 'grid',
    gridColumnGap: 0.5 * grid,
    gridTemplateColumns: 'repeat(12, 1fr)',
  }),

  Heading: glamorous.h1({
    fontFamily: font.kaufmann,
    fontSize: font.up3,
    lineHeight: 1,
    marginTop: 0,
    marginBottom: grid,
    textAlign: 'center',

    '@media (min-width: 600px)': {
      fontSize: font.up5,
    },

    ' & small': {
      display: 'block',
      fontFamily: font.din,
      fontSize: font.down5,
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  }),
};
