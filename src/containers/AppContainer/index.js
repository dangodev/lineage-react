import React from "react";
import PropTypes from "prop-types";
import Client from "shopify-buy";

import App from "components/App";

const storefrontAccessToken = "8b97d4f794c051c78b3f00e8da03ef19"; // Read-only. It’s cool if it’s in the client JS.
const domain = "lineage-coffee-roasting.myshopify.com";

class AppContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
      checkout: undefined,
      checkoutLineItems: [],
      checkoutURL: `https://${domain}/checkout`,
      client: Client.buildClient({
        appId: "6", // '6' is for JS Buy Button (this app)
        storefrontAccessToken,
        domain
      }),
      collections: [],
      featuredCheckoutProduct: undefined,
      featuredHomeProduct: undefined,
      privacyPolicy: undefined,
      rechargeURL: undefined,
      shopifyURL: `https://${domain}/checkout`,
      subscriptionProducts: []
    };

    this.addLineItem = this.addLineItem.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.getCheckout = this.getCheckout.bind(this);
    this.getPrivacyPolicy = this.getPrivacyPolicy.bind(this);
    this.removeLineItem = this.removeLineItem.bind(this);
    this.updateLineItem = this.updateLineItem.bind(this);
  }

  componentWillMount() {
    this.getCheckout();
    this.fetchProducts();
    this.getPrivacyPolicy();
  }

  componentDidMount() {
    setInterval(() => this.getCheckout(), 30000);
  }

  addLineItem({ variantId, quantity, customAttributes = undefined }) {
    this.state.client.checkout
      .addLineItems(this.state.checkoutID, [
        { variantId, quantity, customAttributes }
      ])
      .then(
        checkout => {
          this.updateCheckout(checkout);
        },
        error => console.log(error)
      );
  }

  createCheckout() {
    this.setState({ isLoading: true });
    this.state.client.checkout.create().then(checkout => {
      this.setState({ isLoading: false });
      if (checkout) {
        this.updateCheckout(checkout);
        window.localStorage.setItem("lineageCheckout", checkout.id);
      } else {
        setTimeout(() => this.getCheckout(), 1000); // If failed, try again
      }
    });
  }

  getCheckout() {
    const checkoutID = window.localStorage.getItem("lineageCheckout");

    if (checkoutID) {
      return this.fetchCheckout(checkoutID);
    }
    return this.createCheckout();
  }

  getPrivacyPolicy() {
    this.state.client.shop
      .fetchPolicies()
      .then(policies =>
        this.setState({ privacyPolicy: policies.privacyPolicy })
      );
  }

  fetchCheckout(checkoutID) {
    this.setState({ isLoading: true });
    this.state.client.checkout.fetch(checkoutID).then(checkout => {
      this.setState({ isLoading: false });
      if (checkout) {
        this.updateCheckout(checkout);
      } else {
        this.createCheckout();
      }
    });
  }

  fetchProducts() {
    const getMetafields = handle => {
      const metafields = this.props.metafields.find(
        metafield => metafield.handle === handle
      );
      return metafields
        ? metafields.metafields
        : { c_f: {}, subscriptions: {} };
    };

    this.state.client.collection.fetchAllWithProducts().then(collections => {
      this.setState({
        collections: collections.map(collection => ({
          ...collection,
          products: collection.products.map(product => ({
            ...product,
            metafields: getMetafields(product.handle)
          }))
        })),
        featuredCheckoutProduct: collections.find(
          collection => collection.handle === "cart"
        ).products[0],
        featuredHomeProduct: collections.find(
          collection => collection.handle === "frontpage"
        ).products[0]
      });
    });

    this.state.client.product.fetchAll().then(products => {
      this.setState({
        allProducts: products.map(product => ({
          ...product,
          metafields: getMetafields(product.handle)
        })),
        subscriptionProducts: products
          .filter(
            product =>
              product.productType.toLowerCase().indexOf("subscription") >= 0
          )
          .map(product => ({
            ...product,
            metafields: getMetafields(product.handle)
          }))
      });
    });
  }

  hasSubscription(lineItems) {
    return (
      lineItems.findIndex(
        lineItem =>
          lineItem.customAttributes.findIndex(
            attr => attr.key === "subscription_id"
          ) >= 0
      ) >= 0
    );
  }

  removeLineItem(id) {
    this.state.client.checkout
      .removeLineItems(this.state.checkoutID, [id])
      .then(checkout => this.updateCheckout(checkout));
  }

  updateCheckout(checkout) {
    console.log(checkout);
    const shopifyURL = checkout.webUrl;
    const cartToken = shopifyURL.split("?key=")[1];
    const rechargeURL = `https://checkout.rechargeapps.com/r/checkout?myshopify_domain=${domain}&cart_token=${cartToken}`;
    this.setState({
      checkoutID: checkout.id,
      checkoutLineItems: checkout.lineItems,
      checkoutURL: this.hasSubscription(checkout.lineItems)
        ? rechargeURL
        : shopifyURL,
      rechargeURL,
      shopifyURL
    });
  }

  updateLineItem({ id, quantity }) {
    this.state.client.checkout
      .updateLineItems(this.state.checkoutID, [
        { id, quantity: parseInt(quantity) }
      ])
      .then(checkout => this.updateCheckout(checkout));
  }

  render() {
    return (
      <App
        addLineItem={this.addLineItem}
        allProducts={this.state.allProducts}
        checkoutLineItems={this.state.checkoutLineItems}
        checkoutURL={this.state.checkoutURL}
        collections={this.state.collections}
        featuredCheckoutProduct={this.state.featuredCheckoutProduct}
        featuredHomeProduct={this.state.featuredHomeProduct}
        privacyPolicy={this.state.privacyPolicy}
        removeLineItem={this.removeLineItem}
        subscriptionProducts={this.state.subscriptionProducts}
        updateLineItem={this.updateLineItem}
      />
    );
  }
}

export default AppContainer;
