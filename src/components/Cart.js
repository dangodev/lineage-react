import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { color, grid, layer, transition } from '../lib/theme';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnTo(e) { e.preventDefault(); this.props.history.push('/'); },
      isShowing: this.props.location.pathname === '/cart',
    };
    this.keydownHandler.bind(this);
  }

  componentWillMount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.addEventListener('keydown', keydownHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const isShowing = nextProps.location.pathname === '/cart';

      if (nextProps.history.action === 'PUSH') {
        this.setState({ returnTo(e) { e.preventDefault(); nextProps.history.goBack(); } });
      }

      this.setState({ isShowing });
    }
  }

  componentWillUnmount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.removeEventListener('keydown', keydownHandler);
  }

  keydownHandler(e) {
    if (this.state.isShowing && e.keyCode === 27) {
      this.state.returnTo();
    }
  }

  render() {
    return (
      <div>
        <Inner isShowing={this.state.isShowing}>
          <Close href="/" onClick={this.state.returnTo}>✕</Close>
          {this.props.cartItems.map(lineItem => (
            <div key={lineItem.id}>{lineItem.title}</div>
          ))}
          {this.props.cartItems.length === 0 && (
            <div>No Items</div>
          )}
        </Inner>
        <Overlay isShowing={this.state.isShowing} onClick={this.state.returnTo} />
      </div>
    );
  }
};

Cart.defaultProps = {
  cartItems: [],
};

Cart.propTypes = {
  cartItems: PropTypes.array,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

/**
 * Styles
 */

const Inner = glamorous.div(
  {
    backgroundColor: `rgb(${color.white})`,
    bottom: 0,
    maxWidth: '20em',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    padding: grid,
    position: 'fixed',
    right: 0,
    top: 0,
    transform: 'translateX(100%, 0)',
    width: '50vw',
    zIndex: layer.cart + 1,
  },
  props => ({
    transform: props.isShowing ? 'translateX(0)' : 'translateX(100%)',
    transition: props.isShowing ? `transform 200ms ${transition.standard}` : `transform 200ms ${transition.standard}, visibility 0ms 200ms`,
    visibility: props.isShowing ? 'visible' : 'hidden',
  })
);

const Overlay = glamorous.div(
  {
    backgroundColor: `rgb(${color.pink})`,
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: layer.cart,
  },
  props => ({
    opacity: props.isShowing ? 0.8 : 0,
    visibility: props.isShowing ? 'visible' : 'hidden',
    transition: props.isShowing ? 'opacity 200ms' :'opacity 200ms, visibility 0ms 200ms',
  }),
);

const Close = glamorous.a({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'grid',
  fontSize: 24,
  fontWeight: 500,
  height: 1.5 * grid,
  justifyContent: 'center',
  lineHeight: 1,
  position: 'absolute',
  right: 0,
  textDecoration: 'none',
  top: 0,
  width: 1.5 * grid,
});

export default Cart;
