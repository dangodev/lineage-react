import * as React from 'react';
import { navigate } from '@reach/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';
import * as queryString from 'query-string';
import Meta from 'containers/Meta';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import CartZero from 'components/CartZero';
import FeaturedCartProduct from 'components/FeaturedCartProduct';
import Waves from 'components/Waves';
import { COLLECTION, getCollection, getPage, getProduct } from 'lib/routes';
import * as Styled from './styles';

const READY = 'READY';
const LOADING = 'LOADING';

class Cart extends React.Component {
  state = { status: READY };

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.keydown$ = Observable.fromEvent(window, 'keydown')
        .throttleTime(16)
        .subscribe(e => this.keydownHandler(e));
    }
  }

  componentWillReceiveProps(nextProps: any) {
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

  get collection() {
    return queryString.parse(this.props.location.search).collection;
  }

  get page() {
    return queryString.parse(this.props.location.search).page;
  }

  get product() {
    return queryString.parse(this.props.location.search).product;
  }

  keydownHandler = e => {
    if (this.isShowing() && e.keyCode === 27) {
      this.closeCart();
    }
  };

  fetchAdditionalInfo = lineItem => {
    const product = this.props.allProducts.find(product => product.title === lineItem.title);
    if (!product)
      return {
        ...lineItem,
        images: [{ src: '' }],
        metafields: {},
        productType: '',
        tags: [],
      };
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
    this.setState({ status: LOADING });
    if (this.props.checkout() === false) {
      this.setState({ status: READY });
    }
  };

  closeCart = e => {
    if (e) {
      e.preventDefault();
    }

    if (this.collection) {
      navigate(getCollection(this.collection{, { replace: true });
    } else if (this.product) {
      navigate(getProduct(this.product), { replace: true });
    } else if (this.page) {
      navigate(getPage(this.page), { replace: true });
    } else {
      navigate(COLLECTION.coffee);
    }
  };

  render() {
    const { checkoutURL, featuredProduct, lineItems, removeLineItem, updateLineItem } = this.props;
    const { status } = this.state;

    return (
      <div>
        <Meta title="Cart • Lineage Coffee Roasting" />
        <Styled.Inner isShowing={true}>
          <Styled.Heading>
            Cart
            <Styled.Count empty={lineItems.length === 0}>{lineItems.length}</Styled.Count>
          </Styled.Heading>
          <Styled.Close href="/" onClick={e => this.closeCart(e)}>
            ✕
          </Styled.Close>
          {status === LOADING && <div>Loading…</div>}
          {status === READY && (
            <div>
              {lineItems.map(lineItem => (
                <CartItem
                  key={lineItem.id}
                  lineItem={this.fetchAdditionalInfo(lineItem)}
                  removeLineItem={removeLineItem}
                  updateLineItem={updateLineItem}
                />
              ))}
              {lineItems.length === 0 && <CartZero />}
            </div>
          )}
          {featuredProduct && <FeaturedCheckoutProduct product={featuredProduct} />}
          <Styled.Actions>
            <Styled.WaveContainer>
              <Waves width="55%" />
              <Button
                href={checkoutURL}
                rel="noopener noreferrer"
                disabled={lineItems.length === 0 || status === LOADING}
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
        <Styled.Overlay isShowing={true} onClick={e => this.closeCart(e)} />
      </div>
    );
  }
}

Cart.defaultProps = {
  allProducts: [],
  featuredProduct: undefined,
  lineItems: [],
};

export default Cart;
