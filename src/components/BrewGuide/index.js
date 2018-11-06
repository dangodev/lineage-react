import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const BrewGuide = props => (
  <Styled.Container href={props.link} rel="noopener noreferrer" target="_blank">
    <Styled.Thumb>
      <img src={props.image} alt={props.title} />
    </Styled.Thumb>
    <Styled.Content>
      <Styled.Heading>{props.title}</Styled.Heading>
      <Styled.Description>{props.description}</Styled.Description>
      <Styled.Time>{props.time}</Styled.Time>
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
