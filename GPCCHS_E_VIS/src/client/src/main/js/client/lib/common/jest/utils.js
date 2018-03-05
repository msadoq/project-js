import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { reduxForm } from 'redux-form';
import { Provider } from 'react-redux';

/**
 * @param obj
 * @param propsStub
 * @param stateStub
 */
export const shallowRenderSnapshotInReduxForm = (
  obj, propsStub = {}, stateStub = {}
) => {
  const Decorated = reduxForm({ form: 'testForm' })(obj);
  const store = createStore(state => state, stateStub);
  const tree = shallow(
    <Provider store={store}>
      <Decorated
        {...propsStub}
      />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
};

/**
 * @param Obj
 * @param propsStub
 */
export const shallowRenderSnapshot = (Obj, propsStub = {}) => {
  const tree = shallow(
    <Obj
      {...propsStub}
    />
  );
  expect(tree).toMatchSnapshot();
};
