import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';
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

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: EntryPoint', () => {
      describe('viewManager :: commonEditor :: EntryPoint :: DataViewEntryPointsContainer', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(DataViewEntryPointsContainer, propsStub, {});
        });
      });
    });
  });
});
