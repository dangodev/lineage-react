import React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

import { color, font, grid } from '../lib/theme';

import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import lineageLg from '../assets/lineage-full-black.svg';
import twitter from '../assets/twitter.svg';

const Footer = () => (
  <Container>
    <Nav>
      <MainNav>
        <StyledLink to="/collections/coffee">Coffee</StyledLink>
        <StyledLink to="/collections/gear">Gear</StyledLink>
        <StyledLink to="/pages/wholesale">Wholesale</StyledLink>
        <StyledLink to="/pages/about">About</StyledLink>
        <StyledLink to="/pages/learn">Learn</StyledLink>
      </MainNav>
      <SocialNav>
        <a href="https://facebook.com/lineageroasting" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M426.9 64H85.1C73.5 64 64 73.5 64 85.1v341.6c0 11.7 9.5 21.1 21.1 21.1h184V299.2H219v-58h50.1v-42.7c0-49.5 30.2-76.5 74.5-76.5 21.1 0 39.4 1.6 44.7 2.3v51.8h-30.6c-24.2 0-28.8 11.4-28.8 28.2v37h57.4l-7.5 58H329v148.6h97.8v.1c11.7 0 21.1-9.5 21.1-21.1V85.1c.1-11.6-9.4-21.1-21-21.1z"/></svg>
        </a>
        <a href="https://instagram.com/lineagecoffeeroasting" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 512"><path d="M280 45c-57.3 0-64.5.2-87.1 1.2-22.4 1-37.8 4.6-51.2 9.8-14 5.4-25.6 12.6-37.4 24.4s-18.9 23.5-24.4 37.4c-5.2 13.4-8.8 28.7-9.8 51.2-1 22.4-1.2 29.7-1.2 87s.2 64.5 1.2 87.1c1 22.4 4.6 37.8 9.8 51.2 5.4 14 12.6 25.6 24.4 37.4s23.5 18.9 37.4 24.4c13.4 5.2 28.7 8.8 51.2 9.8s29.7 1.2 87.1 1.2 64.5-.2 87.1-1.2c22.4-1 37.8-4.6 51.2-9.8 14-5.4 25.6-12.6 37.4-24.4s18.9-23.5 24.4-37.4c5.2-13.4 8.8-28.7 9.8-51.2s1.2-29.7 1.2-87.1-.2-64.5-1.2-87.1c-1-22.4-4.6-37.8-9.8-51.2-5.4-14-12.6-25.6-24.4-37.4s-23.5-18.9-37.4-24.4c-13.4-5.2-28.7-8.8-51.2-9.8-22.6-.8-29.8-1.2-87.1-1.1zm0 38c56.4 0 63 .2 85.3 1.2 20.6.9 31.8 4.4 39.2 7.3 9.9 3.8 16.9 8.4 24.3 15.7 7.4 7.4 12 14.4 15.7 24.3 2.9 7.5 6.4 18.6 7.3 39.2 1 22.3 1.2 28.9 1.2 85.3s-.2 63-1.2 85.3c-.9 20.6-4.4 31.8-7.3 39.2-3.8 9.9-8.4 16.9-15.7 24.3-7.4 7.4-14.4 12-24.3 15.7-7.5 2.9-18.6 6.4-39.2 7.3-22.3 1-28.9 1.2-85.3 1.2s-63-.2-85.3-1.2c-20.6-.9-31.8-4.4-39.2-7.3-9.9-3.8-16.9-8.4-24.3-15.7-7.4-7.4-12-14.4-15.7-24.3-2.9-7.5-6.4-18.6-7.3-39.2-1-22.3-1.2-28.9-1.2-85.3s.2-63 1.2-85.3c.9-20.6 4.4-31.8 7.3-39.2 3.8-9.9 8.4-16.9 15.7-24.3 7.4-7.4 14.4-12 24.3-15.7 7.5-2.9 18.6-6.4 39.2-7.3 22.3-1 28.9-1.2 85.3-1.2"/><path d="M280 326.3c-38.9 0-70.3-31.5-70.3-70.3s31.5-70.3 70.3-70.3 70.3 31.5 70.3 70.3-31.4 70.3-70.3 70.3zm0-178.7c-59.8 0-108.4 48.5-108.4 108.4S220.2 364.4 280 364.4 388.4 315.8 388.4 256 339.8 147.6 280 147.6zm137.9-4.2c0 3.4-.7 6.6-2 9.7-1.3 3.1-3.1 5.8-5.5 8.2s-5.1 4.2-8.2 5.5-6.4 2-9.7 2c-3.4 0-6.6-.7-9.7-2s-5.8-3.1-8.2-5.5c-2.4-2.4-4.2-5.1-5.5-8.2-1.3-3.1-2-6.4-2-9.7 0-3.4.7-6.6 2-9.7 1.3-3.1 3.1-5.8 5.5-8.2 2.4-2.4 5.1-4.2 8.2-5.5 3.2-1.3 6.4-2 9.7-2 3.4 0 6.6.7 9.7 2s5.8 3.1 8.2 5.5c2.4 2.4 4.2 5.1 5.5 8.2 1.4 3.1 2 6.4 2 9.7z"/></svg>
        </a>
        <a href="https://twitter.com/lineageroasting" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.6 444c175.4 0 271.5-145.5 271.5-271.4 0-4.1 0-8.2-.2-12.3 18.6-13.4 34.7-30.3 47.5-49.4-17.1 7.6-35.5 12.7-54.8 15.1 19.8-11.7 34.7-30.5 42-52.9-18.4 10.9-38.9 18.8-60.6 23C401.6 77.5 376.7 66 349.4 66c-52.7 0-95.4 42.8-95.4 95.4 0 7.4.9 14.7 2.5 21.8-79.2-3.8-149.6-42-196.6-99.7-8.2 14.2-12.8 30.5-12.8 48.1 0 33.1 16.9 62.3 42.4 79.4-15.7-.6-30.3-4.8-43.1-11.9v1.3c0 46.2 32.9 84.8 76.5 93.6-8 2.2-16.3 3.3-25.1 3.3-6.2 0-12.1-.6-17.9-1.7 12.1 38 47.4 65.5 89.1 66.2-32.8 25.7-73.8 41-118.4 41-7.6 0-15.3-.3-22.7-1.3 41.7 26.7 91.9 42.5 145.7 42.5"/></svg>
        </a>
      </SocialNav>
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
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: grid,
  paddingRight: grid,

  '@media (min-width: 780px)': {
    flexDirection: 'row',
  },
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
  marginLeft: 0.375 * grid,
  marginRight: 0.25 * grid,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color 200ms',

  ':hover': {
    color: `rgb(${color.blue})`,
  },
});

const MainNav = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  lineHeight: 2,
  marginLeft: 0,
  padding: 0,

  '@media (min-width: 780px)': {
    lineHeight: 1,
    marginLeft: 'auto',
    paddingLeft: 4 * grid,
  },
});

const SocialNav = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 0,
  marginTop: grid,

  '@media (min-width: 780px)': {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginTop: 0,
    width: 4 * grid,
  },

  '& a': {
    color: `rgb(${color.black})`,
    display: 'block',
    transition: 'color 200ms',

    ':hover': {
      color: `rgb(${color.blue})`,
    },

    '& + a': {
      marginLeft: 0.25 * grid,
    },
  },

  '& svg': {
    fill: 'currentColor',
    height: 0.625 * grid,
    width: 0.625 * grid,
  },
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
  paddingLeft: grid,
  paddingRight: grid,

  ' & a': {
    color: `rgb(${color.blue})`,
  },
});

export default Footer;
