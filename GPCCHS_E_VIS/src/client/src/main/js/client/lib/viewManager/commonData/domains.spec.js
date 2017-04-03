import '../../common/test';
import filter, { reset } from './domains';

describe('viewManager:commonData:domains', () => {
  beforeEach(() => {
    reset();
  });
  const list = [
    { domainId: 'd1', name: 'cnes' },
    { domainId: 'd2', name: 'cnes.isis' },
    { domainId: 'd3', name: 'cnes.isis.sat1' },
    { domainId: 'd4', name: 'cnes.isis.sat2' },
    { domainId: 'd5', name: 'cnes.isis.sat2.gun' },
    { domainId: 'invalid', name: undefined },
  ];
  it('should retrieve corresponding domain', () => {
    filter(list, 'cnes').should.eql({ domainId: 'd1' });
    filter(list, 'cnes.isis.sat1').should.eql({ domainId: 'd3' });
  });
  it('should return error while receiving wildcard', () => {
    filter(list, '*').should.eql({ error: 'invalid entry point, domain wildcard not already supported' });
  });
  it('should support no domain', () => {
    filter(undefined, 'cnes').should.eql({ error: 'invalid entry point, no domain available' });
    filter([], 'cnes').should.eql({ error: 'invalid entry point, no domain available' });
  });
  it('should support no search', () => {
    filter(list, '').should.eql({ error: 'invalid entry point, invalid domain field' });
    filter(list).should.eql({ error: 'invalid entry point, invalid domain field' });
  });
  it('should return nothing if no domain match', () => {
    filter(list, 'unknown').should.eql({ error: 'invalid entry point, no domain matches' });
  });
  it('should support multiple matches', () => {
    filter(list.concat({ name: 'cnes' }), 'cnes').should.eql({
      error: 'invalid entry point, more than one domains match',
    });
  });
  it('should memoize', () => {
    const result = filter(list, 'cnes');
    filter(list, 'cnes').should.equal(result);
  });
  it('should reset memoize on new domains list', () => {
    filter(list, 'cnes').should.eql({ domainId: 'd1' });
    const otherList = [...list];
    otherList[0] = { domainId: 'd100', name: 'cnes' };
    filter(otherList, 'cnes').should.eql({ domainId: 'd100' });
  });
});
