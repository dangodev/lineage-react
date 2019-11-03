import styled from 'react-emotion';
import { font } from '../../lib/theme';

export const Container = styled.div`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  background-image: url('${props => props.backgroundImage}');
  background-position: ${props => props.backgroundPosition};
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 56.25vw;
  min-height: 37.5vh;
  padding-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 4rem;

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
  margin-bottom: 4rem;
  margin-top: 0;
  text-align: center;
  text-transform: uppercase;
`;
