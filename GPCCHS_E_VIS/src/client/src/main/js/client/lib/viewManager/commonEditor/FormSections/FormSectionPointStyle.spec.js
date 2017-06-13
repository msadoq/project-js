import React from 'react';
import { Provider } from 'react-redux';
import { reduxForm, reducer as form } from 'redux-form';
import { combineReducers, createStore } from 'redux';
import renderer from 'react-test-renderer';
import FormSectionPointStyle from './FormSectionPointStyle';

it('Navigation renders correctly', () => {
  const store = createStore(
    combineReducers({ form }),
    { form: {} }
  );
  const Decorated = reduxForm({ form: 'testform', name: 'testname' })(FormSectionPointStyle);
  const tree = renderer.create(
    <Provider store={store}>
      <Decorated />
    </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
