import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Container: glamorous.div({
    backgroundColor: `rgb(${color.offWhite})`,
    paddingBottom: 3 * grid,
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: 2 * grid,

    '@media (min-width: 600px)': {
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },
  }),

  Subheading: glamorous.h3({
    fontFamily: font.kaufmann,
    fontSize: font.up4,
    marginBottom: 0,
    marginTop: grid,
    textAlign: 'center',
  }),
};
