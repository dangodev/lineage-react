import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { grid, layer } from '../lib/theme';

import waves from '../assets/wave.svg';

const Waves = props => <Container waves={props.waves} width={props.width} />;

Waves.defaultProps = {
  waves: 3,
};

Waves.propTypes = {
  waves: PropTypes.number,
  width: PropTypes.string.isRequired,
};

const Container = glamorous.div(
  {
    backgroundImage: `url(${waves})`,
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
    backgroundSize: '34px auto',
    content: '""',
    left: 0,
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

export default Waves;
