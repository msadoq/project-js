import React from 'react';
import { createStore } from 'redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import { reduxForm } from 'redux-form';
import { Provider } from 'react-redux';

/**
 * @param obj
 * @param propsStub
 * @param stateStub
 */
export const shallowRenderSnapshotInReduxFormInReduxForm = (
  obj, propsStub = {}, stateStub = {}
) => {
  const renderer = new ShallowRenderer();
  const Decorated = reduxForm({ form: 'test' })(obj);
  const store = createStore(state => state, stateStub);
  renderer.render(
    <Provider store={store}>
      <Decorated
        {...propsStub}
      />
    </Provider>
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
};

/**
 * @param Obj
 * @param propsStub
 */
export const shallowRenderSnapshot = (Obj, propsStub = {}) => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Obj
      {...propsStub}
    />
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
};
