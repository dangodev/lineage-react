import React from 'react';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid, transition } from '../lib/theme';

import logo from '../assets/lineage.svg';
import speckle from '../assets/speckle.png';

const Nav = () => (
  <Container>
    <Logo>
      <NavLink to="/">
        <img src={logo} alt="Lineage Coffee Roasters, Orlando" />
      </NavLink>
    </Logo>
    <Links>
      <StyledLink to="/collections/coffee">Coffee</StyledLink>
      <StyledLink to="/collections/gear">Gear</StyledLink>
      <StyledLink to="/pages/learn">Learn</StyledLink>
      <StyledLink to="/pages/about">About</StyledLink>
      <StyledLink to="/cart">Cart</StyledLink>
    </Links>
  </Container>
);

const Container = glamorous.div({
  alignItems: 'center',
  backgroundColor: `rgb(${color.white})`,
  backgroundImage: `url(${speckle})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '400px auto',
  display: 'flex',
  height: 2 * grid,
  lineHeight: 1,
  paddingLeft: grid / 2,
  paddingRight: grid * 0.75,
  width: '100%',

  '& a': {
    display: 'block',
  },
});

const Links = glamorous.nav({
  display: 'flex',
  fontSize: font.down1,
});

const StyledLink = glamorous(NavLink)({
  color: `rgb(${color.black})`,
  display: 'block',
  fontWeight: 500,
  paddingBottom: 0.5 * grid,
  paddingTop: 0.5 * grid,
  position: 'relative',
  textDecoration: 'none',
  textTransform: 'uppercase',

  ' & + *': {
    marginLeft: 0.75 * grid,
  },

  '&::after': {
    backgroundColor: `rgb(${color.blue})`,
    borderRadius: '50%',
    bottom: 0,
    content: '""',
    height: 6,
    left: '50%',
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translate(-50%, 100%)',
    transition: `opacity 200ms, transform 200ms ${transition.standard}`,
    width: 6,
  },

  ['.active']: {
    '&::after': {
      opacity: 1,
      transform: 'translate(-50%, 0)',
    },
  },
});

const Logo = glamorous.div({
  marginRight: 'auto',

  '& img': {
    height: grid * 0.875,
    width: 'auto',
  },
});

export default Nav;
