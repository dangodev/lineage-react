import styled from '@emotion/styled';
import { ifProp } from 'styled-tools';
import { color, font } from 'lib/theme';

// duped from index to prevent circular deps
interface TimelineEventProps {
  event?: string;
  inBetween?: boolean;
  month?: string;
  year?: number | string;
}

export const Container = styled.div<TimelineEventProps>`
  align-items: center;
  margin-top: ${ifProp({ inBetween: true }, 0, '2rem')};
  display: flex;
  position: relative;

  &::before {
    background-repeat: repeat;
    content: '';
    height: 100%;
    left: 1.5rem;
    position: absolute;
    transform: translateX(-50%);
    background-image: ${ifProp(
      { inBetween: true },
      `repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(${color.black}, 0.5) 4px, rgba(${color.black}, 0.5) 8px)`,
      `linear-gradient(rgb(${color.black}), rgb(${color.black}) 8px, transparent 8px, transparent 16px)`
    )};
    background-size: ${ifProp({ inBetween: true }, 'auto', '16px 16px')};
    bottom: ${ifProp({ inBetween: true }, 0, '100%')};
    width: ${ifProp({ inBetween: true }, '0.75rem', '1px')};

    @media (min-width: 600px) {
      left: 2rem;
    }
  }

  & + * {
    margin-top: ${ifProp({ inBetween: true }, 0, '2rem')};

    &::before {
      display: ${ifProp({ inBetween: true }, 'none', 'block')};
    }
  }
`;

export const Date = styled.div`
  align-items: center;
  background-color: rgb(${color.offwhite});
  border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px rgb(${color.black});
  display: flex;
  font-size: 14px;
  flex-direction: column;
  height: 3rem;
  justify-content: center;
  line-height: 1;
  min-width: 3rem;
  position: relative;
  text-transform: uppercase;
  z-index: 5;

  @media (min-width: 600px) {
    font-size: 1em;
    height: 4rem;
    min-width: 4rem;
  }
`;

export const Details = styled.div<TimelineEventProps>`
  font-size: ${ifProp({ inBetween: true }, font.down2, font.down1)};
  letter-spacing: ${ifProp({ inBetween: true }, '0.1em', 0)};
  padding-bottom: ${ifProp({ inBetween: true }, '2rem', 0)};
  padding-left: ${ifProp({ inBetween: true }, '5rem', '2rem')};
  padding-top: ${ifProp({ inBetween: true }, '2rem', 0)};
  text-transform: ${ifProp({ inBetween: true }, 'uppercase', 'none')};
  flex: 0 1 100%;
  line-height: 1.8;
  position: relative;

  &::before {
    background-color: rgb(${color.black});
    content: '';
    display: ${ifProp({ inBetween: true }, 'none', 'block')};
    height: 1;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    width: 1rem;
  }

  @media (min-width: 600px) {
    padding-left: ${ifProp({ inBetween: true }, '6rem', '2rem')};
  }
`;

export const Month = styled.div`
  font-size: ${font.down1};
  font-weight: 700;
  margin-top: 0.25em;
`;

export const Year = styled.div`
  font-size: ${font.up1};
  font-weight: 500;
`;
