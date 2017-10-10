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
  let product;
  let products;

  /* Show coffee collection */
  if (props.location.pathname === '/collections/coffee') {
    product = null;
    products = props.coffeeProducts;

  /* Show gear collection */
  } else if (props.location.pathname === '/collections/gear') {
    product = null;
    products = props.gearProducts;

  /* Show a product with its appropriate collection in the background */
  } else if (props.match.url === '/product') {
    const handle = props.location.pathname.split('/');
    const coffeeMatch = props.coffeeProducts
      ? props.coffeeProducts.find(({ attrs }) => attrs.handle === handle[handle.length - 1])
      : null;
    const gearMatch = props.gearProducts
      ? props.gearProducts.find(({ attrs }) => attrs.handle === handle[handle.length - 1])
      : null;
    product = coffeeMatch || gearMatch;
    products = coffeeMatch ? props.coffeeProducts : (gearMatch ? props.gearProducts : null);
  }
  return (
    <div>
      <ProductList products={products} />
      {product &&
        <ProductView product={product} />
      }
    </div>
  );
};

ProductContainer.propTypes = {
  coffeeProducts: PropTypes.array,
  gearProducts: PropTypes.array,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default ProductContainer;
