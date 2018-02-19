import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import DynamicViewEntryPoints from './DynamicViewEntryPoints';

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
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: EntryPoint', () => {
      describe('viewManager :: commonEditor :: EntryPoint :: DynamicViewEntryPoints', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(DynamicViewEntryPoints, propsStub, {});
        });
      });
    });
  });
});
