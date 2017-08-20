/**
 * Nav
 * It’s a big site!
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav>
    <Link to="/">Lineage</Link>
    <Link to="/collections/coffee">Coffee</Link>
    <Link to="/collections/gear">Gear</Link>
    <Link to="/pages/learn">Learn</Link>
    <Link to="/pages/about">About</Link>
  </nav>
);
