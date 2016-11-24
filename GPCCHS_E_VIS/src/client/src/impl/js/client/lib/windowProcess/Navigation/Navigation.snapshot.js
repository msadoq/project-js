// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Navigation from './Navigation';
import { initStore, getStore } from '../../store/windowStore';

initStore();

test('Navigation renders correctly', () => {
  const tree = renderer.create(
    <Provider store={getStore()}>
      <Navigation
        windowId="49b6335b-9d00-4ca6-879d-5a04340a0bea"
        focusedPageId="31f3a048-4905-4ab6-9178-d612adc4c9d9"
      />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
