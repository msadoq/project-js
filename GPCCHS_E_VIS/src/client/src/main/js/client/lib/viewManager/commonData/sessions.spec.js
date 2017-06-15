import filter, { reset } from './sessions';

describe('viewManager:commonData:sessions', () => {
  beforeEach(() => {
    reset();
  });
  const list = [{ name: 'Master', id: 0 },
    { name: 'Session#181', id: 181 }];

  test('should retrieve corresponding session', () => {
    expect(filter(list, 'Master', 10)).toEqual({ name: 'Master', id: 0 });
    expect(filter(list, 'Session#181', 10)).toEqual({ name: 'Session#181', id: 181 });
  });
  test('should return masterSessionId while receiving wildcard', () => {
    expect(filter(list, '*', 10)).toEqual({ id: 10, name: '*' });
  });
  test('should return viewSession while receiving wildcard', () => {
    expect(filter(list, '*', 10, 'Session#181', 'Master')).toEqual({ name: 'Session#181', id: 181 });
  });
  test('should return pageSession while receiving wildcard', () => {
    expect(filter(list, '*', 10, undefined, 'Session#181', 'Master')).toEqual({ name: 'Session#181', id: 181 });
  });
  test('should return workspace while receiving wildcard', () => {
    expect(filter(list, '*', 10, undefined, undefined, 'Session#181')).toEqual({ name: 'Session#181', id: 181 });
  });
  test('should support no domain', () => {
    expect(filter(undefined, 'Master', 10)).toEqual({ error: 'invalid entry point, no session available' });
    expect(filter([], 'Master', 10)).toEqual({ error: 'invalid entry point, no session available' });
  });
  test('should support no search', () => {
    expect(filter(list, '', 10)).toEqual({ error: 'invalid entry point, invalid session name' });
    expect(filter(list, undefined, 10)).toEqual({ error: 'invalid entry point, invalid session name' });
  });
  test('should return nothing if no session matches', () => {
    expect(filter(list, 'unknown', 10)).toEqual({ error: 'invalid entry point, no session matches' });
  });
  test('should support multiple matches', () => {
    const newList = [{ name: 'Master', id: 0 },
      { name: 'Session#181', id: 181 },
      { name: 'Master', id: 3 }];
    expect(filter(newList, 'Master', 10)).toEqual({
      error: 'invalid entry point, more than one session match',
    });
  });
  test('should memoize', () => {
    const result = filter(list, 'Master', 10);
    expect(filter(list, 'Master', 10)).toBe(result);
  });
  test('should reset memoize on new session list', () => {
    expect(filter(list, 'Master', 10)).toEqual({ name: 'Master', id: 0 });
    const otherList = [...list];
    otherList[1] = { id: 100, name: 'session100' };
    expect(filter(otherList, 'session100')).toEqual({ id: 100, name: 'session100' });
  });
});
