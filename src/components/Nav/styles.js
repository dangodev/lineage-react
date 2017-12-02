import { Link, NavLink } from 'react-router-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';

import { color, font, grid, layer, transition } from 'lib/theme';
import speckle from 'assets/speckle.png';

const breakpoint = {
  sm: '580px',
};

const StyledLink = glamorous(NavLink)(
  {
    alignItems: 'center',
    color: `rgb(${color.black})`,
    display: 'flex',
    fontSize: font.up4,
    fontWeight: 500,
    paddingBottom: '1em',
    paddingTop: '1em',
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: `transform 200ms ${transition.standard}`,

    [`@media (min-width: ${breakpoint.sm})`]: {
      fontSize: font.down1,
      opacity: 1,
      transform: 'none',
      transition: 'none',

      ' & + *': {
        marginLeft: 0.75 * grid,
      },

      '&::after': {
        backgroundColor: `rgb(${color.blue})`,
        borderRadius: '50%',
        bottom: 0,
        content: '""',
        height: 6,
        left: '50%',
        opacity: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transform: 'translate(-50%, 100%)',
        transition: 'opacity 200ms',
        width: 6,
      },
    },

    '.active': {
      '&::after': {
        opacity: 1,
        transform: 'translate(-50%, 0)',
      },
    },
  },
  ({ isOpen, delay }) => ({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : `translateY(${0.5 * grid}px)`,
    transition: `opacity 200ms ${delay}ms, transform 200ms ${transition.standard} ${delay}ms`,
  }),
);

export default {
  CartLink: glamorous(Link)(
    {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      fontSize: font.up1,
      fontWeight: 700,
      height: 2 * grid,
      justifyContent: 'center',
      position: 'fixed',
      right: 0,
      textDecoration: 'none',
      top: 0,
      transition: 'background-color 200ms, color 200ms',
      width: 2 * grid,
      zIndex: layer.cart,

      '& span': {
        alignItems: 'center',
        display: 'flex',
        fontSize: font.down4,
        fontWeight: 500,
        height: 0.75 * grid,
        justifyContent: 'center',
        left: 0,
        letterSpacing: '0.05em',
        position: 'absolute',
        textTransform: 'uppercase',
        top: 0.125 * grid,
        width: '100%',
      },

      ':hover': {
        backgroundColor: `rgb(${color.blueT})`,
        color: `rgb(${color.black})`,
      },
    },
    props => ({
      backgroundColor: props.empty ? `rgba(${color.offwhite}, 0.9)` : `rgb(${color.black})`,
      color: `rgb(${props.empty ? color.gray : color.white})`,
    }),
  ),

  Container: glamorous.div({
    alignItems: 'center',
    backgroundColor: `rgb(${color.white})`,
    backgroundImage: `url(${speckle})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '400px auto',
    display: 'flex',
    height: 2 * grid,
    left: 0,
    lineHeight: 1,
    paddingLeft: 0,
    paddingRight: 2.5 * grid,
    position: 'absolute',
    top: 0,
    width: '100%',

    [`@media (min-width: ${breakpoint.sm})`]: {
      paddingLeft: 0.5 * grid,
      justifyContent: 'flex-start',
    },
  }),

  Link: StyledLink,

  LinkList: glamorous.nav(
    {
      alignItems: 'center',
      backgroundColor: `rgba(${color.pink}, 0.95)`,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: layer.nav,

      [`@media (min-width: ${breakpoint.sm})`]: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        opacity: 1,
        position: 'static',
        visibility: 'visible',
        zIndex: 1,
      },
    },
    ({ isOpen }) => ({
      opacity: isOpen ? 1 : 0,
      transition: isOpen ? 'opacity 200ms' : 'opacity 200ms, visibility 0ms 200ms',
      visibility: isOpen ? 'visible' : 'hidden',
    }),
  ),

  Logo: glamorous.div({
    marginLeft: 'auto',
    marginRight: 'auto',

    [`@media (min-width: ${breakpoint.sm})`]: {
      marginLeft: 0,
      paddingRight: 0,
    },

    '& img': {
      height: grid * 0.75,
      width: 'auto',

      [`@media (min-width: ${breakpoint.sm})`]: {
        height: grid * 0.875,
      },
    },
  }),

  MobileClose: glamorous.button({
    alignItems: 'center',
    appearance: 'button',
    background: 'none',
    border: 0,
    display: 'flex',
    height: 2 * grid,
    justifyContent: 'center',
    left: 0,
    outline: 'none',
    padding: 0,
    position: 'absolute',
    top: 0,
    width: 2 * grid,

    [`@media (min-width: ${breakpoint.sm})`]: {
      display: 'none',
    },

    '&::before, &::after': {
      backgroundColor: `rgb(${color.black})`,
      content: '""',
      height: 2,
      left: '50%',
      position: 'absolute',
      top: '50%',
      width: 0.875 * grid,
    },

    '::before': {
      transform: 'translate(-50%, -50%) rotate(-45deg)',
    },

    '::after': {
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
  }),

  MobileLink: glamorous(StyledLink)({
    display: 'block',

    [`@media (min-width: ${breakpoint.sm})`]: {
      display: 'none',
    },
  }),

  MobileOpen: glamorous.button(
    {
      alignItems: 'center',
      appearance: 'button',
      background: 'none',
      border: 0,
      display: 'flex',
      height: 2 * grid,
      justifyContent: 'center',
      outline: 'none',
      padding: 0,
      transition: 'opacity 200ms',
      width: 2 * grid,

      [`@media (min-width: ${breakpoint.sm})`]: {
        display: 'none',
      },

      '& img': {
        display: 'block',
        height: 0.875 * grid,
        width: 0.875 * grid,
      },
    },

    ({ isOpen }) => ({
      opacity: isOpen ? 0 : 1,
    }),
  ),

  state: {
    isScrollLocked: css({
      overflow: 'hidden',

      '@media (min-width: 600px)': {
        overflow: 'auto',
      },
    }),
  },
};
