/**
 * Cart Blocker
 * @param {object} location
 */

import React from 'react';
import PropTypes from 'prop-types';

class CartBlocker extends React.Component {

  /* If visiting /cart, hold off re-rendering the main app */

  shouldComponentUpdate(nextProps) {
    if (nextProps.location.pathname === '/cart') {
      return false;
    }
    return true;
  }

  render() {
    return this.props.children;
  }
}

CartBlocker.propTypes = {
  location: PropTypes.object,
};

export default CartBlocker;
