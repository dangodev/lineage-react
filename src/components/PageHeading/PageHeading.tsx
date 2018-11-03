import * as React from 'react';
import * as Styled from './styles';

const PageHeader = (props: {
  backgroundColor?: string;
  backgroundPosition?: string;
  backgroundImage?: string;
}) => {
  const {
    backgroundColor = 'rgb(212, 224, 236)',
    backgroundPosition = 'center center',
    backgroundImage = '',
  } = props;

  return (
    <Styled.Container
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      backgroundPosition={backgroundPosition}
    />
  );
};

export default PageHeader;
