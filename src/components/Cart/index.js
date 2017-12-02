import React from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

import Meta from 'containers/Meta';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import CartZero from 'components/CartZero';
import FeaturedCartProduct from 'components/FeaturedCartProduct';
import Waves from 'components/Waves';

import Styled from './styles';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.keydown$ = Observable.fromEvent(window, 'keydown')
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

  getCheckoutUrl() {
    if (this.props.allProducts.find(product =>
      product.type.toLowerCase() === 'coffee subscription'
      && this.props.lineItems.map(({ attrs }) => attrs.product_id).indexOf(product.id) !== -1)) {
      // -> http://support.rechargepayments.com/article/91-recharge-integration-guide
      const cartToken = document.cookie.match('(^|; )cart=([^;]*)');
      return cartToken
        ? `https://checkout.rechargeapps.com/r/checkout?myshopify_domain=lineage-coffee-roasting.myshopify.com&cart_token=${cartToken[2]}`
        : 'https://www.lineageroasting.com/checkout';
    }
    return 'https://www.lineageroasting.com/checkout';
  }

  closeCart(e) {
    if (e) { e.preventDefault(); }

    if (this.props.history.action === 'PUSH') {
      this.props.history.goBack();
    } else {
      this.props.history.push('/collections/coffee');
    }
  }

  isShowing(nextProps = this.props) {
    return nextProps.location.pathname === '/cart';
  }

  render() {
    return (
      <div>
        {this.isShowing() &&
          <Meta title="Cart • Lineage Coffee Roasting" />
        }
        <Styled.Inner isShowing={this.isShowing()}>
          <Styled.Heading>
            Cart
            <Styled.Count empty={this.props.lineItems.length === 0}>
              {this.props.lineItems.length}
            </Styled.Count>
          </Styled.Heading>
          <Styled.Close href="/" onClick={e => this.closeCart(e)}>✕</Styled.Close>
          {this.props.isLoading &&
            <div>
              Loading…
            </div>
          }
          {this.props.isLoading === false &&
            <div>
              {this.props.lineItems.map(lineItem => (
                <CartItem
                  key={lineItem.id}
                  allProducts={this.props.allProducts}
                  lineItem={lineItem}
                  removeLineItem={this.props.removeLineItem}
                  updateLineItem={this.props.updateLineItem}
                />
              ))}
              {this.props.lineItems.length === 0 && <CartZero />}
            </div>
          }
          {this.props.featuredCartProduct &&
            <FeaturedCartProduct product={this.props.featuredCartProduct} />
          }
          <Styled.Actions>
            <Styled.WaveContainer>
              <Waves width="55%" />
              <Button
                href={this.getCheckoutUrl()}
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
        <Styled.Overlay isShowing={this.isShowing()} onClick={e => this.closeCart(e)} />
      </div>
    );
  }
}

Cart.defaultProps = {
  featuredCartProduct: undefined,
  lineItems: [],
};

Cart.propTypes = {
  allProducts: PropTypes.array.isRequired,
  featuredCartProduct: PropTypes.object,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  lineItems: PropTypes.array,
  location: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

export default Cart;
