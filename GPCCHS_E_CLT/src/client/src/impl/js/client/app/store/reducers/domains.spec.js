/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import { should } from '../../utils/test';
import * as actions from '../actions/domains';
import reducer from './domains';

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
});
