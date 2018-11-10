import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class CartBlocker extends React.Component {
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

export default withRouter(CartBlocker);
