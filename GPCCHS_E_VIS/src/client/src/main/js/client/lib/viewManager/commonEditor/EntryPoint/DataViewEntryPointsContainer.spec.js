import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import DataViewEntryPointsContainer from './DataViewEntryPointsContainer';

const propsStub = {
  domains: [
    {
      domainId: 1,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis',
      oid: '0051525005151000565215465660515',
      parentDomainId: 0,
    },
    {
      domainId: 2,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis.simupus',
      oid: '0051525005151000565215465660515',
      parentDomainId: 1,
    },
  ],
  domainName: 'fr.cnes.test',
  viewId: 'viewId',
  pageId: 'pageId',
  form: 'form',
  viewType: 'TextView',
};

describe('DataViewEntryPointsContainer :: render', () => {
  test('DataViewEntryPointsContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(DataViewEntryPointsContainer);
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
