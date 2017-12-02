import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from 'containers/AppContainer';

const App = () => (
  <BrowserRouter>
    <AppContainer
      collections={window.lineageCollections}
      metafields={window.lineageMetafields}
    />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app-root'));
