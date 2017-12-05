import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import _each from 'lodash/each';
import EntryPointParameters from './EntryPointParameters';

const propsStub = {
  initialValues: {
    line: {},
    points: {},
  },
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};
describe('EntryPointParameters :: render', () => {
  _each([true, false], (displayLine) => {
    _each([true, false], (displayPoints) => {
      test(`EntryPointParameters :: render :: ${displayLine}-${displayPoints}`, () => {
        const Decorated = reduxForm({ form: 'testForm' })(EntryPointParameters);
        const store = createStore(state => state, {});
        const tree = renderer.create(
          <Provider store={store}>
            <Decorated
              {...propsStub}
              displayLine={displayLine}
              displayPoints={displayPoints}
            />
          </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
