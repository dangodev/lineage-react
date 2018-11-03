import * as React from 'react';
import * as Styled from './styles';

const PrivacyPolicy = (props: { privacyPolicy: string }) => {
  const { privacyPolicy } = props;

  return <Styled.Content dangerouslySetInnerHTML={{ __html: privacyPolicy }} />;
};

export default PrivacyPolicy;
