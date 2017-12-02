import React from 'react';

import Styled from './styles';

const PrivacyPolicy = props => (
  <Styled.Content dangerouslySetInnerHTML={{ __html: props.privacyPolicy }} />
);

export default PrivacyPolicy;
