import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import ComObject from 'viewManager/commonEditor/Fields/ComObject';
import { shallow } from 'enzyme';

const propsStub = {
  timelineId: 'timelineId',
  comObjects: [{
    name: 'comObjectName',
    items: [],
  }],
  sessionId: 1,
  domainId: 1,
  catalogName: 'catalogName',
  itemName: 'itemName',
  askComObjects: () => null,
};
describe('ComObject :: render', () => {
  test('ComObject :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(ComObject);
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
  test('ComObject :: render requesting', () => {
    const propsStub2 = { ...propsStub, catalogs: 'requesting' };
    const wrapper = shallow(
      <ComObject
        {...propsStub2}
      />
    );
    wrapper.setProps({
      domainId: 1,
      timelineId: 'timelineId',
      catalogName: 'catalogName',
      itemName: 'itemName',
      comObjects: null,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
