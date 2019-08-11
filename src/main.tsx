import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from 'containers/AppContainer';

const globalAny: any = window;

ReactDOM.render(
  <AppContainer metafields={(globalAny.shopifyData as ShopifyCustom.ProductMetadata[]) || []} />,
  document.getElementById('app-root')
);
