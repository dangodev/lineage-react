import glamorous from 'glamorous';

import { font, grid } from 'lib/theme';

export default {
  BrewHeading: glamorous.h1({
    fontFamily: font.kaufmann,
    fontSize: font.up6,
    marginBottom: 0,
    marginTop: 2 * grid,
    textAlign: 'center',
  }),

  Grid: glamorous.div({
    display: 'grid',
    gridColumnGap: grid,
    gridRowGap: 1.5 * grid,
    paddingBottom: 2 * grid,
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: 2 * grid,

    '@media (min-width: 600px)': {
      gridTemplateColumns: '1fr 1fr',
      paddingBottom: 3 * grid,
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },

    '@media (min-width: 1080px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  }),
};
