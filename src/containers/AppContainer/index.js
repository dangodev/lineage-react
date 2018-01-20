import React from "react";
import PropTypes from "prop-types";
import Client from "shopify-buy";
import axios from "axios";

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
      featuredCheckoutProduct: undefined,
      featuredHomeProduct: undefined,
      privacyPolicy: undefined,
      rechargeURL: undefined,
      shopifyURL: `https://${domain}/checkout`,
      subscriptionProducts: []
    };

    this.addLineItem = this.addLineItem.bind(this);
    this.checkout = this.checkout.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.getCheckout = this.getCheckout.bind(this);
    this.getLegacyID = this.getLegacyID.bind(this);
    this.getMetafields = this.getMetafields.bind(this);
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
    this.renewCart();
    this.state.client.checkout
      .addLineItems(this.state.checkoutID, [
        { variantId, quantity: parseInt(quantity), customAttributes }
      ])
      .then(
        checkout => {
          this.updateCheckout(checkout);
        },
        error => console.log(error)
      );
  }

  // Some nasty ReCharge legacy code mumbo jumbo going on here
  checkout() {
    this.setState({ isLoading: true });

    if (this.state.checkoutLineItems.length === 0) return false;

    if (this.hasSubscription(this.state.checkoutLineItems) === false) {
      this.expireCart();
      return (window.location = this.state.shopifyURL);
    }

    const getCookie = name =>
      (document.cookie.match("(^|; )" + name + "=([^;]*)") || 0)[2];

    const getLegacyCart = (clearCart = false) =>
      axios.get("/cart.js").then(result => {
        if (clearCart) {
          let updates = {};
          result.data.items.forEach(lineItem => (updates[lineItem.id] = 0));
          axios
            .post("/cart/update.js", { updates })
            .then(() =>
              this.state.checkoutLineItems.forEach(lineItem =>
                addToLegacyCart(lineItem)
              )
            );
        } else if (
          result.data.item_count === this.state.checkoutLineItems.length
        ) {
          this.expireCart();
          redirectToRecharge();
        }
      });

    const addToLegacyCart = lineItem => {
      const properties = {};
      lineItem.customAttributes.forEach(attribute => {
        properties[attribute.key] = attribute.value;
      });

      axios
        .post("/cart/add.js", {
          quantity: lineItem.quantity,
          id: this.getLegacyVariantID(lineItem, lineItem.variant.title),
          properties
        })
        .then(() => {
          const cartToken = getCookie("cart");
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
    const lastUpdated = parseInt(
      window.localStorage.getItem("lineageCheckoutDate"),
      10
    );
    const threeDays = 259200000;

    if (
      checkoutID &&
      lastUpdated &&
      lastUpdated > Math.floor(Date.now() - threeDays)
    ) {
      this.renewCart();
      return this.fetchCheckout(checkoutID);
    }
    this.renewCart();
    return this.createCheckout();
  }

  getPrivacyPolicy() {
    this.state.client.shop
      .fetchPolicies()
      .then(policies =>
        this.setState({ privacyPolicy: policies.privacyPolicy })
      );
  }

  expireCart() {
    // Don’t expire directly, expire in 5 min, as their cart will be gone if
    // they go back to add something
    const almostThreeDays = 258900000;
    window.localStorage.setItem(
      "lineageCheckoutDate",
      Date.now() - almostThreeDays
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
    this.state.client.collection.fetchAllWithProducts().then(collections => {
      this.setState({
        collections: collections.map(collection => ({
          ...collection,
          products: collection.products.map(product => ({
            ...product,
            legacyID: this.getLegacyID(product),
            metafields: this.getMetafields(product)
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
          legacyID: this.getLegacyID(product),
          metafields: this.getMetafields(product)
        })),
        subscriptionProducts: products
          .filter(
            product =>
              product.productType.toLowerCase().indexOf("subscription") >= 0
          )
          .map(product => ({
            ...product,
            legacyID: this.getLegacyID(product),
            metafields: this.getMetafields(product)
          }))
      });
    });
  }

  getLegacyID(lineItem) {
    const product =
      this.props.metafields.find(
        metafield => metafield.handle === lineItem.handle
      ) ||
      this.props.metafields.find(
        metafield => metafield.title === lineItem.title
      );
    return product ? product.id : null;
  }

  getLegacyVariantID(lineItem, variantTitle) {
    const product =
      this.props.metafields.find(
        metafield => metafield.handle === lineItem.handle
      ) ||
      this.props.metafields.find(
        metafield => metafield.title === lineItem.title
      );

    const selectedVariant = product.variants.find(
      variant => variant.title === variantTitle
    );

    return selectedVariant ? selectedVariant.id : null;
  }

  getMetafields(lineItem) {
    const product =
      this.props.metafields.find(
        metafield => metafield.handle === lineItem.handle
      ) ||
      this.props.metafields.find(
        metafield => metafield.title === lineItem.title
      );
    return product ? product.metafields : { c_f: {}, subscriptions: {} };
  }

  hasSubscription(lineItems = this.state.checkoutLineItems) {
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

  renewCart() {
    window.localStorage.setItem("lineageCheckoutDate", Date.now());
  }

  updateCheckout(checkout) {
    const shopifyURL = checkout.webUrl;
    this.setState({
      checkoutID: checkout.id,
      checkoutLineItems: checkout.lineItems,
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
