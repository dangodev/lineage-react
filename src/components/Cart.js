/**
 * Cart
 * “Cart.” Rather skeumorphic, don’tcha think?
 */

import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: { lineItems: [] },
      isLoading: false,
    };

    this.loadCart = this.loadCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.zeroState = this.zeroState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.updateCart();
  }

  componentWillMount() {
    this.loadCart();
  }

  loadCart() {
    const cartID = window.localStorage.getItem('lineageCart');

    if (cartID) { // If returning visitor
      this.props.client.fetchCart(cartID)
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cart: result });
          } else {
            setTimeout(() => this.loadCart(), 1000); // If failed, try again
          }
        });
    } else {      // If new visitor
      this.props.client.createCart()
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cart: result });
            window.localStorage.setItem('lineageCart', result.id);
          } else {
            setTimeout(() => this.loadCart(), 1000); // If failed, try again
          }
        });
    }
  }
  updateCart() {
    this.setState({ isLoading: true });
    this.props.client.fetchCart()
      .then(result => this.setState({ cartItems: result, isLoading: false }));
  }

  zeroState() {
    if (this.state.isLoading === false && this.state.cart.lineItems.length === 0) {
      return <div>Cart Empty</div>
    }
  }

  render() {
    return (
      <div style={this.props.isCartOpen ? { display: 'block' } : { display: 'none' }}>
        {this.state.isLoading ? 'Loading' : ''}
        {this.zeroState()}
        {this.state.cart.lineItems.map((lineItem) => (
          <div key={lineItem.id}>{lineItem.title}</div>
        ))}
      </div>
    );
  }
}
