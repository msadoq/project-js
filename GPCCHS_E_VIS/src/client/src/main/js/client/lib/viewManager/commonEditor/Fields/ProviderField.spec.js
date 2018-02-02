import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import ProviderField from 'viewManager/commonEditor/Fields/ProviderField';
import { shallow } from 'enzyme';

const propsStub = {
  timelineName: 'timeline',
  timelines: [{
    name: 'timeline',
    items: [],
  }],
  onChange: () => {},
};
describe('ProviderField :: render', () => {
  test('ProviderField :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(ProviderField);
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
