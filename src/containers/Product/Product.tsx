import * as React from 'react';
import { css } from 'emotion';
import queryString from 'query-string';
import FourOhFour from 'pages/404';
import Meta from 'containers/Meta';
import Product from 'components/Product';

const IsShowing = css`
  height: 100vw;
  overflow: hidden;
`;

const FALLBACK_COLLECTION = 'coffee';

class ProductContainer extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-undef
    document.body.classList.add(IsShowing);
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-undef
    document.body.classList.add(IsShowing);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    document.body.classList.remove(IsShowing);
  }

  render() {
    const { addLineItem, collections, location, product, products } = this.props;
    const foundProduct = products.find(({ handle }) => handle === product);
    const collectionHandle = queryString.parse(location.search).collection || FALLBACK_COLLECTION;
    const collection = collections.find(({ handle }) => handle === collectionHandle);

    return foundProduct ? (
      <div>
        <Meta title={`${foundProduct.title} • Lineage Coffee Roasting`} />
        <Product addLineItem={addLineItem} product={foundProduct} collection={collection} />
      </div>
    ) : (
      <FourOhFour />
    );
  }
}

export default ProductContainer;
