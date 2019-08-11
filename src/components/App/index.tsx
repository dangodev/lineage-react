import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import CartBlocker from 'containers/CartBlocker';
import PageContainer from 'containers/PageContainer';
import ProductContainer from 'containers/ProductContainer';
import Cart from 'components/Cart';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import Nav from 'components/Nav';
import Home from 'pages/Home';

import { color } from 'lib/theme';

const Container = styled.div`
  background-color: rgb(${color.offwhite});
  font-size: 16px;
`;

interface AppProps {
  addLineItem: (lineItem: ShopifyBuy.AttributeInput) => void;
  allProducts: ShopifyCustom.Product[];
  checkout: () => boolean;
  checkoutLineItems: ShopifyBuy.LineItem[];
  collections: ShopifyCustom.CollectionWithProducts[];
  featuredCheckoutProduct?: ShopifyCustom.Product;
  featuredHomeProduct?: ShopifyCustom.Product;
  isLoading: boolean;
  privacyPolicy?: string;
  removeLineItem: (id: number | string) => void;
  subscriptionProducts: ShopifyCustom.Product[];
  updateLineItem: (input: ShopifyBuy.AttributeInput) => void;
}

const App: React.FunctionComponent<AppProps> = ({
  addLineItem,
  allProducts,
  checkout,
  checkoutLineItems,
  collections,
  featuredCheckoutProduct,
  featuredHomeProduct,
  isLoading = true,
  privacyPolicy = '',
  removeLineItem,
  subscriptionProducts,
  updateLineItem,
}) => (
  <BrowserRouter>
    <Container>
      <Nav cartCount={checkoutLineItems.length} />
      <Loading isLoading={isLoading} />
      <CartBlocker>
        <Route exact path="/" render={() => <Home featuredProduct={featuredHomeProduct} />} />
        <Route
          exact
          path="/pages/:slug"
          render={pageProps => <PageContainer privacyPolicy={privacyPolicy} {...pageProps} />}
        />
        <Route
          path="/:route"
          render={pageProps => (
            <ProductContainer
              addLineItem={addLineItem}
              allProducts={allProducts}
              collections={collections}
              subscriptionProducts={subscriptionProducts}
              {...pageProps}
            />
          )}
        />
      </CartBlocker>
      <Cart
        allProducts={allProducts}
        checkout={checkout}
        featuredProduct={featuredCheckoutProduct}
        isLoading={isLoading}
        lineItems={checkoutLineItems}
        removeLineItem={removeLineItem}
        updateLineItem={updateLineItem}
      />
      <Footer />
    </Container>
  </BrowserRouter>
);

export default App;
