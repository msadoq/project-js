// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Restore some snapshots in viewManager and windowProcess
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import React from 'react';
import { Provider } from 'react-redux';
import { reduxForm, reducer as form } from 'redux-form';
import { combineReducers, createStore } from 'redux';
import renderer from 'react-test-renderer';
import FormSectionLineStyle from './FormSectionLineStyle';

test('Navigation renders correctly', () => {
  const store = createStore(
    combineReducers({ form }),
    { form: {} }
  );
  const Decorated = reduxForm({ form: 'testform', name: 'testname' })(FormSectionLineStyle);
  const tree = renderer.create(
    <Provider store={store}>
      <Decorated />
    </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
