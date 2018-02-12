import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AlarmViewEntryPoints from './AlarmViewEntryPoints';

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

describe('AlarmViewEntryPoints :: render', () => {
  test('AlarmViewEntryPoints :: render', () => {
    const tree = shallow(
      <AlarmViewEntryPoints
        {...propsStub}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
