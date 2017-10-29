import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
} from 'react-router-dom';
import ShopifyBuy from 'shopify-buy';

import Cart from './components/Cart';
import CartBlocker from './containers/CartBlocker';
import GlobalStyles from './components/GlobalStyles';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ProductContainer from './containers/ProductContainer';

import Home from './pages/Home';
import About from './pages/About';

/**
 * @section Config
 */

const accessToken = '8b97d4f794c051c78b3f00e8da03ef19'; // Read-only. It’s cool if it’s in the client JS.
const domain = 'lineage-coffee-roasting.myshopify.com';

/**
 * @section Component
 */

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      cart: null,
      client: ShopifyBuy.buildClient({
        appId: '6', // '6' is for JS Buy Button (this app)
        accessToken,
        domain,
      }),
      collections: window.lineageCollections.map(collection => collection.products.map(({ id }) => id)),
      products: this.formatProducts(),
    };

    this.getCart = this.getCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.formatProducts = this.formatProducts.bind(this);
  }

  componentWillMount() {
    this.getCart();
  }

  getCart() {
    const cartID = window.localStorage.getItem('lineageCart');

    if (cartID) { // If returning visitor
      this.state.client.fetchCart(cartID)
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({
              cart: result,
              cartItems: result.lineItems,
            });
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    } else {      // If new visitor
      this.state.client.createCart()
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({
              cart: result,
              cartItems: result.lineItems,
            });
            window.localStorage.setItem('lineageCart', result.id);
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    }
  }

  addToCart(variantObject, quantity) {
    this.state.cart.createLineItemsFromVariants({ variant: variantObject, quantity })
      .then((result) => {
        this.setState({
          cart: result,
          cartItems: result.lineItems,
        });
      });
  }

  formatProducts() {
    const all = [];
    window.lineageCollections.forEach(collection =>
      collection.products.forEach((collectionProduct) => {
        const existingProduct = all.find(product => collectionProduct.id === product.id);
        if (existingProduct) {
          existingProduct.collections.push(collection.handle);
        } else {
          const metafields = window.lineageMetafields.find(metafield => metafield.id === collectionProduct.id);
          all.push({
            ...collectionProduct,
            collections: [collection.handle],
            metafields: metafields ? metafields.metafields : {},
          });
        }
      })
    );
    return all;
  }

  render() {
    return (
      <Router>
        <GlobalStyles>
          <Nav cartItems={this.state.cartItems} />
          <AppRouter>
            <Route exact path="/" render={() => <Home products={this.state.products} />} />
            <Route exact path="/pages/learn" component={About} />
            <Route exact path="/pages/about" component={About} />
            <Route
              path="/:route"
              render={props => (
                <ProductContainer
                  addToCart={this.addToCart}
                  collections={this.state.collections}
                  location={props.location}
                  match={props.match}
                  products={this.state.products}
                />
              )}
            />
          </AppRouter>
          <CartRouter
            cartItems={this.state.cartitems}
            collections={this.state.collections}
            isShowing={props => props.location.pathname === '/cart'}
            products={this.state.products}
          />
          <Footer />
        </GlobalStyles>
      </Router>
    );
  }
}

const AppRouter = withRouter(CartBlocker);
const CartRouter = withRouter(Cart);

export default App;
