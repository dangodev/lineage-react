/**
 * Product Container
 * @param {array} coffeeProducts
 * @param {array} gearProducts
 */

import React from 'react';
import PropTypes from 'prop-types';

import ProductList from '../components/ProductList';
import ProductView from '../components/ProductView';

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      products: [],
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.location.pathname === '/cart') {
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps) {
    if ( this.props.location.pathname === nextProps.location.pathname
      && this.props.coffeeProducts.length === nextProps.coffeeProducts.length
      && this.props.gearProducts.length === nextProps.gearProducts.length
    ) {
      return false;
    }
    if (nextProps.location.pathname === '/collections/coffee') {
      return this.setState({
        product: null,
        products: nextProps.coffeeProducts,
      });
    } else if (nextProps.location.pathname === '/collections/gear') {
      return this.setState({
        product: null,
        products: nextProps.gearProducts,
      });
    } else if (nextProps.match.url === '/product') {
      const handle = nextProps.location.pathname.split('/');
      const coffeeMatch = nextProps.coffeeProducts
        ? nextProps.coffeeProducts.find(({ attrs }) => attrs.handle === handle[handle.length - 1])
        : null;
      const gearMatch = nextProps.gearProducts
        ? nextProps.gearProducts.find(({ attrs }) => attrs.handle === handle[handle.length - 1])
        : null;
      return this.setState({
        product: coffeeMatch || gearMatch,
        products: coffeeMatch ? nextProps.coffeeProducts : (gearMatch ? nextProps.gearProducts : null),
      });
    }
  }

  render() {
    return (
      <div>
        <ProductList products={this.state.products} />
        {this.state.product &&
          <ProductView product={this.state.product} />
        }
      </div>
    );
  }
}

ProductContainer.propTypes = {
  coffeeProducts: PropTypes.array,
  gearProducts: PropTypes.array,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default ProductContainer;
