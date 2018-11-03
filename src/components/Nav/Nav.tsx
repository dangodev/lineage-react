import * as React from 'react';
import { Link } from '@reach/router';
import { COLLECTION, PAGE } from 'lib/routes';
import hamburger from 'assets/hamburger.svg';
import logo from 'assets/lineage.svg';

import * as Styled from './styles';

const NAV_LINKS = [
  { url: COLLECTION.coffee, title: 'Coffee' },
  { url: COLLECTION.gear, title: 'Gear' },
  { url: PAGE.wholesale, title: 'Wholesale' },
  { url: PAGE.learn, title: 'Learn' },
  { url: PAGE.about, title: 'About' },
];

class Nav extends React.Component {
  state = {
    pathname: '/',
    isOpen: false,
  };

  static getDerivedStateFromProps(props: { location: Location }, state: { pathname: string }) {
    if (props.location.pathname !== state.pathname) {
      document.body.classList.remove(Styled.state.isScrollLocked);
      return {
        pathname: props.location.pathname,
        isOpen: false,
      };
    }

    return null;
  }

  closeNav = (e: any) => {
    e.preventDefault();
    this.relaxScroll();
    this.setState({ isOpen: false });
  };

  openNav = (e: any) => {
    e.preventDefault();
    this.restrictScroll();
    this.setState({ isOpen: true });
  };

  restrictScroll = () => {
    // eslint-disable-next-line no-undef
    document.body.classList.add(Styled.state.isScrollLocked);
  };

  relaxScroll = () => {
    // eslint-disable-next-line no-undef
    document.body.classList.remove(Styled.state.isScrollLocked);
  };

  render() {
    const { cartCount = 0 } = this.props;
    const { isOpen, pathname } = this.state;

    return (
      <Styled.Container>
        <Styled.MobileOpen
          isOpen={isOpen}
          onClick={e => this.openNav(e)}
          aria-label="Open Mobile Menu"
        >
          <img src={hamburger} alt="Open Nav" />
        </Styled.MobileOpen>
        <Styled.Logo>
          <Link to="/">
            <img src={logo} alt="Lineage Coffee Roasting, Orlando" />
          </Link>
        </Styled.Logo>
        <Styled.LinkList isOpen={isOpen}>
          <Styled.MobileClose onClick={e => this.closeNav(e)} aria-label="Close Mobile Menu" />
          {NAV_LINKS.map(({ url, title }) => (
            <Styled.Link key={url} to={url} isActive={url === pathname} isOpen={isOpen}>
              {title}
            </Styled.Link>
          ))}
        </Styled.LinkList>
        <Styled.CartLink to="/cart" empty={cartCount === 0} aria-label="Open Cart">
          <span>Cart</span>
          {cartCount}
        </Styled.CartLink>
      </Styled.Container>
    );
  }
}

export default Nav;
