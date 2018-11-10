import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const PrivacyPolicy = props => (
  <Styled.Content dangerouslySetInnerHTML={{ __html: props.privacyPolicy }} />
);

PrivacyPolicy.propTypes = {
  privacyPolicy: PropTypes.string,
};

export default PrivacyPolicy;
