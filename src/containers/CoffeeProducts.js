/**
 * Coffee Products
 * Data container for the coffee collection
 */

/* Dependencies */

import React from 'react';
import { Link } from 'react-router-dom';

/* Config */

const collectionID = 27654297;

/* Component */

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };

    this.updateProducts = this.updateProducts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.updateProducts();
  }

  componentWillMount() {
    this.updateProducts();
  }

  updateProducts() {
    this.props.client.fetchQueryProducts({ collection_id: collectionID })
      .then((result) => {
        console.log(result);
        this.setState({ products: result });
      });
  }

  render() {
    return (
      <div>
        {this.state.products.map((product) => (
          <div key={product.id}>
            {product.title}
            <Link to={`/product/${product.attrs.handle}`}>View</Link>
          </div>
        ))}
      </div>
    );
  }
};
