import React from 'react';
import PropTypes from 'prop-types';

import Styled from './styles';

const PageHeader = props => (
  <Styled.Container
    backgroundColor={props.backgroundColor}
    backgroundImage={props.backgroundImage}
  >
    <Styled.Heading>{props.heading}</Styled.Heading>
    <Styled.Subheading>{props.subheading}</Styled.Subheading>
  </Styled.Container>
);

PageHeader.defaultProps = {
  backgroundColor: 'rgb(212, 224, 236)',
  backgroundImage: '',
  heading: '',
  subheading: '',
};

PageHeader.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default PageHeader;
