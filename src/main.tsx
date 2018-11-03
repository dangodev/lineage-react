import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from 'containers/AppContainer';

const metafields: ShopifyBuy.Product[] = window.shopifyData;

ReactDOM.render(<AppContainer metafields={metafields} />, document.getElementById('app-root'));
