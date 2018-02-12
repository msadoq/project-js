import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import TimelineField from 'viewManager/commonEditor/Fields/TimelineField';
import { shallow } from 'enzyme';

const propsStub = {
  timelineName: 'timeline',
  timelines: [{
    name: 'timeline',
    items: [],
  }],
  onChange: () => {},
};
describe('TimelineField :: render', () => {
  test('TimelineField :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(TimelineField);
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
