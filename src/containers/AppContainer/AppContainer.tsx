import * as React from 'react';
import * as Client from 'shopify-buy';
import axios from 'axios';
import { navigate } from '@reach/router';
import Routes from 'Routes';
import { getCheckout } from 'lib/routes';
import {
  LineageCollection,
  LineageProduct,
  ShopifyLegacyCart,
  ShopifyLegacyLineItem,
} from 'types/shopify';

const storefrontAccessToken = '8b97d4f794c051c78b3f00e8da03ef19'; // Read-only. It’s cool if it’s in the client JS.
const domain = 'lineage-coffee-roasting.myshopify.com';

const CART = 'cart';
const FRONTPAGE = 'frontpage';
const READY = 'READY';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

class AppContainer extends React.PureComponent {
  componentDidMount() {
    this.getCheckout();
    this.fetchProducts();
    this.getPrivacyPolicy();
    setInterval(() => this.getCheckout(), 30000);
  }

  state = {
    allProducts: [],
    checkoutLineItems: [],
    checkoutID: '',
    checkoutURL: getCheckout(domain),
    client: Client.buildClient({ storefrontAccessToken, domain }),
    collections: [],
    status: READY,
    rechargeURL: '',
    subscriptionProducts: [],
  };

  addLineItem = (lineItem: { variantId: string; quantity: string; customAttributes?: any }) => {
    const { variantId, quantity, customAttributes } = lineItem;
    this.renewCart();
    this.state.client.checkout
      .addLineItems(this.state.checkoutID, [
        { variantId, quantity: parseInt(quantity), customAttributes },
      ])
      .then(
        checkout => {
          this.updateCheckout(checkout);
        },
        error => console.error(error)
      );
  };

  // Some nasty ReCharge legacy code mumbo jumbo going on here
  checkout = () => {
    this.setState({ status: LOADING });

    if (this.state.checkoutLineItems.length === 0) {
      return false;
    }

    if (this.hasSubscription(this.state.checkoutLineItems) === false) {
      this.expireCart();
      navigate(this.state.checkoutURL);
    }

    const getCookie = name => (document.cookie.match('(^|; )' + name + '=([^;]*)') || 0)[2];

    const getLegacyCart = (clearCart: boolean) =>
      axios.get('/cart.js').then((result: { data: ShopifyLegacyCart }) => {
        const { data } = result;

        if (clearCart) {
          axios
            .post('/cart/update.js', {
              updates: data.items.reduce((changes, item) => ({
                ...changes,
                [item.id]: 0,
              })),
            })
            .then(() =>
              this.state.checkoutLineItems.forEach(lineItem => addToLegacyCart(lineItem))
            );
        } else if (data.item_count === this.state.checkoutLineItems.length) {
          this.expireCart();
          redirectToRecharge();
        }
      });

    const addToLegacyCart = (lineItem: ShopifyLegacyLineItem) => {
      const properties = {};
      lineItem.customAttributes.forEach(attribute => {
        properties[attribute.key] = attribute.value;
      });

      axios
        .post('/cart/add.js', {
          quantity: lineItem.quantity,
          id: this.getLegacyVariantID(lineItem, lineItem.variant.title),
          properties,
        })
        .then(() => {
          const cartToken = getCookie(CART);
          const rechargeURL = `https://checkout.rechargeapps.com/r/checkout?myshopify_domain=${domain}&cart_token=${cartToken}`;
          if (cartToken && this.state.rechargeURL !== rechargeURL) {
            this.setState({ rechargeURL });
          }
          getLegacyCart();
        });
    };

    const redirectToRecharge = () => {
      window.location = this.state.rechargeURL;
    };

    getLegacyCart(true);
  };

  createCheckout = () => {
    this.setState({ status: LOADING });
    this.state.client.checkout
      .create()
      .then(checkout => {
        this.setState({ status: SUCCESS });
        if (checkout) {
          this.updateCheckout(checkout);
          localStorage.setItem('lineageCheckout', checkout.id);
        } else {
          setTimeout(() => this.getCheckout(), 1000); // If failed, try again
        }
      })
      .catch(error => this.setState({ status: ERROR, error }));
  };

  getCheckout = () => {
    const checkoutID = localStorage.getItem('lineageCheckout');
    const lastUpdated = parseInt(localStorage.getItem('lineageCheckoutDate'), 10);
    const threeDays = 259200000;

    if (checkoutID && lastUpdated && lastUpdated > Math.floor(Date.now() - threeDays)) {
      this.renewCart();
      return this.fetchCheckout(checkoutID);
    }
    this.renewCart();
    return this.createCheckout();
  };

  getPrivacyPolicy = () => {
    this.state.client.shop
      .fetchPolicies()
      .then(policies => this.setState({ privacyPolicy: policies.privacyPolicy }));
  };

  expireCart = () => {
    // Don’t expire directly, expire in 5 min, as their cart will be gone if
    // they go back to add something
    const almostThreeDays = 258900000;
    localStorage.setItem('lineageCheckoutDate', Date.now() - almostThreeDays);
  };

  fetchCheckout = (checkoutID: string) => {
    this.setState({ status: LOADING });
    this.state.client.checkout
      .fetch(checkoutID)
      .then(checkout => {
        this.setState({ status: SUCCESS });
        if (checkout) {
          this.updateCheckout(checkout);
        } else {
          this.createCheckout();
        }
      })
      .catch(error => this.setState({ status: ERROR, error }));
  };

  fetchProducts = () => {
    this.state.client.collection.fetchAllWithProducts().then((collections: LineageCollection[]) => {
      this.setState({
        collections: collections.map(collection => ({
          ...collection,
          products: collection.products.map(product => ({
            ...product,
            legacyID: this.getLegacyID(product),
            metafields: this.getMetafields(product),
          })),
        })),
        featuredCheckoutProduct: collections.find(collection => collection.handle === CART)
          .products[0],
        featuredHomeProduct: collections.find(collection => collection.handle === FRONTPAGE)
          .products[0],
      });
    });

    this.state.client.product.fetchAll().then((products: LineageProduct[]) => {
      this.setState({
        allProducts: products.map(product => ({
          ...product,
          legacyID: this.getLegacyID(product),
          metafields: this.getMetafields(product),
        })),
        subscriptionProducts: products
          .filter(product => product.productType.toLowerCase().indexOf('subscription') >= 0)
          .map(product => ({
            ...product,
            legacyID: this.getLegacyID(product),
            metafields: this.getMetafields(product),
          })),
      });
    });
  };

  getLegacyID = (product: LineageProduct[]) => {
    const foundProduct = this.props.metafields.find(
      ({ handle, title }) => handle === product.handle || title === product.title
    );
    return foundProduct ? foundProduct.id : null;
  };

  getLegacyVariantID = (lineItem: ShopifyLegacyLineItem, variantTitle: string) => {
    const foundProduct = this.props.metafields.find(
      ({ handle, title }) => handle === lineItem.handle || title === lineItem.title
    );

    const selectedVariant = foundProduct.variants.find(variant => variant.title === variantTitle);

    return selectedVariant ? selectedVariant.id : null;
  };

  getMetafields = (product: LineageProduct) => {
    const foundProduct = this.props.metafields.find(
      ({ handle, title }) => handle === product.handle || title === product.title
    );
    return foundProduct ? product.metafields : { c_f: {}, subscriptions: {} };
  };

  hasSubscription = (lineItems: ShopifyBuy.CheckoutResource[]) => {
    const items = lineItems || this.state.checkoutLineItems;

    return (
      items.findIndex(({ customAttributes }) =>
        customAttributes.some(({ key }) => key === 'subscription_id')
      ) >= 0
    );
  };

  removeLineItem = (id: string) => {
    this.state.client.checkout
      .removeLineItems(this.state.checkoutID, [id])
      .then(checkout => this.updateCheckout(checkout));
  };

  renewCart = () => localStorage.setItem('lineageCheckoutDate', Date.now());

  updateCheckout = (checkout: ShopifyBuy.CheckoutResource) => {
    this.setState({
      checkoutID: checkout.id,
      checkoutLineItems: checkout.lineItems,
      checkoutURL: checkout.webUrl,
    });
  };

  updateLineItem = (lineItem: { id: string; quantity: number }) => {
    const { id, quantity } = lineItem;
    this.state.client.checkout
      .updateLineItems(this.state.checkoutID, [{ id, quantity: parseInt(quantity) }])
      .then(checkout => this.updateCheckout(checkout));
  };

  render() {
    const {
      allProducts,
      checkoutLineItems,
      collections,
      featuredCheckoutProduct,
      featuredHomeProduct,
      privacyPolicy,
      status,
      subscriptionProducts,
    } = this.state;

    return (
      <Routes
        addLineItem={this.addLineItem}
        allProducts={allProducts}
        checkout={this.checkout}
        checkoutLineItems={checkoutLineItems}
        collections={collections}
        featuredCheckoutProduct={featuredCheckoutProduct}
        featuredHomeProduct={featuredHomeProduct}
        privacyPolicy={privacyPolicy}
        removeLineItem={this.removeLineItem}
        status={status}
        subscriptionProducts={subscriptionProducts}
        updateLineItem={this.updateLineItem}
      />
    );
  }
}

export default AppContainer;
