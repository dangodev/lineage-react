import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class CartBlocker extends React.Component<RouteComponentProps> {
  shouldComponentUpdate({ location }: RouteComponentProps) {
    if (location.pathname === '/cart') {
      return false;
    }
    return true;
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(CartBlocker);
