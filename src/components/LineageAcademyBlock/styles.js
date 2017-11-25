import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Actions: glamorous.menu({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 2 * grid,
    paddingBottom: 0,
    paddingLeft: grid,
    paddingRight: grid,
    paddingTop: 0,
    position: 'relative',

    '& > * + *': {
      marginTop: 0.5 * grid,

      '@media (min-width: 600px)': {
        marginLeft: grid,
        marginTop: 0,
      },
    },

    '@media (min-width: 600px)': {
      flexDirection: 'row',
    },
  }),

  Body: glamorous.p({
    fontSize: font.up1,
    lineHeight: 1.8,
    marginBottom: grid,
    marginTop: grid,
  }),

  Container: glamorous.div({
    backgroundColor: `rgb(${color.white})`,
    backgroundImage: `linear-gradient(35deg, rgba(${color.white}, 1) 25%, rgba(${color.white}, 0)), url('https://cdn-images-1.medium.com/max/2000/1*3FfxQ5V16HhHLWojCQI__A.jpeg')`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    paddingTop: 3 * grid,
    paddingBottom: 2 * grid,
  }),

  Content: glamorous.div({
    maxWidth: '35em',
    paddingLeft: grid,

    '@media (min-width: 600px)': {
      paddingLeft: 2 * grid,
      width: '50%',
    },
  }),

  Heading: glamorous.h3({
    fontSize: font.up4,
    marginBottom: 0,
    marginTop: 0,
    textTransform: 'uppercase',
  }),
};
