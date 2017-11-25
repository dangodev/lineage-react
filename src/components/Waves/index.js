import React from 'react';
import PropTypes from 'prop-types';

import Styled from './styles';

const Waves = props => (
  <Styled.Container waves={props.waves} width={props.width}>
    <Styled.Inner />
  </Styled.Container>
);

Waves.defaultProps = {
  waves: 3,
};

Waves.propTypes = {
  waves: PropTypes.number,
  width: PropTypes.string.isRequired,
};

export default Waves;
