import styled from 'react-emotion';
import { font } from 'lib/theme';

interface ContainerProps {
  backgroundColor: string;
  backgroundImage: string;
  backgroundPosition: string;
}

export const Container = styled.div`
  align-items: center;
  background-color: ${(props: ContainerProps) => props.backgroundColor};
  background-image: url('${(props: ContainerProps) => props.backgroundImage}');
  background-position: ${(props: ContainerProps) => props.backgroundPosition};
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 56.25vw;
  min-height: 37.5vh;
  padding-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;

  @media (min-width: 600px) {
    min-height: 62.5vh;
  }
`;

export const Heading = styled.h1`
  font-family: ${font.kaufmann};
  font-size: ${font.up8};
  margin-bottom: 0;
  margin-top: 0;
`;

export const Subheading = styled.h3`
  font-size: ${font.up1};
  font-weight: 500;
  margin-bottom: 2rem;
  margin-top: 0;
  text-align: center;
  text-transform: uppercase;
`;
