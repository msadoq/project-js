import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import EntryPointConnectedDataFieldsContainer from './EntryPointConnectedDataFieldsContainer';

const propsStub = {
  pageId: 'page1',
  viewId: 'view1',
  entryPoint: {},
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: false,
  valid: true,
  timeline: 'timeline',
  domain: 'domain',
  form: 'form',
  domains: [],
};
describe('EntryPointConnectedDataFieldsContainer :: render', () => {
  test('EntryPointConnectedDataFieldsContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointConnectedDataFieldsContainer);
    const store = createStore(state => state, {});
    const tree = shallow(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
