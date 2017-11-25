import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import hamburger from 'assets/hamburger.svg';
import logo from 'assets/lineage.svg';

import Styled from './styles';

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
    document.body.classList.add(Styled.state.isScrollLocked);
  }

  relaxScroll() {
    document.body.classList.remove(Styled.state.isScrollLocked);
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
            <img src={logo} alt="Lineage Coffee Roasters, Orlando" />
          </NavLink>
        </Styled.Logo>
        <Styled.LinkList isOpen={this.state.isOpen}>
          <Styled.MobileClose onClick={e => this.closeNav(e)} aria-label="Close Mobile Menu" />
          <Styled.Link to="/collections/coffee" isOpen={this.state.isOpen} delay={0}>
            Coffee
          </Styled.Link>
          <Styled.Link to="/collections/gear" isOpen={this.state.isOpen} delay={50}>
            Gear
          </Styled.Link>
          <Styled.MobileLink to="/pages/wholesale" isOpen={this.state.isOpen} delay={100}>
            Wholesale
          </Styled.MobileLink>
          <Styled.Link to="/pages/learn" isOpen={this.state.isOpen} delay={150}>
            Learn
          </Styled.Link>
          <Styled.Link to="/pages/about" isOpen={this.state.isOpen} delay={200}>
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
