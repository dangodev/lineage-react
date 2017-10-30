import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import glamorous from 'glamorous';

import { grid, layer } from '../lib/theme';

import waves from '../assets/wave.svg';

const Waves = props => <Container waves={props.waves} width={props.width}><Inner /></Container>;

Waves.defaultProps = {
  waves: 3,
};

Waves.propTypes = {
  waves: PropTypes.number,
  width: PropTypes.string.isRequired,
};

const Container = glamorous.div(
  {
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: layer.base,
  },
  props => ({
    height: props.waves * 11,
    width: props.width,
  })
);

const Inner = glamorous.div({
  animationDuration: '16s',
  animationName: css.keyframes({
    '50%': { transform: `translateX(${2 * grid}px)` },
  }),
  animationIterationCount: 50,
  animationTimingFunction: 'cubic-bezier(0.5, 0, 0.5, 1)',
  backgroundImage: `url(${waves})`,
  backgroundPosition: '0 0',
  backgroundRepeat: 'repeat',
  backgroundSize: '34px auto',
  height: '100%',
  right: 0,
  position: 'absolute',
  top: 0,
  width: `calc(100% + ${2 * grid}px)`,
})


export default Waves;
