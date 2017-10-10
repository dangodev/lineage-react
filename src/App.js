/**
 * App
 * The top of the waterfall.
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
} from 'react-router-dom';
import ShopifyBuy from 'shopify-buy';

import Cart from './components/Cart';
import CartBlocker from './containers/CartBlocker';
import Nav from './components/Nav';
import ProductContainer from './containers/ProductContainer';

import Home from './pages/Home';
import About from './pages/About';

/**
 * @section Config
 */

const accessToken = '8b97d4f794c051c78b3f00e8da03ef19'; // Read-only. It’s cool if it’s in the client JS.
const domain = 'lineage-coffee-roasting.myshopify.com';

const coffeeCollection = 27654297;
const gearCollection = '28017149';
const cartCollection = '';

/**
 * @section Component
 */

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      client: ShopifyBuy.buildClient({
        appId: '6', // '6' is for JS Buy Button (this app)
        accessToken,
        domain,
      }),
      coffeeProducts: [],
      gearProducts: [],
    };

    this.getCart = this.getCart.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentWillMount() {
    this.getCart();
    this.getProducts();
  }

  getCart() {
    const cartID = window.localStorage.getItem('lineageCart');

    if (cartID) { // If returning visitor
      this.state.client.fetchCart(cartID)
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cartItems: result.lineItems });
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    } else {      // If new visitor
      this.state.client.createCart()
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cartItems: result.lineItems });
            window.localStorage.setItem('lineageCart', result.id);
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    }
  }

  getProducts() {
    this.state.client.fetchQueryProducts({ collection_id: coffeeCollection })
      .then(result => this.setState({
        coffeeProducts: result,
      }));
    this.state.client.fetchQueryProducts({ collection_id: gearCollection })
      .then(result => this.setState({
        gearProducts: result,
      }));
  }

  render() {
    return (
      <Router>
        <div>
          <Nav cartItems={this.state.cartItems} />
          <AppRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/pages/learn" component={About} />
            <Route exact path="/pages/about" component={About} />
            <Route
              path="/:route"
              render={props => (
                <ProductContainer
                  match={props.match}
                  location={props.location}
                  coffeeProducts={this.state.coffeeProducts}
                  gearProducts={this.state.gearProducts}
                />
              )}
            />
          </AppRouter>
          <CartRouter
            cartItems={this.state.cartitems}
            isShowing={props => props.location.pathname === '/cart'}
          />
        </div>
      </Router>
    );
  }
}

const AppRouter = withRouter(CartBlocker);
const CartRouter = withRouter(Cart);

/**
 * @section Styles
 */

export default App;
