import * as React from 'react';
import { Router } from '@reach/router';
import { CART_PATH, COLLECTIONS_PATH, PRODUCTS_PATH, PAGES_PATH } from 'lib/routes';
import Cart from 'components/Cart';
import Collection from 'containers/Collection';
import Home from 'pages/Home';
import Page from 'containers/Page';
import Product from 'containers/Product';

const Routes = (props: {
  allProducts: ShopifyBuy.Product[];
  addLineItem: any;
  checkout: any;
  checkoutLineItems: any;
  collections: ShopifyBuy.Collection[];
  featuredCheckoutProduct: ShopifyBuy.Product;
  featuredHomeProduct: ShopifyBuy.Product;
  privacyPolicy: any;
  removeLineItem: any;
  subscriptionProducts: ShopifyBuy.Product[];
  updateLineItem: any;
}) => {
  const {
    allProducts = [],
    addLineItem,
    checkout,
    checkoutLineItems,
    collections,
    featuredCheckoutProduct,
    featuredHomeProduct,
    privacyPolicy,
    removeLineItem,
    subscriptionProducts,
    updateLineItem,
  } = props;

  return (
    <Router>
      <Home path="/" featuredProduct={featuredHomeProduct} />
      <Page path={`/${PAGES_PATH}/:page`} privacyPolicy={privacyPolicy} />
      <Collection
        path={`/${COLLECTIONS_PATH}/:collection`}
        allProducts={allProducts}
        collections={collections}
      />
      <Product
        path={`/${PRODUCTS_PATH}/:product`}
        addLineItem={addLineItem}
        allProducts={allProducts}
        collections={collections}
        subscriptionProducts={subscriptionProducts}
      />
      <Cart
        path={CART_PATH}
        allProducts={allProducts}
        checkout={checkout}
        featuredProduct={featuredCheckoutProduct}
        lineItems={checkoutLineItems}
        removeLineItem={removeLineItem}
        updateLineItem={updateLineItem}
      />
    </Router>
  );
};

export default Routes;
