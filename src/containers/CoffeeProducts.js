/**
 * Coffee Products
 * Data container for the coffee collection
 */

/* Dependencies */

import React from 'react';

/* Config */

const coffeeCollectionID = 27654297;

/* Component */

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    props.client.fetchQueryProducts({ collection_id: coffeeCollectionID })
      .then(result => this.setState({ products: result }));
  }

  render() {
    return (
      <div>
        {this.state.products.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    );
  }
};
