import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';

import { color, font, grid, layer, transition } from '../lib/theme';

import hamburger from '../assets/hamburger.svg';
import logo from '../assets/lineage.svg';
import speckle from '../assets/speckle.png';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.closeNav = this.closeNav.bind(this);
    this.openNav = this.openNav.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.relaxScroll();
      this.setState({ isOpen: false });
    }
  }

  closeNav(e) {
    e.preventDefault();

    this.relaxScroll();
    this.setState({ isOpen: false });
  }

  openNav(e) {
    e.preventDefault();

    this.restrictScroll();
    this.setState({ isOpen: true });
  }

  restrictScroll() {
    document.body.classList.add(preventScroll);
  }

  relaxScroll() {
    document.body.classList.remove(preventScroll);
  }

  render() {
    return (
      <Container>
        <MobileOpen
          isOpen={this.state.isOpen}
          onClick={e => this.openNav(e)}
          aria-label="Open Mobile Menu"
        >
          <img src={hamburger} alt="Open Nav" />
        </MobileOpen>
        <Logo>
          <NavLink to="/">
            <img src={logo} alt="Lineage Coffee Roasters, Orlando" />
          </NavLink>
        </Logo>
        <Links isOpen={this.state.isOpen}>
          <MobileClose onClick={e => this.closeNav(e)} aria-label="Close Mobile Menu" />
          <StyledLink to="/collections/coffee">Coffee</StyledLink>
          <StyledLink to="/collections/gear">Gear</StyledLink>
          <MobileLink to="/pages/wholesale">Wholesale</MobileLink>
          <StyledLink to="/pages/learn">Learn</StyledLink>
          <StyledLink to="/pages/about">About</StyledLink>
        </Links>
        <CartLink to="/cart" empty={this.props.cartCount === 0} aria-label="Open Cart">
          <span>Cart</span>
          {this.props.cartCount}
        </CartLink>
      </Container>
    );
  }
}

Nav.defaultProps = {
  cartCount: 0,
};

Nav.propTypes = {
  cartCount: PropTypes.number,
  location: PropTypes.object.isRequired,
};

/**
 * Styles
 */

const preventScroll = css({
  overflow: 'hidden',

  '@media (min-width: 600px)': {
    overflow: 'auto',
  },
});

const breakpoint = {
  sm: '580px',
};

const Container = glamorous.div({
  alignItems: 'center',
  backgroundColor: `rgb(${color.white})`,
  backgroundImage: `url(${speckle})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '400px auto',
  display: 'flex',
  height: 2 * grid,
  lineHeight: 1,
  paddingLeft: 0,
  paddingRight: 2.5 * grid,
  width: '100%',

  [`@media (min-width: ${breakpoint.sm})`]: {
    paddingLeft: 0.5 * grid,
    justifyContent: 'flex-start',
  },
});

const MobileOpen = glamorous.button(
  {
    alignItems: 'center',
    appearance: 'button',
    background: 'none',
    border: 0,
    display: 'flex',
    height: 2 * grid,
    justifyContent: 'center',
    outline: 'none',
    padding: 0,
    transition: 'opacity 200ms',
    width: 2 * grid,

    [`@media (min-width: ${breakpoint.sm})`]: {
      display: 'none',
    },

    '& img': {
      display: 'block',
      height: 0.875 * grid,
      width: 0.875 * grid,
    },
  },

  ({ isOpen }) => ({
    opacity: isOpen ? 0 : 1,
  }),
);

const MobileClose = glamorous.button({
  alignItems: 'center',
  appearance: 'button',
  background: 'none',
  border: 0,
  display: 'flex',
  height: 2 * grid,
  justifyContent: 'center',
  left: 0,
  outline: 'none',
  padding: 0,
  position: 'absolute',
  top: 0,
  width: 2 * grid,

  [`@media (min-width: ${breakpoint.sm})`]: {
    display: 'none',
  },

  '&::before, &::after': {
    backgroundColor: `rgb(${color.black})`,
    content: '""',
    height: 2,
    left: '50%',
    position: 'absolute',
    top: '50%',
    width: 0.875 * grid,
  },

  '::before': {
    transform: 'translate(-50%, -50%) rotate(-45deg)',
  },

  '::after': {
    transform: 'translate(-50%, -50%) rotate(45deg)',
  },
});

const Links = glamorous.nav(
  {
    alignItems: 'center',
    backgroundColor: `rgba(${color.pink}, 0.95)`,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: layer.nav,

    [`@media (min-width: ${breakpoint.sm})`]: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      opacity: 1,
      position: 'static',
      visibility: 'visible',
      zIndex: 1,
    },
  },
  ({ isOpen }) => ({
    opacity: isOpen ? 1 : 0,
    transition: isOpen ? 'opacity 200ms' : 'opacity 200ms, visibility 0ms 200ms',
    visibility: isOpen ? 'visible' : 'hidden',
  }),
);

const CartLink = glamorous(Link)(
  {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: font.up1,
    fontWeight: 700,
    height: 2 * grid,
    justifyContent: 'center',
    position: 'fixed',
    right: 0,
    textDecoration: 'none',
    top: 0,
    transition: 'background-color 200ms, color 200ms',
    width: 2 * grid,
    zIndex: layer.cart,

    '& span': {
      alignItems: 'center',
      display: 'flex',
      fontSize: font.down4,
      fontWeight: 500,
      height: 0.75 * grid,
      justifyContent: 'center',
      left: 0,
      letterSpacing: '0.05em',
      position: 'absolute',
      textTransform: 'uppercase',
      top: 0.125 * grid,
      width: '100%',
    },

    ':hover': {
      backgroundColor: `rgb(${color.blueT})`,
      color: `rgb(${color.black})`,
    },
  },
  props => ({
    backgroundColor: props.empty ? `rgba(${color.offwhite}, 0.9)` : `rgb(${color.black})`,
    color: `rgb(${props.empty ? color.gray : color.white})`,
  })
);

const StyledLink = glamorous(NavLink)({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'flex',
  fontSize: font.up4,
  fontWeight: 500,
  paddingBottom: '1em',
  paddingTop: '1em',
  position: 'relative',
  textDecoration: 'none',
  textTransform: 'uppercase',

  [`@media (min-width: ${breakpoint.sm})`]: {
    fontSize: font.down1,

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
  },

  '.active': {
    '&::after': {
      opacity: 1,
      transform: 'translate(-50%, 0)',
    },
  },
});

const MobileLink = glamorous(StyledLink)({
  display: 'block',

  [`@media (min-width: ${breakpoint.sm})`]: {
    display: 'none',
  },
});

const Logo = glamorous.div({
  marginLeft: 'auto',
  marginRight: 'auto',

  [`@media (min-width: ${breakpoint.sm})`]: {
    marginLeft: 0,
    paddingRight: 0,
  },

  '& img': {
    height: grid * 0.75,
    width: 'auto',

    [`@media (min-width: ${breakpoint.sm})`]: {
      height: grid * 0.875,
    },
  },
});

export default withRouter(Nav);
