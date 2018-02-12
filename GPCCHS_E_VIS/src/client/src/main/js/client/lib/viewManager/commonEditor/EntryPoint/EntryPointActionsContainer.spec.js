import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import EntryPointActionsContainer from 'viewManager/commonEditor/EntryPoint/EntryPointActionsContainer';

const propsStub = {
  search: null,
  viewId: 'viewId',
  pageId: 'pageId',
  viewType: 'TextView',
};

describe('EntryPointActionsContainer :: render', () => {
  test('EntryPointActionsContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointActionsContainer);
    const store = createStore(state => state, {});
    const tree = shallow(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
