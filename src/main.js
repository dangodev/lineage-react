/**
 * Lineage Main Entry
 */

/**
 * @section Config
 */

const accessToken = '8b97d4f794c051c78b3f00e8da03ef19';
const domain = 'lineage-coffee-roasting.myshopify.com';

/**
 * @section Core
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import Async from 'react-code-splitting';

/* Shopify */

import ShopifyBuy from 'shopify-buy';

const client = ShopifyBuy.buildClient({
  appId: '6', // '6' is for JS Buy Button (this app)
  accessToken,
  domain,
});
const cart = client.createCart();

/**
 * @section Dynamic components (lazy-loaded)
 */

const sharedProps = { client, cart };

const Nav = () => (<Async load={import('./components/Nav')} componentProps={sharedProps} />);
const Home = () => (<Async load={import('./pages/Home')} componentProps={sharedProps} />);
const Coffee = () => (<Async load={import('./pages/Coffee')} componentProps={sharedProps} />);
const Cart = () => (<Async load={import('./components/Cart')} componentProps={sharedProps} />);
const fourOhFour = () => (<Async load={import('./pages/404')} componentProps={sharedProps} />);

/**
 * @section Render
 */

const BaseStyles = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

const App = () => (
  <Router>
    <BaseStyles>
      <Nav />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/" component={Home} />
      <Route exact path="/collections/coffee" component={Coffee} />
      <Route exact path="/collections/gear" component={Coffee} />
      {/*<Route component={fourOhFour} />*/}
    </BaseStyles>
  </Router>
);

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app-root'),
);
