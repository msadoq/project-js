import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CatalogItemFieldContainer from 'viewManager/commonEditor/Fields/CatalogItemFieldContainer';

const propsStub = {
  pageId: 1,
  viewId: 1,
  domainName: 'domainName',
  timelineId: 'timelineId',
};


describe('CatalogItemFieldContainer :: render', () => {
  test('CatalogItemFieldContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(CatalogItemFieldContainer);
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
