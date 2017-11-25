import { css } from 'glamor';
import glamorous from 'glamorous';

import { color, font, grid, layer, transition } from 'lib/theme';

export default {
  Actions: glamorous.menu({
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: grid,
    paddingLeft: 0,
    paddingRight: grid,
  }),

  Close: glamorous.a({
    alignItems: 'center',
    color: `rgb(${color.black})`,
    display: 'grid',
    fontSize: 24,
    fontWeight: 500,
    height: 1.5 * grid,
    justifyContent: 'center',
    lineHeight: 1,
    position: 'absolute',
    right: 0,
    textDecoration: 'none',
    top: 0,
    width: 1.5 * grid,
  }),

  Count: glamorous.div(
    {
      alignItems: 'center',
      borderRadius: '50%',
      display: 'flex',
      fontSize: font.down2,
      height: 0.625 * grid,
      justifyContent: 'center',
      lineHeight: 1,
      marginLeft: 0.125 * grid,
      width: 0.625 * grid,
    },
    ({ empty = true }) => ({
      backgroundColor: empty ? `rgba(${color.black}, 0.1)` : `rgb(${color.red})`,
      color: empty ? `rgb(${color.black}, 0.4)` : `rgb(${color.white})`,
    }),
  ),

  Heading: glamorous.h1({
    alignItems: 'center',
    display: 'flex',
    fontSize: font.down1,
    fontWeight: 700,
    height: 1.5 * grid,
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
    textTransform: 'uppercase',
  }),

  Inner: glamorous.div(
    {
      backgroundImage: `linear-gradient(90deg, rgba(${color.white}, 0) ${grid}px, rgb(${color.white}) ${grid}px)`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: '100% 100%',
      bottom: 0,
      maxWidth: '30em',
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch',
      paddingBottom: grid,
      paddingLeft: grid,
      position: 'fixed',
      right: 0,
      top: 0,
      transform: 'translateX(100%, 0)',
      width: '100%',
      zIndex: layer.cart + 1,

      '@media (min-width: 600px)': {
        width: '50vw',
      },
    },
    props => ({
      transform: props.isShowing ? 'translateX(0)' : 'translateX(100%)',
      transition: props.isShowing ? `transform 200ms ${transition.standard}` : `transform 200ms ${transition.standard}, visibility 0ms 200ms`,
      visibility: props.isShowing ? 'visible' : 'hidden',
    }),
  ),

  Overlay: glamorous.div(
    {
      backgroundColor: `rgb(${color.pink})`,
      bottom: 0,
      cursor: 'pointer',
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: layer.cart,
    },
    props => ({
      opacity: props.isShowing ? 0.8 : 0,
      visibility: props.isShowing ? 'visible' : 'hidden',
      transition: props.isShowing ? 'opacity 200ms' :'opacity 200ms, visibility 0ms 200ms',
    }),
  ),

  ShopButton: glamorous.a({
    color: `rgb(${color.green})`,
    display: 'block',
    fontSize: font.down2,
    fontWeight: 700,
    marginTop: 0.5 * grid,
    textDecoration: 'none',
    textAlign: 'center',
  }),

  WaveContainer: glamorous.div({
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    width: '100%',
  }),

  state: {
    isScrollLocked: css({
      overflow: 'hidden',
    }),
  },
};
