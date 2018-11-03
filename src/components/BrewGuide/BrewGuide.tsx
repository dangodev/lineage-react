import * as React from 'react';
import * as Styled from './styles';

const BrewGuide = (props: {
  description: string;
  link: string;
  image: string;
  time: string;
  title: string;
}) => {
  const { description, link, image, time, title } = props;

  return (
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
};

export default BrewGuide;
