import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const PageHeader = ({ backgroundColor, backgroundImage, backgroundPosition }) => (
  <Styled.Container
    backgroundColor={backgroundColor}
    backgroundImage={backgroundImage}
    backgroundPosition={backgroundPosition}
  />
);

PageHeader.defaultProps = {
  backgroundColor: 'rgb(212, 224, 236)',
  backgroundPosition: 'center center',
  backgroundImage: '',
};

PageHeader.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundPosition: PropTypes.string,
  backgroundImage: PropTypes.string,
};

export default PageHeader;
