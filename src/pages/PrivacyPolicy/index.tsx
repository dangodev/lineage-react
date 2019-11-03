import React from 'react';

import * as Styled from './styles';

interface PrivacyPolicyProps {
  privacyPolicy: string;
}

const PrivacyPolicy: React.FunctionComponent<PrivacyPolicyProps> = ({ privacyPolicy }) => (
  <Styled.Content dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
);

export default PrivacyPolicy;
