import React from 'react';
import ShopifyBuy from 'shopify-buy';

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
    this.state.client.fetchRecentCart().then(cart => this.updateCart(cart));
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
