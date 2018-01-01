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
      client: Client.buildClient({
        appId: "6", // '6' is for JS Buy Button (this app)
        storefrontAccessToken,
        domain
      }),
      collections: [],
      privacyPolicy: undefined,
      webUrl: `https://${domain}/checkout`
    };

    this.addLineItem = this.addLineItem.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.getCheckout = this.getCheckout.bind(this);
    this.getFeaturedCheckoutProduct = this.getFeaturedCheckoutProduct.bind(
      this
    );
    this.getFeaturedHomeProduct = this.getFeaturedHomeProduct.bind(this);
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

  getFeaturedCheckoutProduct() {
    if (!this.state.collections.length) return undefined;

    return this.state.collections.find(
      collection => collection.handle === "cart"
    ).products[0];
  }

  getFeaturedHomeProduct() {
    if (!this.state.collections.length) return undefined;

    return this.state.collections.find(
      collection => collection.handle === "frontpage"
    ).products[0];
  }

  getPrivacyPolicy() {
    this.state.client.shop
      .fetchPolicies()
      .then(policies =>
        this.setState({ privacyPolicy: policies.privacyPolicy })
      );
  }

  getSubscriptionProducts() {
    if (this.state.allProducts.length <= 0) return undefined;

    return this.state.allProducts.filter(
      product => product.productType.toLowerCase().indexOf("subscription") >= 0
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
      return metafields ? metafields.metafields : {};
    };

    this.state.client.collection.fetchAllWithProducts().then(collections => {
      this.setState({
        collections: collections.map(collection => ({
          ...collection,
          products: collection.products.map(product => ({
            ...product,
            metafields: getMetafields(product.handle)
          }))
        }))
      });
    });

    this.state.client.product.fetchAll().then(products => {
      this.setState({
        allProducts: products.map(product => ({
          ...product,
          metafields: getMetafields(product.handle)
        }))
      });
    });
  }

  removeLineItem(id) {
    this.state.client.checkout
      .removeLineItems(this.state.checkoutID, [id])
      .then(checkout => this.updateCheckout(checkout));
  }

  updateCheckout(checkout) {
    this.setState({
      checkoutID: checkout.id,
      checkoutLineItems: checkout.lineItems,
      webUrl: checkout.webUrl
    });
  }

  updateLineItem({ id, quantity }) {
    this.state.client.checkout
      .updateLineItems(this.state.checkoutID, [{ id, quantity }])
      .then(checkout => this.updateCheckout(checkout));
  }

  render() {
    return (
      <App
        addLineItem={this.addLineItem}
        allProducts={this.state.allProducts}
        checkoutLineItems={this.state.checkoutLineItems}
        collections={this.state.collections}
        collections={this.state.collections}
        featuredCheckoutProduct={this.getFeaturedCheckoutProduct()}
        featuredHomeProduct={this.getFeaturedHomeProduct()}
        privacyPolicy={this.state.privacyPolicy}
        removeLineItem={this.removeLineItem}
        subscriptionProducts={this.getSubscriptionProducts()}
        updateLineItem={this.updateLineItem}
        webUrl={this.state.webUrl}
      />
    );
  }
}

export default AppContainer;
