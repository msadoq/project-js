import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/domains';
import domainsReducer, { getDomains } from '.';

const reducer = freezeArgs(domainsReducer);

describe('store:domains:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.eql([]);
  });
  it('unknown action', () => {
    reducer([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }], {}).should.eql([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]);
  });
  it('set state', () => {
    reducer(undefined, actions.updateDomains([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }])).should.eql([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]);
  });
});

describe('store:domains:selectors', () => {
  describe('getDomains', () => {
    it('should return the whole list', () => {
      const state = {
        domains: {
          myDomainId: { domainId: 1 },
          myOtherId: { domainId: 2 },
        },
      };
      getDomains(state).should.equal(state.domains);
    });
  });
});
