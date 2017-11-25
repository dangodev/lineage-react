import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import glamorous from 'glamorous';

import CartBlocker from 'containers/CartBlocker';
import PageContainer from 'containers/PageContainer';
import ProductContainer from 'containers/ProductContainer';
import Cart from 'components/Cart';
import Footer from 'components/Footer';
import Nav from 'components/Nav';
import Home from 'pages/Home';

import fonts from 'assets/fonts/fonts.css';
import { color, font } from 'lib/theme';

css.global('html, body', {
  backgroundColor: `rgb(${color.white})`,
  fontFamily: font.din,
  fontSize: '16px',
  lineHeight: 1.5,
  margin: 0,
});

css.global('*', {
  boxSizing: 'border-box',
});

const Container = glamorous.div({
  backgroundColor: `rgb(${color.offwhite})`,
  boxSizing: 'border-box',
});

const AppRouter = withRouter(CartBlocker);
const CartRouter = withRouter(Cart);

const App = props => (
  <BrowserRouter>
    <Container>
      <Nav cartCount={props.cartLineItems.length} />
      <AppRouter>
        <Route exact path="/" render={() => <Home allProducts={props.allProducts} />} />
        <Route exact path="/pages/:slug" render={pageProps => <PageContainer allProducts={props.allProducts} {...pageProps} />} />
        <Route
          path="/:route"
          render={({ location, match }) => (
            <ProductContainer
              allProducts={props.allProducts}
              addToCart={props.addToCart}
              collections={props.collections}
              location={location}
              match={match}
            />
          )}
        />
      </AppRouter>
      <CartRouter
        allProducts={props.allProducts}
        checkoutUrl={props.checkoutUrl}
        featuredCartProduct={props.featuredCartProduct}
        isLoading={props.isLoading}
        lineItems={props.cartLineItems}
        removeLineItem={props.removeLineItem}
        updateLineItem={props.updateLineItem}
      />
      <Footer />
    </Container>
  </BrowserRouter>
);

App.defaultProps = {
  allProducts: [],
  cartLineItems: [],
  featuredCartProduct: undefined,
  isLoading: false,
};

App.propTypes = {
  addToCart: PropTypes.func.isRequired,
  allProducts: PropTypes.array,
  cartLineItems: PropTypes.array,
  checkoutUrl: PropTypes.string.isRequired,
  collections: PropTypes.array,
  featuredCartProduct: PropTypes.object,
  isLoading: PropTypes.bool,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

export default App;
