/* eslint no-unused-expressions: 0 */
import '../utils/test';
import filter from './domains';

describe('connectedData/domains', () => {
  const list = [
    { oid: 'd1', name: 'cnes' },
    { oid: 'd2', name: 'cnes.isis' },
    { oid: 'd3', name: 'cnes.isis.sat1' },
    { oid: 'd4', name: 'cnes.isis.sat2' },
    { oid: 'd5', name: 'cnes.isis.sat2.gun' },
    { oid: 'invalid', name: undefined },
  ];
  it('exact', () => {
    filter(list, 'cnes').should.eql(['d1']);
    filter(list, 'cnes.isis.sat1').should.eql(['d3']);
  });
  it('wildcard', () => {
    filter(list, '*').should.eql(['d1', 'd2', 'd3', 'd4', 'd5']);
    filter(list, 'cnes*').should.eql(['d1', 'd2', 'd3', 'd4', 'd5']);
    filter(list, 'cnes.isis.sat*').should.eql(['d3', 'd4', 'd5']);
    filter(list, '*sat1').should.eql(['d3']);
    filter(list, 'cne?.*').should.eql(['d2', 'd3', 'd4', 'd5']);
    filter(list, 'cnes.isis.sat?').should.eql(['d3', 'd4']);
  });
  it('no domain', () => {
    filter(undefined, 'cnes').should.eql([]);
    filter([], 'cnes').should.eql([]);
  });
  it('no search', () => {
    filter(list, '').should.eql([]);
    filter(list).should.eql([]);
  });
  it('no match', () => {
    filter(list, 'unknown').should.eql([]);
  });
});
