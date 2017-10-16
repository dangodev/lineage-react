import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid } from '../lib/theme';

import logo from '../assets/lineage.svg';
import speckle from '../assets/speckle.png';

const Nav = () => (
  <Container>
    <Logo>
      <Link to="/">
        <img src={logo} alt="Lineage Coffee Roasters, Orlando" />
      </Link>
    </Logo>
    <Links>
      <Link to="/collections/coffee">Coffee</Link>
      <Link to="/collections/gear">Gear</Link>
      <Link to="/pages/learn">Learn</Link>
      <Link to="/pages/about">About</Link>
      <Link to="/cart">Cart</Link>
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

  '& a': {
    color: `rgb(${color.black})`,
    fontWeight: 500,
    textDecoration: 'none',
    textTransform: 'uppercase',

    ' & + a': {
      marginLeft: grid / 2,
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
