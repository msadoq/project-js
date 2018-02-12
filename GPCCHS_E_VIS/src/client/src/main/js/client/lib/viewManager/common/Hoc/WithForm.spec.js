import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import WithForm from './WithForm';

const stubState = {};
const propsStub = {
  initialValues: {},
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};

describe('WithForm :: render', () => {
  test('WithForm :: render', () => {
    const Hello = () => (<div>Wrapped Component</div>);
    const ElementWithForm = WithForm(Hello);
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
