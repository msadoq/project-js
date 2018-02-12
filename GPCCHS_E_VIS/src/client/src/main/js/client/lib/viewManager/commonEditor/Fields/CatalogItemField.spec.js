import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import CatalogItemField from 'viewManager/commonEditor/Fields/CatalogItemField';
import { shallow } from 'enzyme';

const propsStub = {
  catalogItems: [{
    name: 'CatalogItemFieldName',
    items: [],
  }],
  askCatalogItems: () => null,
  timelineId: 'timelineId',
  sessionId: 1,
  domainId: 1,
  catalogName: 'catalogName',
};
describe('CatalogItemField :: render', () => {
  test('CatalogItemField :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(CatalogItemField);
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
  test('CatalogItemField :: render requesting', () => {
    const propsStub2 = { ...propsStub, catalogs: 'requesting' };
    const wrapper = shallow(
      <CatalogItemField
        {...propsStub2}
      />
    );
    wrapper.setProps({
      domainId: 1,
      timelineId: 'timelineId',
      catalogName: 'catalogName',
      itemName: 'itemName',
      CatalogItemFields: null,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
