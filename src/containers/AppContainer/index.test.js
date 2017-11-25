import React from 'react';
import renderer from 'react-test-renderer';

import AppContainer from 'components/App';
import mockData from 'data/mockData.json';

test('It didn’t blow up', () => {
  const component = renderer.create(
    <AppContainer
      collections={mockData.collections}
      metafields={mockData.metafields}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
