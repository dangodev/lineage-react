/**
 * Product Container
 * @param {array} coffeeProducts
 * @param {array} gearProducts
 */

import React from 'react';
import PropTypes from 'prop-types';

import Collection from '../components/Collection';
import ProductView from '../components/ProductView';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: undefined,
      collectionTransitionOut: 200,
      isChangingProduct: false,
      isShowingCollection: false,
      isShowingProduct: false,
      product: undefined,
      productTransitionOut: 200,
      returnTo: '/',
    };
  }

  componentWillMount() {
    this.route(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.route(nextProps);
  }

  route(nextProps) {
    const request = nextProps.location.pathname.split('/');
    const subroute = request[request.length - 1];
    const magicCSSTimeout = 30; // magic # to account for DOM writing (it’s OK if it’s not bullet-proof; it keeps things slick);

    switch (nextProps.match.url) {
      case '/collections': {
        const nextCollection = nextProps.collections.find(({ handle }) => handle === subroute);
        this.setState({ returnTo: `/collections/${nextCollection.handle}` });

        if (this.state.product) { // unload product
          this.setState({ isShowingProduct: false });
          setTimeout(() => this.setState({ product: undefined }), this.state.productTransitionOut);
        }

        if (this.state.collection && this.state.collection.handle !== subroute) { // animate between collections
          this.setState({ isShowingCollection: false });
          setTimeout(() => this.setState({ collection: nextCollection }), this.state.collectionTransitionOut);
          setTimeout(() => this.setState({ isShowingCollection: true }), this.state.collectionTransitionOut + magicCSSTimeout);
        }

        else if (!this.state.collection) { // Load collection, if none
          this.setState({ collection: nextCollection });
          setTimeout(() => this.setState({ isShowingCollection: true }), magicCSSTimeout);
        }
        break;
      }
      case '/product': {
        const nextProduct = nextProps.allProducts.find(({ handle }) => handle === subroute);

        if (!this.state.collection) { // set collection if none
          const collection = nextProps.collections.find(({ handle }) => handle === nextProduct.collections[0]);
          this.setState({
            collection,
            isShowingCollection: true,
            returnTo: `/collections/${collection.handle}`,
          });
        }

        this.setState({ product: nextProduct });
        setTimeout(() => this.setState({ isShowingProduct: true }), magicCSSTimeout); // transition product in

        break;
      }
      default: {}
    }
  }

  render() {
    return (
      <div>
        <Collection
          allProducts={this.props.allProducts}
          collection={this.state.collection}
          isShowing={this.state.isShowingCollection}
        />
        <ProductView
          addToCart={this.props.addToCart}
          isShowing={this.state.isShowingProduct}
          product={this.state.product}
          returnTo={this.state.returnTo}
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

export default ProductContainer;
