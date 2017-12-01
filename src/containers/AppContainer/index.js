import React from 'react';
import ShopifyBuy from 'shopify-buy';
import parse from 'url-parse';

import App from 'components/App';

const accessToken = '8b97d4f794c051c78b3f00e8da03ef19'; // Read-only. It’s cool if it’s in the client JS.
const domain = 'lineage-coffee-roasting.myshopify.com';

class AppContainer extends React.PureComponent {
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
      collections: props.collections.map(collection => ({
        description: collection.description,
        handle: collection.handle,
        image: collection.image,
        products: collection.products.map(product => product.id),
        title: collection.title,
      })),
    };

    this.addToCart = this.addToCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.getFeaturedCartProduct = this.getFeaturedCartProduct.bind(this);
    this.removeLineItem = this.removeLineItem.bind(this);
    this.updateLineItem = this.updateLineItem.bind(this);
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

  getCheckoutUrl() {
    if (this.state.allProducts.find(product =>
      product.type.toLowerCase() === 'coffee subscription'
      && this.state.cartLineItems.map(({ attrs }) => attrs.product_id).indexOf(product.id) !== -1)) {
      // -> http://support.rechargepayments.com/article/91-recharge-integration-guide
      const cartToken = document.cookie.match('(^|; )cart=([^;]*)');
      return cartToken
        ? `https://checkout.rechargeapps.com/r/checkout?myshopify_domain=${domain}&cart_token=${cartToken[2]}`
        : `https://${domain}/checkout`;
    }
    return this.state.cart.checkoutUrl || `https://${domain}/checkout`;
  }

  getFeaturedCartProduct() {
    if (!this.state.allProducts) return undefined;

    return this.state.allProducts
      .find(product => product.collections.indexOf('cart') !== -1);
  }

  addToCart({ variant, quantity }) {
    this.state.cart.createLineItemsFromVariants({ variant, quantity })
      .then(cart => this.updateCart(cart));
  }

  removeLineItem(id) {
    this.state.cart.removeLineItem(id)
      .then(cart => this.updateCart(cart));
  }

  updateCart(cart) { // This helps React know when to update
    this.setState({
      cart,
      cartLineItems: cart.lineItems,
    });
  }

  updateLineItem(id, quantity) {
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
    this.props.collections.forEach(collection =>
      collection.products.forEach((collectionProduct) => {
        const existingProduct = all.find(product => collectionProduct.id === product.id);
        if (existingProduct) {
          existingProduct.collections.push(collection.handle);
        } else {
          const metafields = this.props.metafields.find(metafield => metafield.id === collectionProduct.id);
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
      <App
        addToCart={this.addToCart}
        allProducts={this.state.allProducts}
        cart={this.state.cart}
        cartLineItems={this.state.cartLineItems}
        checkoutUrl={this.getCheckoutUrl()}
        collections={this.state.collections}
        featuredCartProduct={this.getFeaturedCartProduct()}
        removeLineItem={this.removeLineItem}
        updateCart={cart => this.cart(cart)}
        updateLineItem={this.updateLineItem}
      />
    );
  }
}

export default AppContainer;
