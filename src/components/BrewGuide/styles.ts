import styled from 'react-emotion';
import { color, font, transition } from 'lib/theme';

export const Container = styled.a`
  border-radius: 0.25rem;
  box-shadow: 0.25rem 0.25rem 0.375px rgba(${color.black}, 0.1);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: box-shadow 300ms linear, transform 300ms ${transition.deceleration};

  &:hover {
    transform: translate(-0.25rem, -0.5rem);
    box-shadow: 0.375rem 0.375rem 1rem rgba(${color.black}, 0.05);

    & div div {
      color: rgb(${color.blue});
    }
  }
`;

export const Content = styled.div`
  background-color: rgb(${color.white});
  border-bottom-left-radius: 0.25 rem;
  border-bottom-right-radius: 0.25 rem;
  color: rgb(${color.black});
  flex: 0 1 100%;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  position: relative;
`;

export const Description = styled.p`
  font-size: ${font.down1};
  margin-bottom: 0;
  margin-top: 0;
  padding-right: 2rem;
`;

export const Heading = styled.h3`
  font-family: ${font.kaufmann};
  font-size: ${font.up4};
  margin-bottom: 0;
  margin-top: 0;
  padding-right: 2rem;
`;

export const LinkText = styled.div`
  bottom: 1rem;
  display: block;
  font-size: 1em;
  font-weight: 700;
  position: absolute;
  right: 1rem;
  text-align: right;
  text-transform: uppercase;
  transition: color 200ms;
`;

export const Thumb = styled.div`
  background-color: rgb(203, 221, 233);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
  width: 100%;

  & img: {
    bottom: 0;
    height: auto;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: 100%;
  }
`;

export const Time = styled.small`
  align-items: center;
  display: flex;
  font-size: ${font.down2};
  font-weight: 500;
  height: 0.875rem;
  position: absolute;
  right: 1rem;
  text-transform: uppercase;
  top: 0.75rem;
`;
