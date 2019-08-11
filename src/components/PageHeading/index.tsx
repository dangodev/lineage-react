import React from 'react';

import * as Styled from './styles';

interface PageHeaderProps {
  backgroundColor?: string;
  backgroundPosition?: string;
  backgroundImage?: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  backgroundColor = '',
  backgroundImage = '',
  backgroundPosition = 'center center',
}) => (
  <Styled.Container
    backgroundColor={backgroundColor}
    backgroundImage={backgroundImage}
    backgroundPosition={backgroundPosition}
  />
);

export default PageHeader;
