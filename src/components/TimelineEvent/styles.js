import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

export default {
  Container: glamorous.div(
    {
      alignItems: 'center',
      display: 'flex',
      position: 'relative',

      '::before': {
        backgroundRepeat: 'repeat',
        content: '""',
        height: '100%',
        left: 0.75 * grid,
        position: 'absolute',
        transform: 'translateX(-50%)',

        '@media (min-width: 600px)': {
          left: grid,
        },
      },
    },
    props => ({
      marginTop: props.inBetween ? 0 : grid,

      '& + *': {
        marginTop: props.inBetween ? 0 : grid,

        '::before': {
          display: props.inBetween ? 'none' : 'block',
        },
      },

      '::before': {
        backgroundImage: props.inBetween
          ? `repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(${color.black}, 0.5) 4px, rgba(${color.black}, 0.5) 8px)`
          : `linear-gradient(rgb(${color.black}), rgb(${color.black}) 8px, transparent 8px, transparent 16px)`,
        backgroundSize: props.inBetween ? 'auto' : '16px 16px',
        bottom: props.inBetween ? 0 : '100%',
        width: props.inBetween ? 0.375 * grid : 1,
      },
    }),
  ),

  Date: glamorous.div({
    alignItems: 'center',
    backgroundColor: `rgb(${color.offwhite})`,
    borderRadius: '50%',
    boxShadow: `inset 0 0 0 1.5px rgb(${color.black})`,
    display: 'flex',
    fontSize: '14px',
    flexDirection: 'column',
    height: 1.5 * grid,
    justifyContent: 'center',
    lineHeight: 1,
    minWidth: 1.5 * grid,
    position: 'relative',
    textTransform: 'uppercase',
    zIndex: 5,

    '@media (min-width: 600px)': {
      fontSize: '1em',
      height: 2 * grid,
      minWidth: 2 * grid,
    },
  }),

  Details: glamorous.div(
    {
      flex: '0 1 100%',
      lineHeight: 1.8,
      position: 'relative',

      '::before': {
        backgroundColor: `rgb(${color.black})`,
        content: '""',
        height: 1,
        left: 0,
        position: 'absolute',
        top: '50%',
        translate: 'transformY(-100%)',
        width: 0.5 * grid,
      },
    },
    props => ({
      fontSize: props.inBetween ? font.down2 : font.down1,
      letterSpacing: props.inBetween ? '0.1em' : 0,
      paddingBottom: props.inBetween ? grid : 0,
      paddingLeft: props.inBetween ? 2.5 * grid : grid,
      paddingTop: props.inBetween ? grid : 0,
      textTransform: props.inBetween ? 'uppercase' : 'none',

      '::before': {
        display: props.inBetween ? 'none' : 'block',
      },

      '@media (min-width: 600px)': {
        paddingLeft: props.inBetween ? 3 * grid : grid,
      },
    }),
  ),

  Month: glamorous.div({
    fontSize: font.down1,
    fontWeight: '700',
    marginTop: '0.25em',
  }),

  Year: glamorous.div({
    fontSize: font.up1,
    fontWeight: 500,
  }),
};
