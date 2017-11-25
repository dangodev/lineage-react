import glamorous from 'glamorous';

import { color, font, grid, layer, transition } from 'lib/theme';

export default {
  Actions: glamorous.menu({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: grid,
    padding: 0,
    position: 'relative',
  }),

  Close: glamorous.a({
    alignItems: 'center',
    color: `rgb(${color.black})`,
    display: 'grid',
    fontSize: 28,
    fontWeight: 500,
    height: 2 * grid,
    justifyContent: 'center',
    left: 0,
    lineHeight: 1,
    position: 'fixed',
    textDecoration: 'none',
    top: 0,
    width: 2 * grid,
    zIndex: layer.modal,

    '@media (min-width: 600px)': {
      left: 'auto',
      position: 'absolute',
      right: 0,
    },
  }),

  Container: glamorous.div(
    {
      height: '100vh',
      left: 0,
      overflowY: 'scroll',
      position: 'fixed',
      right: 0,
      top: 0,
      WebkitOverflowScrolling: 'touch',
      zIndex: layer.modal,
    },
    ({ isShowing }) => ({
      visibility: isShowing ? 'visibile' : 'hidden',
      transition: isShowing ? 'none' : 'visibility 0ms 200ms',
    }),
  ),

  CoreInfo: glamorous.div({
    flex: 5,
    marginBottom: grid,
    paddingLeft: grid,
    paddingRight: grid,

    '@media (min-width: 600px)': {
      marginBottom: 0,
      paddingLeft: 0,
    },
  }),

  Description: glamorous.div({
    fontSize: font.down1,

    ' & p': {
      lineHeight: 1.8,
      marginBottom: 0,
      marginTop: 0,

      '& + p': {
        marginTop: 0.5 * grid,
      },
    },
  }),

  Grid: glamorous.div({
    marginBottom: grid,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 2 * grid,
    maxWidth: `calc(100vw - ${grid}px)`,
    width: '100vw',
    zIndex: layer.modal + 1,

    '@media (min-width: 600px)': {
      width: '75vw',
    },
  }),

  Heading: glamorous.h1({
    fontSize: font.up3,
    lineHeight: 1,
    marginBottom: 0.5 * grid,
    marginTop: 0,
    textTransform: 'uppercase',

    '@media (min-width: 600px)': {
      paddingTop: grid,
    },
  }),

  Image: glamorous.figure({
    borderRadius: 0.5 * grid,
    boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${grid}px rgba(${color.black}, 0.1)`,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    transform: `translateY(-${grid}px)`,
    width: '87.5%',

    '@media (min-width: 600px)': {
      left: 0,
      margin: 0,
      position: 'absolute',
      top: 0,
      transform: `translate(-${2 * grid}px, -${grid}px)`,
      width: 6 * grid,
    },

    '& img': {
      display: 'block',
      height: 'auto',
      width: '100%',
    },
  }),

  Info: glamorous.div({
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 600px)': {
      flexDirection: 'row',
      paddingLeft: '25%',
    },
  }),

  Modal: glamorous.div(
    {
      backgroundColor: `rgb(${color.white})`,
      display: 'block',
      paddingBottom: grid,
      position: 'relative',
      transition: `opacity 200ms, transform 200ms ${transition.standard}`,
      zIndex: layer.modal + 1,
    },
    ({ isShowing }) => ({
      opacity: isShowing ? 1 : 0,
      transform: isShowing ? 'translateY(0)' : `translateY(${3 * grid}px)`,
    })
  ),

  Notes: glamorous.p({
    fontSize: font.down1,
    lineHeight: 1.8,
    marginBottom: 0,
    marginTop: 0,
    textTransform: 'capitalize',
  }),

  Option: glamorous.div({
    display: 'block',
    flexGrow: 1,
    lineHeight: 1,
    overflow: 'hidden',
    position: 'relative',

    '@media (min-width: 600px)': {
      flexGrow: 0,
    },

    '& input': {
      position: 'absolute',
      right: '200%',
    },

    '& label': {
      alignItems: 'center',
      boxShadow: `inset 0 0 0 2px rgba(${color.gray}, 1)`,
      color: `rgb(${color.gray})`,
      cursor: 'pointer',
      display: 'flex',
      fontSize: font.down1,
      fontWeight: 500,
      height: grid,
      justifyContent: 'center',
      padding: 0,
      transition: 'background-color 200ms, box-shadow 200ms, color 200ms',

      '@media (min-width: 600px)': {
        width: 2 * grid,
      },
    },

    '& input:checked + label': {
      backgroundColor: `rgb(${color.black})`,
      boxShadow: `inset 0 0 0 2px rgba(${color.gray}, 0)`,
      color: `rgb(${color.white})`,
    },
  }),

  OptionList: glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 0.25 * grid,
    width: '100%',

    '@media (min-width: 600px)': {

      '> * + *': {
        marginLeft: 0.25 * grid,
      },
    },
  }),

  Overlay: glamorous.a(
    {
      cursor: 'pointer',
      bottom: 0,
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      transition: 'opacity 200ms',
      zIndex: layer.modal,
    },
    ({ flavor, isShowing = false }) => ({
      backgroundColor: flavor === 'white' ? `rgba(${color.black}, 0.7)` : `rgba(${color[flavor]}, 0.7)`,
      opacity: isShowing ? 1 : 0,
    }),
  ),

  Price: glamorous.div({
    fontFamily: font.kaufmann,
    fontSize: font.up3,
    marginTop: grid,
    textAlign: 'center',
  }),

  Quantity: glamorous.div({
    display: 'flex',
  }),

  QuantityWholesale: glamorous.div({
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 100%',
    fontSize: font.down2,
    height: grid,
    justifyContent: 'center',

    '@media (min-width: 600px)': {
      flex: '1 0 auto',
      height: 'auto',
      justifyContent: 'flex-start',
    },

    '& a': {
      color: `rgb(${color.green})`,
      fontWeight: 500,
      textDecoration: 'none',
      width: 'auto',
    },
  }),

  Selections: glamorous.div({
    paddingLeft: grid,
    paddingRight: grid,

    '@media (min-width: 600px)': {
      paddingLeft: '25%',
      paddingRight: 0,
    },
  }),

  Subheading: glamorous.h3({
    fontSize: font.down2,
    letterSpacing: '0.075em',
    marginBottom: 0,
    marginTop: 0.5 * grid,
    textTransform: 'uppercase',
  }),
};
