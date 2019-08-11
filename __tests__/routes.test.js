import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import mockData from 'data/mockData.json';

import AppContainer from 'containers/AppContainer';

const context = {};
const TestApp = props => (
  <StaticRouter location={props.location} context={context}>
    <AppContainer collections={mockData.collections} metafields={mockData.metafields} />
  </StaticRouter>
);

const testRoutes = [
  ['/', 'Home page loads'],
  ['/collections/coffee', 'Coffee page loads'],
  ['/collections/gear', 'Gear page loads'],
  ['/pages/about', 'About Page loads'],
  ['/pages/learn', 'Learn Page loads'],
  ['/pages/wholesale', 'Wholesale Page loads'],
  ['/products/roasters-choice-single-origin', 'Product Page loads'],
  ['/cart', 'Cart loads'],
];

describe('App routes', () => {
  it('loads all routes correctly', () => {
    testRoutes.forEach(([pathname, test]) =>
      expect(renderToString(<TestApp location={pathname} />)).toBeTruthy()
    );
  });
});
