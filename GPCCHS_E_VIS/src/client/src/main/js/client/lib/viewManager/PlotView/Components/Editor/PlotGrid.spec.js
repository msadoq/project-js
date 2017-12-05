import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import PlotGrid from './PlotGrid';

const propsStub = {
  initialValues: {},
  axes: {
    time: {
      value: 'time',
    },
    vBat: {
      value: 'vBat',
    },
  },
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};
describe('PlotGrid :: render', () => {
  test('PlotGrid :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(PlotGrid);
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
