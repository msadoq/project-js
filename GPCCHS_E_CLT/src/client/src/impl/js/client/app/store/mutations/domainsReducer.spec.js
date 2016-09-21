import { getDomainIdsByWildcard } from './domainsReducer';
import { should, getStore } from '../../utils/test';

describe('domainsReducer', () => {
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
  describe('getDomainIdsByWildcard', () => {
    it('wildcard ok', () => {
      const dId = getDomainIdsByWildcard(state, 'fr.new.*');
      dId.should.be.an('array').with.length(2);
      dId[0].should.equal(32);
      dId[1].should.equal(33);
    });
    it('wildcard nok', () => {
      const dId = getDomainIdsByWildcard(state, 'not.fr.cnes.*');
      dId.should.be.an('array').with.length(0);
    });
    it('no wildcard', () => {
      const dId = getDomainIdsByWildcard(state, 'fr.cnes.sat1');
      dId.should.be.an('array').with.length(1);
      dId[0].should.equal(27);
    });
    it('no wildcard but invalid', () => {
      const dId = getDomainIdsByWildcard(state, 'fr.cnes.sat');
      dId.should.be.an('array').with.length(0);
    });
    it('wildcard *', () => {
      const dId = getDomainIdsByWildcard(state, '*');
      dId.should.be.an('array').with.length(3);
      dId[0].should.equal(27);
      dId[1].should.equal(32);
      dId[2].should.equal(33);
    });
    it('wildcard * in middle', () => {
      const dId = getDomainIdsByWildcard(state, 'fr.*.sat1');
      dId.should.be.an('array').with.length(2);
      dId[0].should.equal(27);
      dId[1].should.equal(32);
    });
    it('wildcard ?', () => {
      const dId = getDomainIdsByWildcard(state, 'fr.new.sat?');
      dId.should.be.an('array').with.length(2);
      dId[0].should.equal(32);
      dId[1].should.equal(33);
    });
    it('wildcard ? invalid', () => {
      const dId = getDomainIdsByWildcard(state, 'fr.??.*');
      dId.should.be.an('array').with.length(0);
    });
  });
});
