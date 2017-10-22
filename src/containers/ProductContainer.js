/**
 * Product Container
 * @param {array} coffeeProducts
 * @param {array} gearProducts
 */

import React from 'react';
import PropTypes from 'prop-types';

import ProductList from '../components/ProductList';
import ProductView from '../components/ProductView';

const ProductContainer = (props) => {
  const request = props.location.pathname.split('/');
  const subroute = request[request.length - 1];

  let selectedProduct = null;
  let selectedProducts;
  let returnTo = null;

  /* Show a collection */
  if (props.match.url === '/collections') {
    selectedProducts = props.products.filter(product =>
      product.collections.indexOf(subroute) !== -1);

  /* Show a product, and show its first collection in the background (usually coffee) */
  } else if (props.match.url === '/product') {
    selectedProduct = props.products.find(product => product.handle === subroute);
    const firstCollection = selectedProduct.collections[0];
    selectedProducts = props.products.filter(product =>
      product.collections.indexOf(firstCollection) !== -1);
    returnTo = `/collections/${firstCollection}`;
  }

  return (
    <div>
      <ProductList products={selectedProducts} />
      {selectedProduct &&
        <ProductView product={selectedProduct} returnTo={returnTo} />
      }
    </div>
  );
};

ProductContainer.propTypes = {
  collections: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductContainer;
