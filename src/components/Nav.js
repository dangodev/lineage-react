/**
 * Nav
 * It’s a big site!
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Cart from './Cart';

export default class extends React.Component {
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
          cart={this.props.cart}
          closeCart={this.closeCart}
          isCartOpen={this.state.isCartOpen}
        />
      </nav>
    );
  }
}
