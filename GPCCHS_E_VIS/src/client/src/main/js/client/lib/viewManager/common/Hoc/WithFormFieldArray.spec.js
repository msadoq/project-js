import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import WithFormFieldArray from './WithFormFieldArray';

const stubState = {};
const propsStub = {
  initialValues: {},
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};

describe('WithFormFieldArray :: render', () => {
  test('WithFormFieldArray :: render', () => {
    const Hello = () => (<div>Wrapped Component</div>);
    const ElementWithForm = WithFormFieldArray(Hello, 'Name');
    const store = createStore(
      (state = {}) => state,
      stubState
    );
    const Decorated = reduxForm({ form: 'testsdfForm' })(ElementWithForm);
    const component = renderer.create(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
