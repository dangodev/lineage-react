import React from 'react';
import PropTypes from 'prop-types';

import Meta from '../Meta';
import Collection from '../../components/Collection';
import ProductView from '../../components/ProductView';

class ProductContainer extends React.Component {
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

  componentDidMount() {
    this.route(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.route(nextProps);

    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  getPageTitle() {
    if (this.state.current === 'collections' && this.state.collection) {
      return `${this.state.collection.title} • Lineage Coffee Roasting`;
    }
    if (this.state.current === 'products' && this.state.product) {
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

  route(nextProps) {
    const request = nextProps.location.pathname.split('/');
    const subroute = request[request.length - 1];

    if (!nextProps.allProducts.length || !nextProps.collections.length) return;

    if (nextProps.match.url === '/products') {
      document.body.classList.add('is-product-showing');
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
      document.body.classList.remove('is-product-showing');
      this.transition('CLOSE');
      this.setState({
        collection: nextProps.collections.find(({ handle }) => handle === subroute),
      });

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
