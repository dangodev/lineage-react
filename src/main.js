import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <AppContainer metafields={window.shopifyData} />,
  document.getElementById('app-root')
);
