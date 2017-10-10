/**
 * Nav
 * It’s a big site!
 * @param {array} cartItems
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <Link to="/">Lineage</Link>
    <Link to="/collections/coffee">Coffee</Link>
    <Link to="/collections/gear">Gear</Link>
    <Link to="/pages/learn">Learn</Link>
    <Link to="/pages/about">About</Link>
    <Link to="/cart">Cart</Link>
  </nav>
);

export default Nav;
