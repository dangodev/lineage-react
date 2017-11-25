import glamorous from 'glamorous';

import { font, grid } from 'lib/theme';

export default {
  Container: glamorous.div({
    paddingTop: 2 * grid,
  }),

  Subheading: glamorous.h3({
    fontFamily: font.kaufmann,
    fontSize: font.up4,
    marginBottom: grid,
    marginTop: 0,
    textAlign: 'center',
  }),
};
