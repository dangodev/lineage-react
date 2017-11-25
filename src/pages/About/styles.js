import glamorous from 'glamorous';

import { font, grid } from 'lib/theme';

export default {
  Award: glamorous.a({
    display: 'block',

    '& img': {
      height: 'auto',
      width: '100%',
    },
  }),

  AwardList: glamorous.div({
    display: 'grid',
    gridColumnGap: grid,
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center',
    paddingBottom: grid,
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: grid,

    '@media (min-width: 600px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '60em',
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },
  }),

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

  Grid: glamorous.div({
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 2 * grid,
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: 0,

    '@media (min-width: 600px)': {
      maxWidth: '50em',
      paddingBottom: 3 * grid,
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },
  }),

  SectionHeading: glamorous.h1({
    fontFamily: font.kaufmann,
    fontSize: font.up6,
    marginBottom: 0,
    marginTop: 2 * grid,
    textAlign: 'center',
  }),
};
