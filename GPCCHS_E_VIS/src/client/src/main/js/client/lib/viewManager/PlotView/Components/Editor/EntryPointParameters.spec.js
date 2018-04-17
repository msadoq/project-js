import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import _each from 'lodash/each';
import EntryPointParameters from './EntryPointParameters';

let propsStub = {
  entryPoint: {
    objectStyle: {
      line: {},
      points: {},
    },
  },
};
describe('EntryPointParameters :: render', () => {
  _each([true, false], (displayLine) => {
    _each([true, false], (displayPoints) => {
      test(`EntryPointParameters :: render :: ${displayLine}-${displayPoints}`, () => {
        const Decorated = reduxForm({ form: 'testForm' })(EntryPointParameters);
        const store = createStore(state => state, {});
        propsStub = {
          ...propsStub,
          displayLine,
          displayPoints,
        };
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
  });
});
