import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import EntryPointUnit from './EntryPointUnit';

const propsStub = {
  pageId: 'page1',
  viewId: 'view1',
  entryPoint: {},
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
  remove: () => null,
  updateViewPanels: () => null,
  removeEntryPoint: () => null,
  entryPointsPanels: {},
};
describe('EntryPointUnit :: render', () => {
  test('EntryPointUnit :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointUnit);
    const store = createStore(state => state, {});
    const tree = renderer.create(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
