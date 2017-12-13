import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import _each from 'lodash/each';
import EntryPointDetails from './EntryPointDetails';

const propsStub = {
  viewId: 'viewId',
  timelines: [
    {},
    {},
  ],
  axes: {
    time: {},
    vBat: {},
  },
  entryPoint: {
    parametric: false,
    displayLine: true,
    displayPoints: true,
  },
  updateEntryPoint: () => null,
  updateViewSubPanels: () => null,
  domains: [
    {},
  ],
};
describe('EntryPointDetails :: render', () => {
  _each([[], true], (panels) => {
    test(`EntryPointDetails :: render :: ${panels}`, () => {
      const Decorated = reduxForm({ form: 'testForm' })(EntryPointDetails);
      const store = createStore(state => state, {});
      const tree = renderer.create(
        <Provider store={store}>
          <Decorated
            {...propsStub}
            panels={panels}
          />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
