import { getStore } from '../../utils/test';
import { getDomainIdsByWildcard } from './domainsReducer';

describe('domainsReducer', () => {
  // TODO missing tests empty store, unknown action
  let state;
  before(() => {
    const { getState } = getStore({ domains: [{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }, {
      itemNamespace: 'Domains',
      name: 'fr.new.sat1',
      oid: '0051525005151000565215465660516',
      domainId: 32,
      parentDomainId: 76,
    }, {
      itemNamespace: 'Domains',
      name: 'fr.new.sat2',
      oid: '0051525005151000565215465660517',
      domainId: 33,
      parentDomainId: 76,
    }] });
    state = getState();
  });
});
