import React from 'react';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ComObjectContainer from 'viewManager/commonEditor/Fields/ComObjectContainer';

const propsStub = {
  domainName: 'domainName',
  timelineId: 'timelineId',
  viewId: 'viewId',
  pageId: 'pageId',
  catalogName: 'catalogName',
  itemName: 'itemName',
};

describe('ComObjectContainer :: render', () => {
  test('ComObjectContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(ComObjectContainer);
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
