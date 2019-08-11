import { NavLink } from 'react-router-dom';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ifProp } from 'styled-tools';
import { color, font, layer, transition } from 'lib/theme';
import speckle from 'assets/speckle.png';

const breakpoint = {
  sm: '580px',
};

export const Link = styled(NavLink)`
  align-items: center;
  color: rgb(${color.black});
  display: flex;
  font-size: ${font.up4};
  font-weight: 500;
  padding-bottom: 1em;
  padding-top: 1em;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  transition: transform 200ms ${transition.standard};
  opacity: ${ifProp({ isOpen: true }, 1, 0)};
  transform: translateY(${ifProp({ isOpen: true }, 0, '1rem')});
  transition: opacity 200ms, transform 200ms ${transition.standard};

  @media (min-width: ${breakpoint.sm}) {
    font-size: ${font.down1};
    opacity: 1;
    transform: none;
    transition: none;

    & + * {
      margin-left: 1.5rem;
    }

    &::after {
      background-color: rgb(${color.blue});
      border-radius: 50%;
      bottom: 0;
      content: '';
      height: 0.375rem;
      left: 50%;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transform: translate(-50%, 100%);
      transition: opacity 200ms;
      width: 0.375rem;
    }
  }

  &.active::after {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const CartLink = styled(NavLink)`
  align-items: center;
  background-color: ${ifProp(
    { empty: true },
    `rgba(${color.offwhite}, 0.9)`,
    `rgb(${color.black})`
  )};
  color: rgb(${ifProp({ empty: true }, color.gray, color.white)});
  display: flex;
  flex-direction: column;
  font-size: ${font.up1};
  font-weight: 700;
  height: 4rem;
  justify-content: center;
  position: fixed;
  right: 0;
  text-decoration: none;
  top: 0;
  transition: background-color 200ms, color 200ms;
  width: 4rem;
  z-index: ${layer.cart};

  & span {
    align-items: center;
    display: flex;
    font-size: ${font.down4};
    font-weight: 500;
    height: 1.5rem;
    justify-content: center;
    left: 0;
    letter-spacing: 0.05em;
    position: absolute;
    text-transform: uppercase;
    top: 0.25rem;
    width: 100%;
  }

  &:hover {
    background-color: rgb(${color.blueT});
    color: rgb(${color.black});
  }
`;

export const Container = styled.div`
  align-items: center;
  background-color: rgb(${color.white});
  background-image: url(${speckle});
  background-repeat: repeat;
  background-size: 400px auto;
  display: flex;
  height: 4rem;
  left: 0;
  line-height: 1;
  padding-left: 0;
  padding-right: 5rem;
  position: absolute;
  top: 0;
  width: 100%;

  @media (min-width: ${breakpoint.sm}) {
    padding-left: 1rem;
    justify-content: flex-start;
  }
`;

export const LinkList = styled.nav`
  align-items: center;
  background-color: rgba(${color.pink}, 0.95);
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  opacity: ${ifProp({ isOpen: true }, 1, 0)};
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 200ms ${ifProp({ isOpen: true }, '', ', visibility 0ms 200ms')};
  visibility: ${ifProp({ isOpen: true }, 'visible', 'hidden')};
  z-index: ${layer.nav};

  @media (min-width: ${breakpoint.sm}) {
    background-color: transparent;
    flex-direction: row;
    opacity: 1;
    position: static;
    visibility: visible;
    z-index: 1;
  }
`;

export const Logo = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpoint.sm}) {
    margin-left: 0;
    padding-right: 0;
  }

  & img {
    height: 1.5rem;
    width: auto;

    @media (min-width: ${breakpoint.sm}) {
      height: 1.75rem;
    }
  }
`;

export const MobileClose = styled.button`
  align-items: center;
  appearance: button;
  background: none;
  border: 0;
  display: flex;
  height: 4rem;
  justify-content: center;
  left: 0;
  outline: none;
  padding: 0;
  position: absolute;
  top: 0;
  width: 4rem;

  @media (min-width: ${breakpoint.sm}) {
    display: none;
  }

  &::before,
  &::after {
    background-color: rgb(${color.black});
    content: '';
    height: 2px;
    left: 50%;
    position: absolute;
    top: 50%;
    width: 0.875rem;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

export const MobileLink = styled(Link)`
  display: block;

  @media (min-width: ${breakpoint.sm}) {
    display: none;
  }
`;

export const MobileOpen = styled.button`
  align-items: center;
  appearance: button;
  background: none;
  border: 0;
  display: flex;
  height: 4rem;
  justify-content: center;
  outline: none;
  opacity: ${ifProp({ isOpen: true }, 0, 1)};
  padding: 0;
  transition: opacity 200ms;
  width: 4rem;

  @media (min-width: ${breakpoint.sm}) {
    display: none;
  }

  & img {
    display: block;
    height: 1.75rem;
    width: 1.75rem;
  }
`;

export const state = {
  isScrollLocked: css`
    overflow: hidden;

    @media (min-width: 600px) {
      overflow: auto;
    }
  `,
};
