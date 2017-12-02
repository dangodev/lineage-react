import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

import speckle from 'assets/speckle.png';

export default {
  Container: glamorous.div({
    display: 'flex',
    position: 'relative',

    '& + *': {
      marginTop: grid,
    },
  }),

  Description: glamorous.div({
    display: 'block',
    fontSize: font.down2,
    fontWeight: 400,
    marginTop: 0.25 * grid,
  }),

  Heading: glamorous.h3({
    fontSize: '1em',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 0,
    marginTop: 0,
    textTransform: 'uppercase',
  }),

  Notes: glamorous.div({
    lineHeight: 1.5,
    textTransform: 'capitalize',
  }),

  Price: glamorous.div({
    fontFamily: font.kaufmann,
    fontSize: font.up1,
    marginTop: 0.25 * grid,
  }),

  ProductInfo: glamorous.div({
    flexGrow: 1,
    paddingLeft: 0.625 * grid,
    paddingRight: 0.625 * grid,
    width: `calc(100% - ${4 * grid})`,
  }),

  ProductType: glamorous.div({
    fontSize: font.down1,
  }),


  Quantity: glamorous.input({
    border: 'none',
    borderRadius: '50%',
    boxShadow: `0 0 0 2px rgb(${color.blue})`,
    cursor: 'pointer',
    fontSize: font.up3,
    fontWeight: 500,
    height: grid,
    letterSpacing: 0,
    marginBottom: 0.25 * grid,
    outline: 'none',
    padding: 0,
    textAlign: 'center',
    transition: 'background-color 200ms',
    width: grid,
    WebkitAppearance: 'none',
    MozAppearance: 'textfield',

    ':hover': {
      backgroundColor: `rgba(${color.blue}, 0.2)`,
    },

    '::-webkit-inner-spin-button, ::-webkit-inner-spin-button': {
      appearance: 'none',
    },
  }),

  QuantityLabel: glamorous.div({
    alignItems: 'center',
    color: `rgb(${color.black})`,
    display: 'flex',
    flexDirection: 'column',
    fontSize: font.down3,
    letterSpacing: '0.1em',
    paddingRight: grid,
    paddingTop: 0.5 * grid,
    textTransform: 'uppercase',
    width: 2 * grid,
  }),

  Remove: glamorous.button({
    appearance: 'none',
    background: 'none',
    border: 'none',
    color: `rgb(${color.red})`,
    cursor: 'pointer',
    fontSize: font.down2,
    fontWeight: 400,
    marginTop: 0.25 * grid,
    outline: 'none',
    padding: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
  }),

  Thumb: glamorous.img({
    borderRadius: 0.25 * grid,
    boxShadow: `${0.25 * grid}px ${0.25 * grid}px ${grid}px rgba(${color.black}, 0.1)`,
    display: 'block',
    height: 'auto',
    overflow: 'hidden',
    transform: `translate(-${0.75 * grid}px, -${0.625 * grid}px)`,
    width: 2 * grid,
  }),

  ThumbContainer: glamorous.div(
    {
      backgroundImage: `url(${speckle})`,
      backgroundSize: '400px auto',
      padding: 0.25 * grid,
      width: 2 * grid,
    },
    props => ({
      backgroundColor: `rgb(${color[props.color] ? color[props.color] : color.pink})`,
    }),
  ),
};
