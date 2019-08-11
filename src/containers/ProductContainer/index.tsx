import React from 'react';
import { RouteChildrenProps } from 'react-router';

import Meta from 'containers/Meta';
import Collection from 'components/Collection';
import ProductView from 'components/ProductView';

interface ProductContainerProps extends RouteChildrenProps {
  addLineItem: (lineItem: ShopifyBuy.AttributeInput) => void;
  allProducts: ShopifyCustom.Product[];
  collections: ShopifyCustom.CollectionWithProducts[];
  subscriptionProducts: ShopifyCustom.Product[];
}

interface StateMachine {
  [key: string]: {
    on: {
      [key: string]: string;
    };
  };
}

interface ProductContainerState {
  collection?: ShopifyCustom.CollectionWithProducts;
  current: string;
  flow: StateMachine;
  product?: ShopifyCustom.Product;
}

class ProductContainer extends React.Component<ProductContainerProps, ProductContainerState> {
  static defaultProps = {
    allProducts: [],
    collections: [],
    subscriptionProducts: [],
  };

  componentDidMount() {
    this.route(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps: ProductContainerProps) {
    this.route(nextProps);
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  state: ProductContainerState = {
    current: 'collections',
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
    const { current, collection, product } = this.state;

    if (current === 'collections' && collection) {
      return `${collection.title} • Lineage Coffee Roasting`;
    } else if (current === 'products' && product) {
      return `${product.title} • Lineage Coffee Roasting`;
    }
    return '';
  }

  getReturnTo() {
    return typeof this.state.collection === 'object'
      ? `/collections/${this.state.collection.handle}`
      : '/';
  }

  transition(action: string) {
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

  route(nextProps: ProductContainerProps) {
    const request = nextProps.location.pathname.split('/');
    const subroute = request[request.length - 1];

    if (!nextProps.allProducts.length || !nextProps.collections.length) {
      return;
    }

    if (nextProps.match && nextProps.match.url && nextProps.match.url === '/products') {
      this.showProduct();
      this.transition('SELECT');
      const nextProduct = nextProps.allProducts.find(({ handle }) => handle === subroute);
      if (!nextProduct) {
        return;
      }
      this.setState({ product: nextProduct });

      if (!this.state.collection) {
        this.setState({
          collection: nextProps.collections.find(
            collection =>
              collection.products &&
              collection.products.find(product => product.handle === nextProduct.handle)
          ),
        });
      }
    } else if (nextProps.match && nextProps.match.url === '/collections') {
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
    const { addLineItem, subscriptionProducts } = this.props;
    return (
      <div>
        <Meta title={this.getPageTitle()} />
        <Collection
          collection={this.state.collection}
          isShowing={this.state.current === 'collections' || this.state.current === 'products'}
          subscriptionProducts={subscriptionProducts}
        />
        <ProductView
          addLineItem={addLineItem}
          isShowing={this.state.current === 'products'}
          product={this.state.product}
          returnTo={this.getReturnTo()}
        />
      </div>
    );
  }
}

export default ProductContainer;
