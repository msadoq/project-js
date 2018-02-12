import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import CatalogField from 'viewManager/commonEditor/Fields/CatalogField';
import { shallow } from 'enzyme';

const propsStub = {
  timelineId: 'timelineId',
  catalogs: [{
    name: 'catalogName',
    items: [],
  }],
  sessionId: 1,
  domainId: 1,
  askCatalogs: () => null,
};
describe('CatalogField :: render', () => {
  test('CatalogField :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(CatalogField);
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
  test('CatalogField :: render requesting', () => {
    const Decorated = reduxForm({ form: 'testForm' })(CatalogField);
    const store = createStore(state => state, {});
    const propsStub2 = { ...propsStub, catalogs: 'requesting' };
    const tree = shallow(
      <Provider store={store}>
        <Decorated
          {...propsStub2}
        />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
