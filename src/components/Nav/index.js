import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import hamburger from 'assets/hamburger.svg';
import logo from 'assets/lineage.svg';

import * as Styled from './styles';

class Nav extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.relaxScroll();
      this.setState({ isOpen: false });
    }
  }

  state = {
    isOpen: false,
  };

  closeNav = e => {
    e.preventDefault();

    this.relaxScroll();
    this.setState({ isOpen: false });
  };

  openNav = e => {
    e.preventDefault();

    this.restrictScroll();
    this.setState({ isOpen: true });
  };

  restrictScroll() {
    if (window.innerWidth < 600) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  relaxScroll() {
    document.body.style.overflowY = 'auto';
  }

  render() {
    return (
      <Styled.Container>
        <Styled.MobileOpen
          isOpen={this.state.isOpen}
          onClick={e => this.openNav(e)}
          aria-label="Open Mobile Menu"
        >
          <img src={hamburger} alt="Open Nav" />
        </Styled.MobileOpen>
        <Styled.Logo>
          <NavLink to="/">
            <img src={logo} alt="Lineage Coffee Roasting, Orlando" />
          </NavLink>
        </Styled.Logo>
        <Styled.LinkList isOpen={this.state.isOpen}>
          <Styled.MobileClose onClick={e => this.closeNav(e)} aria-label="Close Mobile Menu" />
          <Styled.Link
            to="/collections/coffee"
            isOpen={this.state.isOpen}
            style={{ transitionDelay: '0ms' }}
          >
            Coffee
          </Styled.Link>
          <Styled.Link
            to="/collections/gear"
            isOpen={this.state.isOpen}
            style={{ transitionDelay: '50ms' }}
          >
            Gear
          </Styled.Link>
          <Styled.MobileLink
            to="/pages/wholesale"
            isOpen={this.state.isOpen}
            style={{ transitionDelay: '100ms' }}
          >
            Wholesale
          </Styled.MobileLink>
          <Styled.Link
            to="/pages/learn"
            isOpen={this.state.isOpen}
            style={{ transitionDelay: '150ms' }}
          >
            Learn
          </Styled.Link>
          <Styled.Link
            to="/pages/about"
            isOpen={this.state.isOpen}
            style={{ transitionDelay: '200ms' }}
          >
            About
          </Styled.Link>
        </Styled.LinkList>
        <Styled.CartLink to="/cart" empty={this.props.cartCount === 0} aria-label="Open Cart">
          <span>Cart</span>
          {this.props.cartCount}
        </Styled.CartLink>
      </Styled.Container>
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

export default withRouter(Nav);
