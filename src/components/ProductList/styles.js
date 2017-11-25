import glamorous from 'glamorous';

import { grid } from 'lib/theme';

export default {
  Grid: glamorous.div({
    display: 'grid',
    gridColumnGap: grid,
    gridRowGap: grid,

    '@media (min-width: 920px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  }),

  Zero: glamorous.div({
    paddingBottom: grid,
    paddingTop: grid,
    textAlign: 'center',
  }),
};
