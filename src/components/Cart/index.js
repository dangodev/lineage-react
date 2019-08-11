import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

import Meta from 'containers/Meta';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import CartZero from 'components/CartZero';
import FeaturedCartProduct from 'components/FeaturedCartProduct';
import Waves from 'components/Waves';

import * as Styled from './styles';

class Cart extends React.Component {
  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.keydown$ = Observable.fromEvent(window, 'keydown')
        .throttleTime(16)
        .subscribe(e => this.keydownHandler(e));
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.isShowing(nextProps)) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  componentWillUnmount() {
    if (this.keydown$) {
      this.keydown$.unsubscribe();
    }
  }

  state = { isLoading: false };

  keydownHandler = e => {
    if (this.isShowing() && e.keyCode === 27) {
      this.closeCart();
    }
  };

  fetchAdditionalInfo = lineItem => {
    const product = this.props.allProducts.find(product => product.title === lineItem.title);
    if (!product) {
      return {
        ...lineItem,
        images: [{ src: '' }],
        metafields: {},
        productType: '',
        tags: [],
      };
    }
    return {
      ...lineItem,
      images: product.images,
      metafields: product.metafields,
      productType: product.productType,
      tags: product.tags,
    };
  };

  buttonHandler = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (this.props.checkout() === false) {
      this.setState({ isLoading: false });
    }
  };

  closeCart = e => {
    if (e) {
      e.preventDefault();
    }

    if (this.props.history.action === 'PUSH') {
      this.props.history.goBack();
    } else {
      this.props.history.push('/collections/coffee');
    }
  };

  isShowing = (nextProps = this.props) => nextProps.location.pathname === '/cart';

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
            <FeaturedCartProduct product={this.props.featuredProduct} />
          )}
          <Styled.Actions>
            <Styled.WaveContainer>
              <Waves width="55%" />
              <Button
                href={this.props.checkoutURL}
                rel="noopener noreferrer"
                disabled={this.props.lineItems.length === 0 || this.state.isLoading}
                onClick={this.buttonHandler}
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
  allProducts: [],
  checkoutURL: '',
  lineItems: [],
  featuredProduct: undefined,
};

Cart.propTypes = {
  allProducts: PropTypes.array,
  checkout: PropTypes.func.isRequired,
  checkoutURL: PropTypes.string,
  featuredProduct: PropTypes.object,
  history: PropTypes.object.isRequired,
  lineItems: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

export default withRouter(Cart);
