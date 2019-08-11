import * as React from 'react';

import * as Styled from './styles';

interface LoadingProps {
  isLoading?: boolean;
}

const Loading: React.FunctionComponent<LoadingProps> = ({ isLoading = false }) => (
  <Styled.Container isLoading={isLoading} />
);

export default Loading;
