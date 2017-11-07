import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid, transition } from '../lib/theme';

import logo from '../assets/lineage.svg';
import speckle from '../assets/speckle.png';

const Nav = props => (
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
      <CartLink to="/cart" empty={props.cartCount === 0} aria-label="Cart">
        {props.cartCount}
      </CartLink>
    </Links>
  </Container>
);

Nav.propTypes = {
  cartCount: PropTypes.number,
};

/**
 * Styles
 */

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
  paddingRight: 0,
  width: '100%',
});

const Links = glamorous.nav({
  display: 'flex',
  fontSize: font.down1,
});

const CartLink = glamorous(Link)(
  {
    alignItems: 'center',
    display: 'flex',
    fontSize: font.up1,
    fontWeight: 700,
    height: 2 * grid,
    justifyContent: 'center',
    position: 'relative',
    textDecoration: 'none',
    transition: 'background-color 200ms, color 200ms',
    width: 2 * grid,

    ':hover': {
      backgroundColor: `rgb(${color.blueT})`,
      color: `rgb(${color.black})`,
    },
  },
  ({ empty }) => ({
    backgroundColor: empty ? `rgba(${color.offwhite}, 0.5)` : `rgb(${color.blue})`,
    boxShadow: empty ? `inset 1px 0 rgb(${color.gray})` : 'none',
    color: `rgb(${empty ? color.gray : color.white})`,
  })
);

const StyledLink = glamorous(NavLink)({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'flex',
  fontWeight: 500,
  position: 'relative',
  textDecoration: 'none',
  textTransform: 'uppercase',

  ' & + *': {
    marginLeft: 0.75 * grid,
  },

  '&::after': {
    backgroundColor: `rgb(${color.blue})`,
    borderRadius: '50%',
    bottom: 0.25 * grid,
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
