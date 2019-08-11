import React from 'react';
import Client from 'shopify-buy';
import axios, { AxiosResponse } from 'axios';

import App from 'components/App';

const storefrontAccessToken = '8b97d4f794c051c78b3f00e8da03ef19'; // Read-only. It’s cool if it’s in the client JS.
const domain = 'lineage-coffee-roasting.myshopify.com';

interface AppContainerProps {
  metafields: ShopifyCustom.ProductMetadata[];
}

interface AppContainerState {
  allProducts: ShopifyCustom.Product[];
  checkoutID?: string;
  checkoutLineItems: ShopifyBuy.LineItem[];
  client: ShopifyBuy.Client;
  collections: ShopifyCustom.CollectionWithProducts[];
  featuredCheckoutProduct?: ShopifyCustom.Product;
  featuredHomeProduct?: ShopifyCustom.Product;
  isLoading: boolean;
  privacyPolicy?: string;
  rechargeURL?: string;
  shopifyURL: string;
  subscriptionProducts: ShopifyCustom.Product[];
}

/**
 * There seems like a lot going on at first glance here, but AppContainer is
 * the only component that talks to Shopify. In that regards it’s easy to
 * follow.
 *
 * Before you refactor any of this, I’d recommend profiling the current site
 * and see what the benchmarks are (hint: it’s really fast). Please don’t
 * refactor at the cost of performance and the user experience!
 *
 * — Drew
 */
class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
  componentDidMount() {
    this.getCheckout();
    this.fetchProducts();
    this.getPrivacyPolicy();
    setInterval(() => this.getCheckout(), 30000);
  }

  state: AppContainerState = {
    allProducts: [],
    checkoutLineItems: [],
    client: Client.buildClient({ domain, storefrontAccessToken }),
    collections: [],
    isLoading: true,
    shopifyURL: `https://${domain}/checkout`,
    subscriptionProducts: [],
  };

  // Add new item to cart
  addLineItem = (lineItem: ShopifyBuy.AttributeInput) => {
    this.renewCart();
    const { client, checkoutID } = this.state;

    if (!checkoutID) {
      return;
    }
    // note: the “as“ is fixing a bug in the types. It’s really, really supposed to be AttributeInput.
    client.checkout.addLineItems(checkoutID, [lineItem as ShopifyBuy.LineItem]).then(
      (cart: ShopifyBuy.Cart) => {
        this.updateCheckout(cart);
      },
      (error: Error) => console.log(error)
    );
  };

  // Finalize order
  // Some nasty ReCharge legacy code mumbo jumbo going on here
  checkout = (): boolean => {
    this.setState({ isLoading: true });

    if (this.state.checkoutLineItems.length === 0) {
      return false;
    }

    if (this.hasSubscription(this.state.checkoutLineItems) === false) {
      this.expireCart();
      window.location.href = this.state.shopifyURL;
      return true;
    }

    const getCookie = (name: string) => {
      const match = document.cookie.match('(^|; )' + name + '=([^;]*)');
      return match ? match[2] : undefined;
    };

    // Used for ReCharge
    const getLegacyCart = (clearCart = false) =>
      axios.get('/cart.js').then((result: AxiosResponse<ShopifyLegacy.Cart>) => {
        if (clearCart) {
          let updates: ShopifyLegacy.CartUpdate = {};
          result.data.lineItems.forEach(lineItem => (updates[lineItem.id] = 0));
          axios.post('/cart/update.js', { updates }).then(() =>
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            this.state.checkoutLineItems.forEach(lineItem => addToLegacyCart(lineItem))
          );
        } else if (result.data.lineItemCount === this.state.checkoutLineItems.length) {
          this.expireCart();
          redirectToRecharge(); // eslint-disable-line @typescript-eslint/no-use-before-define
        }
      });

    const addToLegacyCart = (lineItem: ShopifyBuy.LineItem) => {
      const properties: { [key: string]: string } = {};
      lineItem.customAttributes.forEach((attribute: ShopifyLegacy.CustomAttribute) => {
        properties[attribute.key] = attribute.value;
      });

      axios
        .post('/cart/add.js', {
          quantity: lineItem.quantity,
          id: this.getLegacyVariantID(lineItem, lineItem.variant_title),
          properties,
        })
        .then(() => {
          const cartToken = getCookie('cart');
          if (!cartToken) {
            return;
          }
          const search = new URLSearchParams({
            cart_token: cartToken,
            myshopify_domain: domain,
          }).toString();
          const rechargeURL = `https://checkout.rechargeapps.com/r/checkout?${search}`;
          if (cartToken && this.state.rechargeURL !== rechargeURL) {
            this.setState({ rechargeURL });
          }
          getLegacyCart();
        });
    };

    const redirectToRecharge = () => {
      if (this.state.rechargeURL) {
        window.location.href = this.state.rechargeURL;
      }
    };

    getLegacyCart(true);
    return true;
  };

  // create new cart
  createCheckout = () => {
    this.setState({ isLoading: true });
    this.state.client.checkout.create().then(checkout => {
      this.setState({ isLoading: false });
      if (checkout) {
        this.updateCheckout(checkout);
        localStorage.setItem('lineageCheckout', checkout.id as string);
      } else {
        setTimeout(() => this.getCheckout(), 1000); // If failed, try again
      }
    });
  };

  // retrieve user’s existing cart
  getCheckout = () => {
    const checkoutID = localStorage.getItem('lineageCheckout');
    const lastUpdated = parseInt(
      localStorage.getItem('lineageCheckoutDate') || `${Date.now()}`,
      10
    );
    const threeDays = 259200000;

    if (checkoutID && lastUpdated && lastUpdated > Math.floor(Date.now() - threeDays)) {
      this.renewCart();
      return this.fetchCheckout(checkoutID);
    }
    this.renewCart();
    return this.createCheckout();
  };

  // get privacy policy statement
  getPrivacyPolicy = () =>
    this.state.client.shop.fetchPolicies().then(({ privacyPolicy }) =>
      this.setState({
        privacyPolicy: `<p>${privacyPolicy.body
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n/g, '<br />')}</p>`,
      })
    );

  // invalidate cart
  expireCart = () => {
    // Don’t expire directly, expire in 5 min, as their cart will be gone if
    // they go back to add something
    const almostThreeDays = 258900000;
    localStorage.setItem('lineageCheckoutDate', `${Date.now() - almostThreeDays}`);
  };

  // Check to see if user has an existing cart
  fetchCheckout = (checkoutID: string) => {
    this.setState({ isLoading: true });
    this.state.client.checkout.fetch(checkoutID).then(checkout => {
      this.setState({ isLoading: false });
      if (checkout) {
        this.updateCheckout(checkout);
      } else {
        this.createCheckout();
      }
    });
  };

  // Fetch all collections & products
  fetchProducts = () => {
    this.state.client.collection
      .fetchAllWithProducts()
      .then((collections: ShopifyBuy.CollectionWithProducts[]) => {
        const cartCollection = collections.find(collection => collection.handle === 'cart');
        const homeCollection = collections.find(collection => collection.handle === 'frontpage');

        this.setState({
          collections: collections.map(collection => ({
            ...collection,
            products:
              collection.products &&
              collection.products.map(product => this.expandProduct(product)),
          })),
          featuredCheckoutProduct:
            cartCollection && cartCollection.products
              ? this.expandProduct(cartCollection.products[0])
              : undefined,
          featuredHomeProduct:
            homeCollection && homeCollection.products
              ? this.expandProduct(homeCollection.products[0])
              : undefined,
        });
      });

    this.state.client.product.fetchAll().then(products => {
      this.setState({
        allProducts: products.map(product => this.expandProduct(product)),
        subscriptionProducts: products
          .filter(product => product.productType.toLowerCase().indexOf('subscription') >= 0)
          .map(product => this.expandProduct(product)),
      });
    });
  };

  // Add metafields & legacyID from Liquid templating
  expandProduct = (product: ShopifyBuy.Product): ShopifyCustom.Product => {
    if (!product) {
      return product;
    }

    const legacyProduct = this.props.metafields.find(
      ({ handle, title }) => handle === product.handle || title === product.title
    );

    return {
      ...product,
      legacyID: legacyProduct ? legacyProduct.id : '', // this is needed because ShopifyBuy uses completely different IDs. We need the classic IDs for ReCharge
      metafields: legacyProduct ? legacyProduct.metafields : { c_f: {}, subscriptions: {} }, // metafields only accessible via Liquid Templating
    };
  };

  getLegacyVariantID = (
    lineItem: ShopifyBuy.LineItem,
    variantTitle: string
  ): string | undefined => {
    const product = this.props.metafields.find(
      ({ handle, title }) => handle === lineItem.handle || title === lineItem.title
    );
    if (!product) {
      return undefined;
    }
    const selectedVariant = product.variants.find(({ title }) => title === variantTitle);
    return selectedVariant ? selectedVariant.id : undefined;
  };

  hasSubscription = (lineItems = this.state.checkoutLineItems) =>
    lineItems.findIndex(
      lineItem =>
        lineItem.customAttributes.findIndex(
          (attr: ShopifyLegacy.CustomAttribute) => attr.key === 'subscription_id'
        ) >= 0
    ) >= 0;

  removeLineItem = (id: number | string) => {
    if (!this.state.checkoutID) {
      return;
    }
    this.state.client.checkout
      .removeLineItems(this.state.checkoutID, [`${id}`])
      .then(checkout => this.updateCheckout(checkout));
  };

  renewCart = () => {
    localStorage.setItem('lineageCheckoutDate', `${Date.now()}`);
  };

  updateCheckout = (checkout: ShopifyBuy.Cart) => {
    const shopifyURL = checkout.checkoutUrl;
    this.setState({
      checkoutID: checkout.id as string,
      checkoutLineItems: checkout.lineItems,
      shopifyURL,
    });
  };

  updateLineItem = (input: ShopifyBuy.AttributeInput) => {
    if (!this.state.checkoutID) {
      return;
    }

    this.state.client.checkout
      .updateLineItem(this.state.checkoutID, [input])
      .then(checkout => this.updateCheckout(checkout));
  };

  render() {
    return (
      <App
        addLineItem={this.addLineItem}
        allProducts={this.state.allProducts}
        checkout={this.checkout}
        checkoutLineItems={this.state.checkoutLineItems}
        collections={this.state.collections}
        featuredCheckoutProduct={this.state.featuredCheckoutProduct}
        featuredHomeProduct={this.state.featuredHomeProduct}
        isLoading={this.state.isLoading}
        privacyPolicy={this.state.privacyPolicy}
        removeLineItem={this.removeLineItem}
        subscriptionProducts={this.state.subscriptionProducts}
        updateLineItem={this.updateLineItem}
      />
    );
  }
}

export default AppContainer;
