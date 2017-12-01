import glamorous from 'glamorous';

import { font, grid } from 'lib/theme';

export default {
  Container: glamorous.div({
    fontSize: font.down1,
    marginTop: grid,
    marginBottom: grid,
    paddingLeft: grid,
    paddingRight: grid,

    '@media (min-width: 600px)': {
      fontSize: '1em',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '60em',
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },
  }),
};
