import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import EntryPointTree from './EntryPointTree';

const propsStub = {
  viewId: 'view1',
  entryPoint: {},
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
  remove: () => null,
  updateViewPanels: () => null,
  entryPointsPanels: {},
};
describe('EntryPointTree :: render', () => {
  test('EntryPointTree :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointTree);
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
