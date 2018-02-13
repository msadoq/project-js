import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import ProviderField from 'viewManager/commonEditor/Fields/ProviderField';
import ShallowRenderer from 'react-test-renderer/shallow';

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

    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
