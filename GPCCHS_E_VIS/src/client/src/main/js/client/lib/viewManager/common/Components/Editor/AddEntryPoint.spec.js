import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import AddEntryPoint from './AddEntryPoint';

const propsStub = {
  handleSubmit: () => null,
  pristine: true,
  submitting: false,
  valid: true,
};
describe('AddEntryPoint :: render', () => {
  test('AddEntryPoint :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(AddEntryPoint);
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
