import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

const bgPositions = {
  coffee: 'center top',
  gear: 'center 75%',
};

export default {
  Container: glamorous.div({
  }),

  Description: glamorous.p({
    lineHeight: 1.5,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: grid,
    maxWidth: '40em',
    textAlign: 'center',
  }),

  Heading: glamorous.h1({
    fontFamily: font.kaufmann,
    fontSize: font.up8,
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center',
  }),

  Inner: glamorous.div(
    {
      alignItems: 'center',
      backgroundColor: `rgb(${color.cadet})`,
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      height: '75vh',
      maxHeight: '30em',
      minHeight: '20em',
      position: 'relative',
      paddingTop: 2 * grid,

      '::after': {
        backgroundImage: `linear-gradient(rgba(${color.offwhite}, 0), rgba(${color.offwhite}, 1))`,
        bottom: 0,
        content: '""',
        height: 3 * grid,
        left: 0,
        position: 'absolute',
        right: 0,
      },
    },
    props => ({
      backgroundImage: `url('${props.imgSm}')`,
      backgroundPosition: bgPositions[props.handle] ? bgPositions[props.handle] : 'center center',

      '@media (min-width: 1281px), @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-width: 641px)': {
        backgroundImage: `url('${props.imgLg}')`,
      },
    }),
  ),
};
