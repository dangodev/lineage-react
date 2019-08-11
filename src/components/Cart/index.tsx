import React, { SyntheticEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Meta from 'containers/Meta';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import CartZero from 'components/CartZero';
import FeaturedCartProduct from 'components/FeaturedCartProduct';
import Waves from 'components/Waves';

import * as Styled from './styles';

interface CartProps extends RouteComponentProps {
  allProducts: ShopifyCustom.Product[];
  checkout: () => boolean;
  checkoutURL?: string;
  featuredProduct?: ShopifyCustom.Product;
  lineItems: ShopifyBuy.LineItem[];
  isLoading: boolean;
  removeLineItem: (id: number | string) => void;
  updateLineItem: (input: ShopifyBuy.AttributeInput) => void;
}

interface CartState {
  isUpdating: boolean;
}

class Cart extends React.Component<CartProps> {
  static defaultProps = {
    allProducts: [],
    checkoutURL: '',
    lineItems: [],
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.keydownHandler);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: CartProps) {
    if (this.isShowing(nextProps)) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  state: CartState = { isUpdating: false };

  keydownHandler = (e: KeyboardEvent) => {
    if (this.isShowing() && e.keyCode === 27) {
      this.closeCart();
    }
  };

  fetchAdditionalInfo = (lineItem: ShopifyBuy.LineItem): ShopifyCustom.LineItem => {
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

  buttonHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({ isUpdating: true });
    if (this.props.checkout() === false) {
      this.setState({ isUpdating: false });
    }
  };

  closeCart = (e?: SyntheticEvent) => {
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
    const {
      checkoutURL,
      featuredProduct,
      isLoading,
      lineItems,
      removeLineItem,
      updateLineItem,
    } = this.props;
    const { isUpdating } = this.state;

    return (
      <div>
        {this.isShowing() && <Meta title="Cart • Lineage Coffee Roasting" />}
        <Styled.Inner isShowing={this.isShowing()}>
          <Styled.Heading>
            Cart
            <Styled.Count empty={lineItems.length === 0}>{lineItems.length}</Styled.Count>
          </Styled.Heading>
          <Styled.Close href="/" onClick={e => this.closeCart(e)}>
            ✕
          </Styled.Close>
          {isLoading && <div>Loading…</div>}
          {isLoading === false && (
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
          {featuredProduct && <FeaturedCartProduct product={featuredProduct} />}
          <Styled.Actions>
            <Styled.WaveContainer>
              <Waves width="55%" />
              <Button
                disabled={lineItems.length === 0 || isUpdating}
                href={checkoutURL}
                onClick={this.buttonHandler}
                rel="noopener noreferrer"
              >
                Check Out
              </Button>
            </Styled.WaveContainer>
            <Styled.ShopButton href="/" onClick={this.closeCart}>
              Keep Shopping
            </Styled.ShopButton>
          </Styled.Actions>
        </Styled.Inner>
        <Styled.Overlay isShowing={this.isShowing()} onClick={this.closeCart} />
      </div>
    );
  }
}

export default withRouter(Cart);
