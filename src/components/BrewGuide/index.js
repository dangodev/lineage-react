import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const BrewGuide = ({ description, image, link, time, title }) => (
  <Styled.Container href={link} rel="noopener noreferrer" target="_blank">
    <Styled.Thumb>
      <img src={image} alt={title} />
    </Styled.Thumb>
    <Styled.Content>
      <Styled.Heading>{title}</Styled.Heading>
      <Styled.Description>{description}</Styled.Description>
      <Styled.Time>{time}</Styled.Time>
      <Styled.LinkText>View</Styled.LinkText>
    </Styled.Content>
  </Styled.Container>
);

BrewGuide.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BrewGuide;
