/**
 * App
 * Root-level data structure
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

import Nav from './components/Nav';

import Coffee from './pages/Coffee';
import Gear from './pages/Gear';
import Home from './pages/Home';
import Product from './pages/Product';

/* Shopify */

import ShopifyBuy from 'shopify-buy';

/**
 * @section Config
 */

const accessToken = '8b97d4f794c051c78b3f00e8da03ef19';
const domain = 'lineage-coffee-roasting.myshopify.com';

const coffeeCollection = 27654297;
const gearCollection = '28017149';
const cartCollection = '';

/**
 * @section Render
 */

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: { lineItems: [] },
      client: ShopifyBuy.buildClient({
        appId: '6', // '6' is for JS Buy Button (this app)
        accessToken,
        domain,
      }),
      coffeeProducts: [],  // We have to do it this way, because Shopify doesn’t
      gearProducts: [],    // expose collections on products.
    };

    this.getProduct.bind(this);

    // Init
    this.getCart();
    this.getCoffeeProducts();
    this.getGearProducts();
  }

  getCart() {
    const cartID = window.localStorage.getItem('lineageCart');

    if (cartID) { // If returning visitor
      this.state.client.fetchCart(cartID)
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cart: result });
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    } else {      // If new visitor
      this.state.client.createCart()
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cart: result });
            window.localStorage.setItem('lineageCart', result.id);
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    }
  }

  getProduct(handle) {
    return [...this.state.coffeeProducts, ...this.state.gearProducts]
      .find(product => product.handle === handle);
  }

  getCoffeeProducts() {
    this.state.client.fetchQueryProducts({ collection_id: coffeeCollection })
      .then((result) => {
        this.setState({ coffeeProducts: result });
      });
  }
  getGearProducts() {
    this.state.client.fetchQueryProducts({ collection_id: gearCollection })
      .then((result) => {
        this.setState({ gearProducts: result });
      });
  }

  render() {
    const BaseStyles = styled.div`
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    `;

    return (
      <Router>
        <BaseStyles>
          <Nav cart={this.state.cart} />

          <Route exact path="/" component={Home} />
          <Route path="/collections/coffee" component={() => <Coffee products={this.state.coffeeProducts} />} />
          <Route path="/collections/gear" component={() => <Gear products={this.state.gearProducts} />} />
          <Route path="/product/:handle" component={({ match }) =>
            <Product product={this.getProduct(match.params.handle)} />
          } />

          {/*<Route component={fourOhFour} />*/}
        </BaseStyles>
      </Router>
    );
  }
}
