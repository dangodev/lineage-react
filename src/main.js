import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from 'containers/AppContainer';

ReactDOM.render(
  <AppContainer
    collections={window.lineageCollections}
    metafields={window.lineageMetafields}
  />,
  document.getElementById('app-root'),
);
