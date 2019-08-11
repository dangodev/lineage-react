import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Meta from 'containers/Meta';
import Collection from 'components/Collection';
import ProductView from 'components/ProductView';

class ProductContainer extends React.Component {
  componentWillMount() {
    this.route(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.route(nextProps);

    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  state = {
    current: 'collections',
    collection: undefined,
    product: undefined,
    flow: {
      collections: {
        on: {
          CHANGE: 'loading',
          SELECT: 'products',
        },
      },
      loading: {
        on: {
          SUCCESS: 'collections',
        },
      },
      products: {
        on: {
          CLOSE: 'collections',
        },
      },
    },
  };

  getPageTitle() {
    if (this.state.current === 'collections' && this.state.collection) {
      return `${this.state.collection.title} • Lineage Coffee Roasting`;
    } else if (this.state.current === 'products' && this.state.product) {
      return `${this.state.product.title} • Lineage Coffee Roasting`;
    }
    return undefined;
  }

  getReturnTo() {
    return this.state.collection ? `/collections/${this.state.collection.handle}` : '/';
  }

  transition(action) {
    const currentState = this.state.flow[this.state.current];
    const nextState = currentState ? currentState.on[action] : false;
    if (currentState && nextState) {
      this.setState({ current: nextState });
    }
  }

  hideProduct() {
    document.body.style.height = 'auto';
    document.body.style.overflowY = 'auto';
  }

  showProduct() {
    document.body.style.height = '100vw';
    document.body.style.overflowY = 'hidden';
  }

  route(nextProps) {
    const request = nextProps.location.pathname.split('/');
    const subroute = request[request.length - 1];

    if (!nextProps.allProducts.length || !nextProps.collections.length) {
      return false;
    }

    if (nextProps.match.url === '/products') {
      this.showProduct();
      this.transition('SELECT');
      const nextProduct = nextProps.allProducts.find(({ handle }) => handle === subroute);
      this.setState({ product: nextProduct });

      if (!this.state.collection) {
        this.setState({
          collection: nextProps.collections.find(collection =>
            collection.products.find(product => product.handle === nextProduct.handle)
          ),
        });
      }
    } else if (nextProps.match.url === '/collections') {
      this.hideProduct();
      this.transition('CLOSE');
      this.setState({
        collection: nextProps.collections.find(({ handle }) => handle === subroute),
      });

      if (this.state.collection && this.state.collection.handle !== subroute) {
        this.transition('CHANGE');
        setTimeout(() => this.transition('SUCCESS'), 30);
      }
    } else {
      this.hideProduct();
      this.transition('CLOSE');
      this.setState({ collection: undefined, product: undefined });
    }
  }

  render() {
    return (
      <div>
        <Meta title={this.getPageTitle()} />
        <Collection
          collection={this.state.collection}
          isShowing={this.state.current === 'collections' || this.state.current === 'products'}
          subscriptionProducts={this.props.subscriptionProducts}
        />
        <ProductView
          addLineItem={this.props.addLineItem}
          isShowing={this.state.current === 'products'}
          product={this.state.product}
          returnTo={this.getReturnTo()}
        />
      </div>
    );
  }
}

ProductContainer.defaultProps = {
  allProducts: [],
  collections: [],
  subscriptionProducts: [],
};

ProductContainer.propTypes = {
  addLineItem: PropTypes.func.isRequired,
  allProducts: PropTypes.array,
  collections: PropTypes.array,
  location: PropTypes.object.isRequired,
  subscriptionProducts: PropTypes.array,
  match: PropTypes.object.isRequired,
};

export default ProductContainer;
