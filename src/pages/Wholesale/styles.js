import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Content: glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    gridColumnEnd: 6,
    gridColumnStart: 2,
    justifyContent: 'center',
    marginBottom: grid,
    marginTop: grid,
    paddingLeft: grid,
    paddingRight: grid,

    '@media (min-width: 800px)': {
      marginBottom: grid,
      marginTop: grid,
      paddingLeft: 0,
      paddingRight: 0,
    },

    '& h2': {
      fontSize: font.up2,
      fontWeight: 700,
      marginBottom: grid,
      marginTop: 0,
      textTransform: 'uppercase',
    },

    '& p': {
      fontSize: '1em',
      lineHeight: 1.5,
      marginBottom: 0,
      marginTop: 0,

      '& + p': {
        marginTop: grid,
      },
    },
  }),

  CTA: glamorous.div({
    marginBottom: 2 * grid,
    marginTop: 2 * grid,
    paddingLeft: grid,
    paddingRight: grid,
    textAlign: 'center',

    '& p': {
      marginBottom: 0,
      marginTop: grid,

      '& a': {
        color: `rgb(${color.blue})`,
        fontWeight: 500,
        transition: 'color 200ms',

        ':hover': {
          color: `rgb(${color.blueT})`,
        },
      },
    },
  }),

  CTAHeading: glamorous.h3({
    fontFamily: font.kaufmann,
    fontSize: font.up4,
    marginBottom: grid,
    marginTop: 0,
  }),

  FAQHeading: glamorous.h3({
    fontFamily: font.kaufmann,
    fontSize: font.up4,
    marginBottom: 1.5 * grid,
    marginTop: 0,
    textAlign: 'center',
  }),

  Grid: glamorous.div({
    marginBottom: 2 * grid,
    marginTop: 2 * grid,

    '@media (min-width: 800px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridColumnGap: 0.5 * grid,
    },
  }),

  Photo: glamorous.figure({
    alignItems: 'center',
    display: 'flex',
    gridColumnEnd: 13,
    gridColumnStart: 7,
    margin: 0,
    padding: 0,

    '& img': {
      height: 'auto',
      width: '100%',
    },
  }),

  ProductHeading: glamorous.h3({
    fontFamily: font.kaufmann,
    fontSize: font.up4,
    marginBottom: 1.5 * grid,
    marginTop: 0,
    textAlign: 'center',
  }),

  ProductWrapper: glamorous.div({
    marginTop: 2 * grid,
    paddingBottom: 3 * grid,
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: 2 * grid,

    '@media (min-width: 600px)': {
      paddingLeft: 2 * grid,
      paddingRight: 2 * grid,
    },
  }),
};
