import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid } from 'lib/theme';

const textColors = {
  blue: `rgb(${color.black})`,
  blueT: `rgb(${color.black})`,
  red: `rgb(${color.white})`,
  white: `rgb(${color.black})`,
};

const ActionButton = glamorous.button(
  {
    alignItems: 'center',
    appearance: 'none',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: font.din,
    fontWeight: 700,
    justifyContent: 'center',
    minWidth: 6 * grid,
    paddingBottom: 0,
    paddingTop: 0,
    textDecoration: 'none',
    transition: 'background-color 200ms',
    textTransform: 'uppercase',
  },
  props => ({
    backgroundColor: props.disabled ? `rgba(${color.gray}, 0.25)` : `rgb(${color[props.color]})`,
    color: props.disabled ? `rgba(${color.black}, 0.375)` : textColors[props.color],
    fontSize: props.small ? font.down2 : font.down1,
    height: props.small ? grid : 1.5 * grid,
    paddingLeft: props.small ? 0.5 * grid : grid,
    paddingRight: props.small ? 0.5 * grid : grid,
    pointerEvents: props.disabled ? 'none' : 'normal',

    ':hover': {
      backgroundColor: `rgba(${color[props.color]}, 0.6)`,
    },

    '@media (min-width: 600px)': {
      fontSize: props.small ? font.down1 : '1em',
    },
  }),
);

export default {
  ActionButton,
  AnchorButton: ActionButton.withComponent('a'),
  LinkButton: ActionButton.withComponent(Link),
};
