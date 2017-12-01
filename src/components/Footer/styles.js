import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { color, font, grid } from 'lib/theme';

export default {
  Container: glamorous.div({
    backgroundColor: `rgb(${color.white})`,
    paddingBottom: 2 * grid,
    paddingTop: 2 * grid,
  }),

  Nav: glamorous.nav({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 0.5 * grid,
    paddingRight: 0.5 * grid,

    '@media (min-width: 780px)': {
      flexDirection: 'row',
      paddingLeft: grid,
      paddingRight: grid,
    },
  }),

  Colophon: glamorous.div({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  }),

  StyledLink: glamorous(Link)({
    color: `rgb(${color.black})`,
    display: 'block',
    fontFamily: font.din,
    fontSize: font.down1,
    fontWeight: 500,
    marginLeft: 0.25 * grid,
    marginRight: 0.25 * grid,
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'color 200ms',

    ':hover': {
      color: `rgb(${color.blue})`,
    },
  }),

  MainNav: glamorous.div({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    lineHeight: 2,
    marginLeft: 0,
    padding: 0,

    '@media (min-width: 780px)': {
      lineHeight: 1,
      marginLeft: 'auto',
      paddingLeft: 4 * grid,
    },
  }),

  SocialNav: glamorous.div({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 0,
    marginTop: grid,

    '@media (min-width: 780px)': {
      justifyContent: 'flex-end',
      marginLeft: 'auto',
      marginTop: 0,
      width: 4 * grid,
    },

    '& a': {
      color: `rgb(${color.black})`,
      display: 'block',
      transition: 'color 200ms',

      ':hover': {
        color: `rgb(${color.blue})`,
      },

      '& + a': {
        marginLeft: 0.25 * grid,
      },
    },

    '& svg': {
      fill: 'currentColor',
      height: 0.625 * grid,
      width: 0.625 * grid,
    },
  }),

  Logo: glamorous.img({
    display: 'block',
    height: 2 * grid,
    marginTop: grid,
    width: 'auto',
  }),

  Contact: glamorous.a({
    color: `rgb(${color.blue})`,
    display: 'block',
    fontSize: font.down2,
    marginTop: 0.5 * grid,
  }),

  Copyright: glamorous.aside({
    display: 'block',
    fontSize: font.down3,
    marginTop: 0.5 * grid,
    paddingLeft: grid,
    paddingRight: grid,

    ' & a': {
      color: `rgb(${color.blue})`,
    },
  }),
};
