import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const Waves = ({ waves = 3, width }) => (
  <Styled.Container waves={waves} width={width}>
    <Styled.Inner />
  </Styled.Container>
);

Waves.propTypes = {
  waves: PropTypes.number,
  width: PropTypes.string.isRequired,
};

export default Waves;
