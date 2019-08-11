import styled from '@emotion/styled';
import { color, font } from 'lib/theme';

const bgPositions = {
  coffee: 'center top',
  gear: 'center 75%',
};

export const Description = styled.p`
  line-height: 1.5;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  max-width: 40em;
  text-align: center;
`;

export const Heading = styled.h1`
  font-family: ${font.kaufmann};
  font-size: ${font.up8};
  margin-bottom: 0;
  margin-top: 0;
  text-align: center;
`;

export const Inner = styled.div`
  align-items: center;
  background-color: rgb(${color.cadet});
  background-size: cover;
  background-image: url('${({ imgSm }) => imgSm}');
  background-position: ${({ handle }) => (handle ? bgPositions[handle] : 'center center')};
  display: flex;
  flex-direction: column;
  height: 75vh;
  max-height: 30em;
  min-height: 20em;
  position: relative;
  padding-top: 4rem;

  &::after {
    background-image: linear-gradient(rgba(${color.offwhite}, 0), rgba(${color.offwhite}, 1));
    bottom: 0;
    content: "";
    height: 6rem;
    left: 0;
    position: absolute;
    right: 0;
  }

  @media (min-width: 1281px) {
    background-image: url('${({ imgLg }) => imgLg}');
  }

  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-width: 641px) {
    background-image: url('${({ imgLg }) => imgLg}');
  }
  `;
