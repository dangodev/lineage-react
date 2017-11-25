import glamorous from 'glamorous';

import { grid } from 'lib/theme';

export default {
  Container: glamorous.div({
    marginTop: grid,
    marginBottom: grid,
    paddingLeft: grid,
    paddingRight: grid,

    '@media (min-width: 600px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '60em',
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },
  }),
};
