import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

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

const AppRouter = withRouter(CartBlocker);
const CartRouter = withRouter(Cart);

const App = props => (
  <BrowserRouter>
    <Container>
      <Nav cartCount={props.checkoutLineItems.length} />
      <Loading isLoading={props.isLoading} />
      <AppRouter>
        <Route exact path="/" render={() => <Home featuredProduct={props.featuredHomeProduct} />} />
        <Route
          exact
          path="/pages/:slug"
          render={pageProps => <PageContainer privacyPolicy={props.privacyPolicy} {...pageProps} />}
        />
        <Route
          path="/:route"
          render={({ location, match }) => (
            <ProductContainer
              addLineItem={props.addLineItem}
              allProducts={props.allProducts}
              collections={props.collections}
              location={location}
              match={match}
              subscriptionProducts={props.subscriptionProducts}
            />
          )}
        />
      </AppRouter>
      <CartRouter
        allProducts={props.allProducts}
        checkout={props.checkout}
        featuredProduct={props.featuredCheckoutProduct}
        isLoading={props.isLoading}
        lineItems={props.checkoutLineItems}
        removeLineItem={props.removeLineItem}
        updateLineItem={props.updateLineItem}
      />
      <Footer />
    </Container>
  </BrowserRouter>
);

App.defaultProps = {
  allProducts: [],
  collections: [],
  featuredCheckoutProduct: undefined,
  featuredHomeProduct: undefined,
  isLoading: false,
  privacyPolicy: '',
  subscriptionProducts: [],
};

App.propTypes = {
  addLineItem: PropTypes.func.isRequired,
  allProducts: PropTypes.array,
  checkout: PropTypes.func.isRequired,
  checkoutLineItems: PropTypes.array,
  collections: PropTypes.array,
  featuredCheckoutProduct: PropTypes.object,
  featuredHomeProduct: PropTypes.object,
  isLoading: PropTypes.bool,
  privacyPolicy: PropTypes.string,
  removeLineItem: PropTypes.func.isRequired,
  subscriptionProducts: PropTypes.array,
  updateLineItem: PropTypes.func.isRequired,
};

export default App;
