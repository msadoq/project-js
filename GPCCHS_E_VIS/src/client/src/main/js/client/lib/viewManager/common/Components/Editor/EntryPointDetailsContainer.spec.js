import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import EntryPointDetailsContainer from './EntryPointDetailsContainer';

const propsStub = {
  viewId: 'view1',
  entryPoint: {},
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
};
describe('EntryPointDetailsContainer :: render', () => {
  test('EntryPointDetailsContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointDetailsContainer);
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
