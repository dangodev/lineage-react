import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Collection from '../components/Collection';
import ProductView from '../components/ProductView';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'collection',
      collection: undefined,
      product: undefined,
      flow: {
        collection: {
          on: {
            CHANGE: 'loading',
            SELECT: 'product',
          },
        },
        loading: {
          on: {
            SUCCESS: 'collection',
          },
        },
        product: {
          on: {
            CLOSE: 'collection',
          },
        },
      },
    };
  }

  componentWillMount() {
    this.route(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.route(nextProps);
  }

  getReturnTo() {
    return this.state.collection
      ? `/collections/${this.state.collection.handle}`
      : '/';
  }

  transition(action) {
    const currentState = this.state.flow[this.state.current];
    const nextState = currentState ? currentState.on[action] : false;
    if (currentState && nextState) {
      this.setState({ current: nextState });
    }
  }

  route(nextProps) {
    const request = nextProps.location.pathname.split('/');
    const subroute = request[request.length - 1];

    if (nextProps.match.url === '/product') {
      document.body.classList.add(IsShowing);
      this.transition('SELECT');
      const nextProduct = nextProps.allProducts.find(({ handle }) => handle === subroute);
      this.setState({ product: nextProduct });

      if (!this.state.collection) {
        this.setState({
          collection: nextProduct.collections[0] === 'subscriptions'
            ? nextProps.collections.find(({ handle }) => handle === 'coffee')
            : nextProps.collections.find(({ handle }) => handle === nextProduct.collections[0]),
        });
      }
    } else if (nextProps.match.url === '/collections') {
      document.body.classList.remove(IsShowing);
      this.transition('CLOSE');
      this.setState({ collection: nextProps.collections.find(({ handle }) => handle === subroute) });

      if (this.state.collection && this.state.collection.handle !== subroute) {
        this.transition('CHANGE');
        setTimeout(() => this.transition('SUCCESS'), 30);
      }
    } else {
      document.body.classList.remove(IsShowing);
      this.transition('CLOSE');
      this.setState({ collection: undefined, product: undefined });
    }
  }

  render() {
    return (
      <div>
        <Collection
          allProducts={this.props.allProducts}
          collection={this.state.collection}
          isShowing={this.state.current === 'collection' || this.state.current === 'product'}
        />
        <ProductView
          addToCart={this.props.addToCart}
          isShowing={this.state.current === 'product'}
          product={this.state.product}
          returnTo={this.getReturnTo()}
        />
      </div>
    );
  }
}

ProductContainer.propTypes = {
  addToCart: PropTypes.func.isRequired,
  allProducts: PropTypes.array.isRequired,
  collections: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

/**
 * Styles
 */

const IsShowing = css({
  height: '100vw',
  overflow: 'hidden',
});

export default ProductContainer;
