import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import AddEntryPointWrapper from './AddEntryPointWrapper';

const propsStub = {
  viewId: 'viewId',
  closeModal: () => null,
  addEntryPoint: () => null,
};
describe('AddEntryPointWrapper :: render', () => {
  test('AddEntryPointWrapper :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(AddEntryPointWrapper);
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
