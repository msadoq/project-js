/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import { should, getStore } from '../../common/test';
import getDomain from './domains';

describe('store:domains', () => {
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
        _.get(getState(), 'domains').should.eql([{
          itemNamespace: 'Domains',
          name: 'fr.cnes.sat1',
          oid: '0051525005151000565215465660515',
          domainId: 27,
          parentDomainId: 98,
        }]);
      });
      it('empty', () => {
        const { getState } = getStore({ domains: [] });
        _.get(getState(), 'domains').should.eql([]);
      });
    });
    describe('getDomain', () => {
      it('empty', () => {
        const { getState } = getStore({ domains: [] });
        should.not.exist(getDomain(getState(), ''));
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
