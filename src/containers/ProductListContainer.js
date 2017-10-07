/**
 * Product List
 * @param {array} collections
 * @param {array} products
 * @param {string} selectedCollectionHandle
 * @param {string} selectedProductHandle
 */

import React from 'react';
import PropTypes from 'prop-types';

import ProductList from '../components/ProductList';

class ProductListContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    const selectedProduct = props.selectedProductHandle
      ? props.products.find(product => product.attrs.handle === props.selectedProductHandle)
      : {};

    const selectedProducts = props.selectedCollectionHandle
      ? props.products.filter(product => product.collections.indexOf(props.selectedCollectionHandle) !== -1)
      : [];

    this.state = {
      selectedProduct,
      selectedProducts,
    };
  }

  render() {
    return (
      <ProductList
        products={this.state.selectedProducts}
        product={this.state.selectedProduct}
      />
    );
  }
}

ProductListContainer.defaultProps = {
  collections: [],
  products: [],
  product: {},
  selectedCollectionHandle: null,
  selectedProductHandle: null,
};

ProductListContainer.propTypes = {
  collections: PropTypes.array,
  products: PropTypes.array,
  product: PropTypes.object,
  selectedCollectionHandle: PropTypes.string,
  selectedProductHandle: PropTypes.string,
};

export default ProductListContainer;
