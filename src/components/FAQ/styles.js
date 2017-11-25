import glamorous from 'glamorous';

import { color, font, grid, transition } from 'lib/theme';

export default {
  Answer: glamorous.div(
    {
      overflow: 'hidden',

      '@media (min-width: 600px)': {
        paddingLeft: '37.5%',
      },

      '& p': {
        marginBottom: 0,
        marginTop: 0,
        maxWidth: '20em',

        '& + p': {
          marginTop: grid,
        },
      },
    },
    props => ({
      height: props.isMeasuring ? 'auto' : (props.isOpen ? props.fullHeight : 0),
      transition: props.isMeasuring ? 'none' : `height 200ms ${transition.standard}`,
    })
  ),

  AnswerInner: glamorous.div({
    paddingBottom: grid,
    paddingTop: 0.5 * grid,
  }),

  Container: glamorous.div({
  }),

  Trigger: glamorous.button(
    {
      appearance: 'none',
      background: 'none',
      border: 'none',
      boxShadow: `0 1px rgba(${color.black}, 0.5)`,
      cursor: 'pointer',
      display: 'block',
      fontFamily: font.din,
      fontSize: '1em',
      fontWeight: 500,
      outline: 'none',
      paddingBottom: 0.25 * grid,
      paddingLeft: 0,
      paddingRight: 1.5 * grid,
      paddingTop: 0.25 * grid,
      position: 'relative',
      textAlign: 'left',
      textTransform: 'uppercase',
      transition: 'background-color 200ms',
      width: '100%',

      '::after': {
        boxShadow: `2px 2px rgb(${color.black})`,
        content: '""',
        height: 0.25 * grid,
        position: 'absolute',
        right: 0.25 * grid,
        top: '50%',
        transition: `transform 200ms ${transition.standard}`,
        width: 0.25 * grid,
      },

      ':hover': {
        backgroundColor: `rgba(${color.black}, 0.05)`,
      },
    },
    props => ({
      '::after': {
        transform: props.isOpen ? 'rotate(-135deg)' : 'translateY(-75%) rotate(45deg)',
      },
    }),
  ),
};
