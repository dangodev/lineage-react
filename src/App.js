import React from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  withRouter,
} from 'react-router-dom';
import ShopifyBuy from 'shopify-buy';

import Cart from './components/Cart';
import CartBlocker from './containers/CartBlocker';
import Footer from './components/Footer';
import GlobalStyles from './components/GlobalStyles';
import Nav from './components/Nav';
import Page from './components/Page';
import ProductContainer from './containers/ProductContainer';

import Home from './pages/Home';

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
      allProducts: this.formatProducts(),
      cart: {},
      cartLineItems: [],
      client: ShopifyBuy.buildClient({
        appId: '6', // '6' is for JS Buy Button (this app)
        accessToken,
        domain,
      }),
      collections: window.lineageCollections.map(collection => ({
        description: collection.description,
        handle: collection.handle,
        image: collection.image,
        products: collection.products.map(product => product.id),
        title: collection.title,
      })),
      featuredCartProduct: this.getFeaturedCartProduct(),
    };

    this.addToCart = this.addToCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentWillMount() {
    this.getCart();
  }

  componentDidMount() {
    setInterval(() => this.getCart(), 30000);
  }

  getCart() {
    const cartID = window.localStorage.getItem('lineageCart');

    if (cartID) {
      this.loadCart(cartID);  // If returning visitor
    } else {
      this.createCart();      // If new visitor
    }
  }

  getFeaturedCartProduct() {
    return window.lineageCollections
      .find(collection => collection.handle === 'cart')
      .products[0];
  }

  addToCart({ variant, quantity }) {
    this.state.cart.createLineItemsFromVariants({ variant, quantity })
      .then(cart => this.updateCart(cart));
  }

  removeFromCart(id) {
    this.state.cart.removeLineItem(id)
      .then(cart => this.updateCart(cart));
  }

  updateCart(cart) { // This helps React know when to update
    this.setState({
      cart,
      cartLineItems: cart.lineItems,
      checkoutUrl: cart.checkoutUrl,
    });
  }

  updateQuantity(id, quantity) {
    this.state.cart.updateLineItem(id, quantity)
      .then(cart => this.updateCart(cart));
  }

  createCart() {
    this.setState({ isLoading: true });
    this.state.client.createCart()
      .then((cart) => {
        this.setState({ isLoading: false });
        if (cart) {
          this.updateCart(cart);
          window.localStorage.setItem('lineageCart', cart.id);
        } else {
          setTimeout(() => this.getCart(), 1000); // If failed, try again
        }
      });
  }

  loadCart(cartID) {
    this.setState({ isLoading: true });
    this.state.client.fetchCart(cartID)
      .then((cart) => {
        this.setState({ isLoading: false });
        if (cart) {
          this.updateCart(cart);
        } else {
          this.createCart();
        }
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
      <BrowserRouter>
        <GlobalStyles>
          <Nav cartCount={this.state.cartLineItems.length} />
          <AppRouter>
            <Route exact path="/" render={() => <Home allProducts={this.state.allProducts} />} />
            <Route exact path="/pages/:slug" render={props => <Page {...props} />} />
            <Route
              path="/:route"
              render={props => (
                <ProductContainer
                  allProducts={this.state.allProducts}
                  addToCart={this.addToCart}
                  collections={this.state.collections}
                  location={props.location}
                  match={props.match}
                />
              )}
            />
          </AppRouter>
          <CartRouter
            addToCart={this.addToCart}
            checkoutUrl={this.state.checkoutUrl}
            featuredCartProduct={this.state.featuredProduct}
            isLoading={this.state.isLoading}
            lineItems={this.state.cartLineItems}
            products={this.state.products}
            removeFromCart={this.removeFromCart}
            updateQuantity={this.updateQuantity}
          />
          <Footer />
        </GlobalStyles>
      </BrowserRouter>
    );
  }
}

const AppRouter = withRouter(CartBlocker);
const CartRouter = withRouter(Cart);

export default App;
