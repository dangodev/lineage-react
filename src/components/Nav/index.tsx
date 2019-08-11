import React, { SyntheticEvent } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

import hamburger from 'assets/hamburger.svg';
import logo from 'assets/lineage.svg';

import * as Styled from './styles';

interface NavProps {
  cartCount: number;
}

interface NavState {
  isOpen: boolean;
}

class Nav extends React.Component<NavProps & RouteComponentProps, NavState> {
  static defaultProps = {
    cartCount: 0,
  };

  UNSAFE_componentWillReceiveProps({ location }: RouteComponentProps) {
    if (location.pathname !== this.props.location.pathname) {
      this.relaxScroll();
      this.setState({ isOpen: false });
    }
  }

  state = {
    isOpen: false,
  };

  closeNav = (e: SyntheticEvent) => {
    e.preventDefault();

    this.relaxScroll();
    this.setState({ isOpen: false });
  };

  openNav = (e: SyntheticEvent) => {
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
    const { cartCount } = this.props;
    const { isOpen } = this.state;

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
        <Styled.LinkList isOpen={isOpen}>
          <Styled.MobileClose onClick={this.closeNav} aria-label="Close Mobile Menu" />
          <Styled.Link to="/collections/coffee" isOpen={isOpen} style={{ transitionDelay: '0ms' }}>
            Coffee
          </Styled.Link>
          <Styled.Link to="/collections/gear" isOpen={isOpen} style={{ transitionDelay: '50ms' }}>
            Gear
          </Styled.Link>
          <Styled.MobileLink
            to="/pages/wholesale"
            isOpen={isOpen}
            style={{ transitionDelay: '100ms' }}
          >
            Wholesale
          </Styled.MobileLink>
          <Styled.Link to="/pages/learn" isOpen={isOpen} style={{ transitionDelay: '150ms' }}>
            Learn
          </Styled.Link>
          <Styled.Link to="/pages/about" isOpen={isOpen} style={{ transitionDelay: '200ms' }}>
            About
          </Styled.Link>
        </Styled.LinkList>
        <Styled.CartLink to="/cart" empty={cartCount === 0} aria-label="Open Cart">
          <span>Cart</span>
          {cartCount}
        </Styled.CartLink>
      </Styled.Container>
    );
  }
}

export default withRouter(Nav);
