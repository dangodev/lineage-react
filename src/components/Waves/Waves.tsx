import * as React from 'react';
import * as Styled from './styles';

const Waves = (props: { waves: number; width: string }) => {
  const { waves = 3, width } = props;

  return (
    <Styled.Container waves={waves} width={width}>
      <Styled.Inner />
    </Styled.Container>
  );
};

export default Waves;
