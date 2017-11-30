import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import DomainField from './DomainField';

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
};
describe('DomainField :: render', () => {
  test.skip('DomainField :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(DomainField);
    const store = createStore(state => state, {});
    const tree = renderer.create(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
