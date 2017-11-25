import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { color, font, grid } from 'lib/theme';

import speckle from 'assets/speckle.png';

const textColors = {
  blue: `rgb(${color.black})`,
  blueT: `rgb(${color.black})`,
  pink: `rgb(${color.black})`,
  red: `rgb(${color.white})`,
  white: `rgb(${color.black})`,
  yellow: `rgb(${color.black})`,
};

export default {
  Container: glamorous.div({
    backgroundColor: `rgb(${color.offwhite})`,
    marginBottom: grid,
    marginTop: grid,
  }),

  ProductInfo: glamorous.div({
    flexGrow: 1,
    paddingBottom: 0.5 * grid,
    paddingLeft: 2.75 * grid,
  }),

  Heading: glamorous.h1({
    fontSize: '1em',
    fontWeight: 700,
    marginTop: 0.25 * grid,
    marginBottom: 0,
    textTransform: 'uppercase',
  }),

  Grid: glamorous.div({
    display: 'flex',
    paddingRight: grid,
    position: 'relative',
  }),

  Image: glamorous.img({
    borderRadius: 0.25 * grid,
    boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${grid}px rgba(${color.black}, 0.1)`,
    height: 'auto',
    left: `-${0.5 * grid}`,
    overflow: 'hidden',
    position: 'absolute',
    top: `-${0.5 * grid}`,
    width: 2.25 * grid,
  }),

  Price: glamorous.div({
    fontFamily: font.kaufmann,
    fontSize: font.up1,
    marginTop: 0.25 * grid,
  }),

  ViewProduct: glamorous(Link)({
    alignItems: 'center',
    color: `rgb(${color.black})`,
    display: 'flex',
    fontSize: '1em',
    fontWeight: 700,
    justifyContent: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'color 200ms',

    ':hover': {
      color: `rgb(${color.blue})`,
    },
  }),

  Label: glamorous.div(
    {
      backgroundImage: `url(${speckle})`,
      backgroundSize: '400px auto',
      fontSize: font.down2,
      fontWeight: 700,
      paddingBottom: 0.25 * grid,
      paddingLeft: 2.75 * grid,
      paddingTop: 0.25 * grid,
      textTransform: 'uppercase',
    },
    ({ themeColor = 'pink' }) => ({
      backgroundColor: `rgb(${color[themeColor]})`,
      color: textColors[themeColor],
    })
  ),

  Notes: glamorous.div({
    fontSize: font.down2,
    textTransform: 'capitalize',
  }),
};
