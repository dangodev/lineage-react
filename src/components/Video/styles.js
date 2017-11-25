import { css } from 'glamor';
import glamorous from 'glamorous';

import { color, grid, layer, transition } from 'lib/theme';

const animation = {
  fadeIn: css.keyframes({
    to: {
      transform: 'translate(-50%, -50%)',
      opacity: 1,
    },
  }),
};

export default {
  Container: glamorous.div({
    backgroundColor: `rgb(${color.pink})`,
    height: '56vw',
    overflow: 'hidden',
    position: 'relative',
  }),

  Pink: glamorous.div({
    backgroundColor: `rgb(${color.pink})`,
    height: '100%',
    left: 0,
    mixBlendMode: 'multiply',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: layer.base,
  }),

  Pink2: glamorous.div({
    backgroundImage: `linear-gradient(rgba(${color.pink}, 0), rgba(${color.pink}, 1))`,
    backgroundSize: '100% 100%',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: layer.base,
  }),


  BigLogo: glamorous.img({
    animationDelay: '1s',
    animationDuration: '2s',
    animationFillMode: 'forwards',
    animationName: animation.fadeIn,
    animationTimingFunction: transition.deceleration,
    height: 8 * grid,
    left: '50%',
    position: 'absolute',
    top: '50%',
    opacity: 0,
    transform: 'translate(-50%, -25%)',
    width: 5 * grid,
    zIndex: layer.base + 1,

    '@media (min-width: 600px)': {
      width: 8 * grid,
    },
  }),

  Stretch: glamorous.div({
    left: '50%',
    paddingTop: '56.25%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',

    '& video': {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 1,
    },
  }),
};
