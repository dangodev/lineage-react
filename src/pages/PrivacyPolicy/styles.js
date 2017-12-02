import glamorous from 'glamorous';

import { font, grid } from 'lib/theme';

export default {
  Content: glamorous.div({
    paddingBottom: 2 * grid,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: grid,
    paddingRight: grid,
    maxWidth: '55em',

    '@media (min-width: 600px)': {
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },

    '& p': {
      fontSize: font.up1,
      marginBottom: grid,
      marginTop: grid,
      lineHeight: 1.6,
    },
  }),
};
