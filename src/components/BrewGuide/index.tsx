import React from 'react';

import * as Styled from './styles';

interface BrewGuideProps {
  description: string;
  image: string;
  link: string;
  time: string;
  title: string;
}

const BrewGuide: React.FunctionComponent<BrewGuideProps> = ({
  description,
  image,
  link,
  time,
  title,
}) => (
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

export default BrewGuide;
