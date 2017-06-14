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
  test('should retrieve corresponding domain', () => {
    expect(filter(list, 'cnes')).toEqual({ domainId: 'd1', domainName: 'cnes' });
    expect(filter(list, 'cnes.isis.sat1')).toEqual({ domainId: 'd3', domainName: 'cnes.isis.sat1' });
  });
  test('should return error while receiving wildcard and no domain defined on entities', () => {
    expect(filter(list, '*')).toEqual({ error: 'invalid entry point, domain not defined on entities' });
  });
  test('should return view domain in case of wilcard', () => {
    expect(filter(list, '*', 'cnes', 'cnes.isis')).toEqual({ domainId: 'd1', domainName: 'cnes' });
  });
  test('should return page domain in case of wilcard', () => {
    expect(filter(list, '*', undefined, 'cnes', 'cnes.isis')).toEqual({ domainId: 'd1', domainName: 'cnes' });
  });
  test('should return workspace domain in case of wilcard', () => {
    expect(filter(list, '*', undefined, undefined, 'cnes.isis')).toEqual({ domainId: 'd2', domainName: 'cnes.isis' });
  });
  test('should return view domain in case of wilcard', () => {
    expect(filter(list, '*', 'cnes')).toEqual({ domainId: 'd1', domainName: 'cnes' });
  });
  test('should support no domain', () => {
    expect(filter(undefined, 'cnes')).toEqual({ error: 'invalid entry point, no domain available' });
    expect(filter([], 'cnes')).toEqual({ error: 'invalid entry point, no domain available' });
  });
  test('should support no search', () => {
    expect(filter(list, '')).toEqual({ error: 'invalid entry point, invalid domain field' });
    expect(filter(list)).toEqual({ error: 'invalid entry point, invalid domain field' });
  });
  test('should return nothing if no domain match', () => {
    expect(filter(list, 'unknown')).toEqual({ error: 'invalid entry point, no domain matches' });
  });
  test('should support multiple matches', () => {
    expect(filter(list.concat({ name: 'cnes' }), 'cnes')).toEqual({
      error: 'invalid entry point, more than one domains match',
    });
  });
  test('should memoize', () => {
    const result = filter(list, 'cnes');
    expect(filter(list, 'cnes')).toBe(result);
  });
  test('should reset memoize on new domains list', () => {
    expect(filter(list, 'cnes')).toEqual({ domainId: 'd1', domainName: 'cnes' });
    const otherList = [...list];
    otherList[0] = { domainId: 'd100', name: 'cnes' };
    expect(filter(otherList, 'cnes')).toEqual({ domainId: 'd100', domainName: 'cnes' });
  });
});
