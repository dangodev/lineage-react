import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid, layer, transition } from 'lib/theme';

import speckle from 'assets/speckle.png';

export default {
  Colophon: glamorous.div({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
    width: '100%',
  }),

  Container: glamorous(Link)(
    {
      backgroundImage: `url(${speckle})`,
      backgroundSize: '400px auto',
      backgroundRepeat: 'repeat',
      boxShadow: `0 ${0.25 * grid}px ${0.5 * grid}px rgba(${color.black}, 0.1)`,
      color: `rgb(${color.black})`,
      display: 'grid',
      fontSize: 14,
      lineHeight: 1,
      paddingLeft: '25%',
      position: 'relative',
      textDecoration: 'none',

      '@media (min-width: 600px)': {
        fontSize: 16,
      },

      ':hover figure': {
        transform: `translate(-${0.75 * grid}px, -${0.75 * grid}px) rotate(4deg)`,
      },
    },
    ({ flavor = 'pink', isShowing, delay }) => ({
      backgroundColor: `rgb(${color[flavor]})`,
      opacity: isShowing ? 1 : 0,
      transform: isShowing ? 'translateY(0)' : `translateY(${grid}px)`,
      transition: `opacity 400ms ${delay}ms, transform 400ms ${transition.deceleration} ${delay}ms`,
    }),
  ),

  Content: glamorous.div({
    fontSize: font.down2,
    lineHeight: 1.5,
    marginBottom: 0.5 * grid,
    marginTop: 0.5 * grid,

    '& p': {
      margin: 0,

      '& + p': {
        marginTop: 0.5 * grid,
      },
    },
  }),

  Heading: glamorous.h1({
    fontSize: font.up1,
    fontWeight: 700,
    lineHeight: 0.8,
    margin: 0,
    textTransform: 'uppercase',
  }),

  HoverLink: glamorous.span({
    color: `rgb(${color.black})`,
    display: 'block',
    fontWeight: 500,
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'color 200ms',

    '&:hover': {
      color: `rgb(${color.blue})`,
    },
  }),

  Image: glamorous.figure({
    borderRadius: 0.25 * grid,
    boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${grid}px rgba(${color.black}, 0.1)`,
    left: 0,
    margin: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    transform: `translate(-${0.5 * grid}px, -${0.5 * grid}px)`,
    transition: `transform 200ms ${transition.standard}`,
    width: '25%',
    zIndex: layer.base,

    '& img': {
      height: 'auto',
      maxWidth: '100%',
    },
  }),

  Inner: glamorous.div({
    backgroundColor: `rgb(${color.white})`,
    display: 'grid',
    flexDirection: 'column',
    padding: 0.5 * grid,

    '@media (min-width: 600px)': {
      padding: grid,
    },
  }),

  Meta: glamorous.aside({
    display: 'block',
    fontSize: font.down1,
    fontWeight: 400,
    marginTop: 0.25 * grid,
    marginBottom: 0,
  }),

  Note: glamorous.p({
    margin: 0,
    textTransform: 'capitalize',
    lineHeight: 1.75,
  }),

  NoteList: glamorous.div({
    fontSize: font.down2,
    marginBottom: 0.5 * grid,
    marginTop: 0.5 * grid,

    '@media (min-width: 600px)': {
      marginBottom: 0.75 * grid,
      marginTop: 0.75 * grid,
    },
  }),

  Price: glamorous.div({
    fontFamily: font.kaufmann,
    fontSize: font.up2,
    letterSpacing: '-0.05em',
  }),
};
