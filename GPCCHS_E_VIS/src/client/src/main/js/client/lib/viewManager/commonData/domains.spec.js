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
    filter(list, 'cnes').should.eql({ domainId: 'd1', domainName: 'cnes' });
    filter(list, 'cnes.isis.sat1').should.eql({ domainId: 'd3', domainName: 'cnes.isis.sat1' });
  });
  it('should return error while receiving wildcard and no domain defined on entities', () => {
    filter(list, '*').should.eql({ error: 'invalid entry point, domain not defined on entities' });
  });
  it('should return view domain in case of wilcard', () => {
    filter(list, '*', 'cnes', 'cnes.isis').should.eql({ domainId: 'd1', domainName: 'cnes' });
  });
  it('should return page domain in case of wilcard', () => {
    filter(list, '*', undefined, 'cnes', 'cnes.isis')
      .should.eql({ domainId: 'd1', domainName: 'cnes' });
  });
  it('should return workspace domain in case of wilcard', () => {
    filter(list, '*', undefined, undefined, 'cnes.isis')
    .should.eql({ domainId: 'd2', domainName: 'cnes.isis' });
  });
  it('should return view domain in case of wilcard', () => {
    filter(list, '*', 'cnes').should.eql({ domainId: 'd1', domainName: 'cnes' });
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
    filter(list, 'cnes').should.eql({ domainId: 'd1', domainName: 'cnes' });
    const otherList = [...list];
    otherList[0] = { domainId: 'd100', name: 'cnes' };
    filter(otherList, 'cnes').should.eql({ domainId: 'd100', domainName: 'cnes' });
  });
});
