/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './domainsActions';
import reducer, { getDomains, getDomain } from './domainsReducer';

describe('store:domains', () => {
  describe('actions & reducer', () => {
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
      }], {})
        .should.eql([{
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
  describe('selectors', () => {
    describe('getDomains', () => {
      it('works', () => {
        const { getState } = getStore({ domains: [{
          itemNamespace: 'Domains',
          name: 'fr.cnes.sat1',
          oid: '0051525005151000565215465660515',
          domainId: 27,
          parentDomainId: 98,
        }] });
        getDomains(getState()).should.eql([{
          itemNamespace: 'Domains',
          name: 'fr.cnes.sat1',
          oid: '0051525005151000565215465660515',
          domainId: 27,
          parentDomainId: 98,
        }]);
      });
      it('empty', () => {
        const { getState } = getStore({ domains: [] });
        getDomains(getState()).should.eql([]);
      });
    });
    describe('getDomain', () => {
      it('empty', () => {
        const { getState } = getStore({ domains: [] });
        should.not.exist(getDomain(getState()));
      });
      it('works', () => {
        const { getState } = getStore({ domains: [{
          itemNamespace: 'Domains',
          name: 'fr.cnes.sat1',
          oid: '0051525005151000565215465660515',
          domainId: 27,
          parentDomainId: 98,
        }] });
        getDomain(getState(), 'fr.cnes.sat1').should.eql({
          itemNamespace: 'Domains',
          name: 'fr.cnes.sat1',
          oid: '0051525005151000565215465660515',
          domainId: 27,
          parentDomainId: 98,
        });
      });
    });
  });
});
