import React from "react";
import PropTypes from "prop-types";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/throttleTime";

import Meta from "containers/Meta";
import Button from "components/Button";
import CartItem from "components/CartItem";
import CartZero from "components/CartZero";
import FeaturedCartProduct from "components/FeaturedCartProduct";
import Waves from "components/Waves";

import Styled from "./styles";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.fetchAdditionalInfo = this.fetchAdditionalInfo.bind(this);
  }

  componentWillMount() {
    if (typeof window !== "undefined") {
      this.keydown$ = Observable.fromEvent(window, "keydown")
        .throttleTime(16)
        .subscribe(e => this.keydownHandler(e));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isShowing(nextProps)) {
      document.body.classList.add(Styled.state.isScrollLocked);
    } else {
      document.body.classList.remove(Styled.state.isScrollLocked);
    }
  }

  componentWillUnmount() {
    if (this.keydown$) {
      this.keydown$.unsubscribe();
    }
  }

  keydownHandler(e) {
    if (this.isShowing() && e.keyCode === 27) {
      this.closeCart();
    }
  }

  fetchAdditionalInfo(lineItem) {
    const product = this.props.allProducts.find(
      product => product.title === lineItem.title
    );
    if (!product)
      return {
        ...lineItem,
        images: [{ src: "" }],
        metafields: {},
        productType: "",
        tags: []
      };
    return {
      ...lineItem,
      images: product.images,
      metafields: product.metafields,
      productType: product.productType,
      tags: product.tags
    };
  }

  closeCart(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.props.history.action === "PUSH") {
      this.props.history.goBack();
    } else {
      this.props.history.push("/collections/coffee");
    }
  }

  isShowing(nextProps = this.props) {
    return nextProps.location.pathname === "/cart";
  }

  render() {
    return (
      <div>
        {this.isShowing() && <Meta title="Cart • Lineage Coffee Roasting" />}
        <Styled.Inner isShowing={this.isShowing()}>
          <Styled.Heading>
            Cart
            <Styled.Count empty={this.props.lineItems.length === 0}>
              {this.props.lineItems.length}
            </Styled.Count>
          </Styled.Heading>
          <Styled.Close href="/" onClick={e => this.closeCart(e)}>
            ✕
          </Styled.Close>
          {this.props.isLoading && <div>Loading…</div>}
          {this.props.isLoading === false && (
            <div>
              {this.props.lineItems.map(lineItem => (
                <CartItem
                  key={lineItem.id}
                  lineItem={this.fetchAdditionalInfo(lineItem)}
                  removeLineItem={this.props.removeLineItem}
                  updateLineItem={this.props.updateLineItem}
                />
              ))}
              {this.props.lineItems.length === 0 && <CartZero />}
            </div>
          )}
          {this.props.featuredProduct && (
            <FeaturedCheckoutProduct product={this.props.featuredProduct} />
          )}
          <Styled.Actions>
            <Styled.WaveContainer>
              <Waves width="55%" />
              <Button
                href={this.props.checkoutURL}
                rel="noopener noreferrer"
                disabled={this.props.lineItems.length === 0}
              >
                Check Out
              </Button>
            </Styled.WaveContainer>
            <Styled.ShopButton href="/" onClick={e => this.closeCart(e)}>
              Keep Shopping
            </Styled.ShopButton>
          </Styled.Actions>
        </Styled.Inner>
        <Styled.Overlay
          isShowing={this.isShowing()}
          onClick={e => this.closeCart(e)}
        />
      </div>
    );
  }
}

Cart.defaultProps = {
  allProducts: [],
  lineItems: [],
  featuredProduct: undefined,
  webUrl: "/checkout"
};

Cart.propTypes = {
  allProducts: PropTypes.array,
  lineItems: PropTypes.array,
  featuredProduct: PropTypes.object,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
  webUrl: PropTypes.string
};

export default Cart;
