import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Container: glamorous.div({
    backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0746/4367/files/Cafe_Sneak-12.jpg?7295630232810353631)',
    backgroundPosition: 'center bottom',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - ${grid}px)`,
    paddingLeft: grid,
    paddingRight: grid,
    justifyContent: 'center',
    width: '100vw',

    '@media (min-width: 600px)': {
      paddingLeft: 4 * grid,
      paddingRight: 4 * grid,
    },
  }),

  Heading: glamorous.h1({
    fontFamily: font.din,
    fontSize: font.up10,
    fontWeight: 700,
    margin: 0,
  }),

  Subheading: glamorous.h2({
    fontFamily: font.kaufmann,
    fontSize: font.up4,
    margin: 0,
  }),

  Body: glamorous.p({
    marginTop: 0.5 * grid,
    marginBottom: 0,

    '& a': {
      color: `rgb(${color.blue})`,
    },
  }),
};
