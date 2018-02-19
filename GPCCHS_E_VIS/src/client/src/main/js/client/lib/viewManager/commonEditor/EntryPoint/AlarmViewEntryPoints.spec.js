import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
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

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: EntryPoint', () => {
      describe('viewManager :: commonEditor :: EntryPoint :: AlarmViewEntryPoints', () => {
        test('snapshot', () => {
          const renderer = new ShallowRenderer();
          renderer.render(
            <AlarmViewEntryPoints
              {...propsStub}
            />
          );
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        });
      });
    });
  });
});
