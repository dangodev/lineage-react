/**
 * Nav
 * It’s a big site!
 * @param {array} cartItems
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Cart from './Cart';

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isCartOpen: false,
    };

    this.closeCart = this.closeCart.bind(this);
    this.openCart = this.openCart.bind(this);
  }

  closeCart(e) {
    this.setState({ isCartOpen: false });
    e.preventDefault();
  }
  openCart(e) {
    this.setState({ isCartOpen: true });
    e.preventDefault();
  }

  render() {
    return (
      <nav>
        <Link to="/">Lineage</Link>
        <Link to="/collections/coffee">Coffee</Link>
        <Link to="/collections/gear">Gear</Link>
        <Link to="/pages/learn">Learn</Link>
        <Link to="/pages/about">About</Link>
        <a href="/cart" onClick={this.openCart}>Cart</a>

        <Cart
          cartItems={this.props.cartItems}
          closeCart={this.closeCart}
          isCartOpen={this.state.isCartOpen}
        />
      </nav>
    );
  }
}

Nav.defaultProps = {
  cartItems: [],
};

Nav.propTypes = {
  cartItems: PropTypes.array,
};

export default Nav;
