import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import EntryPointConnectedDataFields from './EntryPointConnectedDataFields';

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
  timelines: [
    {
      color: null,
      id: 'Session 1',
      kind: 'Session',
      offset: 0,
      sessionName: 'Master',
      uuid: 'a2eeca66-fc24-4330-bb70-2c4fe1c4f109',
    },
  ],
  timeline: 'Session 1',
};
describe('EntryPointConnectedDataFields :: render', () => {
  test.skip('EntryPointConnectedDataFields :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointConnectedDataFields);
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
