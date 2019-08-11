import React from 'react';

import * as Styled from './styles';

interface WavesProps {
  waves?: number;
  width: string;
}

const Waves: React.FunctionComponent<WavesProps> = ({ waves = 3, width }) => (
  <Styled.Container waves={waves} width={width}>
    <Styled.Inner />
  </Styled.Container>
);

export default Waves;
