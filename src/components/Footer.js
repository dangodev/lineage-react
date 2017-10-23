import React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { color, font, grid } from '../lib/theme';

import lineageLg from '../assets/lineage-full-black.svg';

const Footer = () => (
  <Container>
    <Nav>
      <StyledLink to="/collections/coffee">Coffee</StyledLink>
      <StyledLink to="/collections/gear">Gear</StyledLink>
      <StyledLink to="/pages/wholesale">Wholesale</StyledLink>
      <StyledLink to="/pages/about">About</StyledLink>
      <StyledLink to="/pages/learn">Learn</StyledLink>
    </Nav>
    <Colophon>
      <Logo src={lineageLg} alt="Lineage Coffee Roasters, Orlando, FL" />
      <Contact href="mailto:hello@lineageroasting.com?subject=Hello!">hello@lineageroasting.com</Contact>
      <Copyright>
        © {new window.Date().getUTCFullYear()} Lineage Coffee Roasting. We do not
        share your information without your
        permission. <Link to="/pages/privacy-policy">View our privacy policy</Link>.
      </Copyright>
    </Colophon>
  </Container>
);

const Container = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  paddingBottom: 2 * grid,
  paddingTop: 2 * grid,
});

const Nav = glamorous.nav({
  display: 'flex',
  justifyContent: 'center',
});

const Colophon = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

const StyledLink = glamorous(Link)({
  color: `rgb(${color.black})`,
  display: 'block',
  fontFamily: font.din,
  fontSize: font.down1,
  fontWeight: 500,
  marginLeft: 0.25 * grid,
  marginRight: 0.25 * grid,
  textDecoration: 'none',
  textTransform: 'uppercase',
});

const Logo = glamorous.img({
  display: 'block',
  height: 2 * grid,
  marginTop: grid,
  width: 'auto',
});

const Contact = glamorous.a({
  color: `rgb(${color.blue})`,
  display: 'block',
  fontSize: font.down2,
  marginTop: 0.5 * grid,
});

const Copyright = glamorous.aside({
  display: 'block',
  fontSize: font.down3,
  marginTop: 0.5 * grid,

  ' & a': {
    color: `rgb(${color.blue})`,
  }
});

export default Footer;
