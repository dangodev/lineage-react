import React from 'react';
import PropTypes from 'prop-types';

import Styled from './styles';

const PageHeader = props => (
  <Styled.Container
    backgroundColor={props.backgroundColor}
    backgroundImage={props.backgroundImage}
    backgroundPosition={props.backgroundPosition}
  />
);

PageHeader.defaultProps = {
  backgroundColor: 'rgb(212, 224, 236)',
  backgroundPosition: 'center center',
  backgroundImage: '',
  heading: '',
  subheading: '',
};

PageHeader.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundPosition: PropTypes.string,
  backgroundImage: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default PageHeader;
