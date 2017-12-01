import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import EntryPointDetails from './EntryPointDetails';

const propsStub = {
  viewId: 'view1',
  entryPoint: {},
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
};
describe('EntryPointDetails :: render', () => {
  test('EntryPointDetails :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointDetails);
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
