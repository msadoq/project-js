// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper
//  modules
// VERSION : 2.0.0 : FA : ISIS-FT-2248 : 18/10/2017 : Fallback/Wildcard for sessions and domains is
//  now functionnal. Plus fixed page and workspace modal editor for undefined values.
// END-HISTORY
// ====================================================================

import filter, { reset } from './sessions';

describe('viewManager:commonData:sessions', () => {
  beforeEach(() => {
    reset();
  });
  const list = [{ name: 'Master', id: 0 },
    { name: 'Session#181', id: 181 }];

  test('should retrieve corresponding session', () => {
    expect(filter(list, 'Master', { id: 10, name: 'Youhou' }))
      .toEqual({ name: 'Master', id: 0 });
    expect(filter(list, 'Session#181', { id: 10, name: 'Youhou' }))
      .toEqual({ name: 'Session#181', id: 181 });
  });
  test('should return viewSession while receiving wildcard or undefined', () => {
    expect(filter(list, '*', { id: 10, name: 'Youhou' }, 'Session#181', 'Master'))
      .toEqual({ name: 'Session#181', id: 181 });
  });
  test('should return pageSession while receiving wildcard or undefined', () => {
    expect(filter(list, '*', { id: 10, name: 'Youhou' }, undefined, 'Session#181', 'Master'))
      .toEqual({ name: 'Session#181', id: 181 });
  });
  test('should return workspace while receiving wildcard or undefined', () => {
    expect(filter(list, '*', { id: 10, name: 'Youhou' }, '*', undefined, 'Session#181'))
      .toEqual({ name: 'Session#181', id: 181 });
  });
  test('should return masterSessionId while receiving wildcard or undefined', () => {
    expect(filter(list, '*', { id: 10, name: 'Youhou' }, '*', '*', '*'))
      .toEqual({ id: 10, name: 'Youhou' });
  });
  test('should support no domain', () => {
    expect(filter(undefined, 'Master', { id: 10, name: 'Youhou' }))
      .toEqual({ error: 'invalid entry point, no session available' });
    expect(filter([], 'Master', { id: 10, name: 'Youhou' }))
      .toEqual({ error: 'invalid entry point, no session available' });
  });
  test('should support no search', () => {
    expect(filter(list, '', { id: 10, name: 'Youhou' }))
      .toEqual({ error: 'invalid entry point, invalid session name' });
    expect(filter(list, undefined, { id: 10, name: 'Youhou' }))
      .toEqual({ error: 'invalid entry point, invalid session name' });
  });
  test('should return nothing if no session matches', () => {
    expect(filter(list, 'unknown', { id: 10, name: 'Youhou' }))
      .toEqual({ error: 'invalid entry point, no session matches' });
  });
  test('should support multiple matches', () => {
    const newList = [{ name: 'Master', id: 0 },
      { name: 'Session#181', id: 181 },
      { name: 'Master', id: 3 }];
    expect(filter(newList, 'Master', { id: 10, name: 'Youhou' }))
      .toEqual({ error: 'invalid entry point, more than one session match' });
  });
  test('should memoize', () => {
    const result = filter(list, 'Master', { id: 10, name: 'Youhou' });
    expect(filter(list, 'Master', { id: 10, name: 'Youhou' })).toBe(result);
  });
  test('should reset memoize on new session list', () => {
    expect(filter(list, 'Master', { id: 10, name: 'Youhou' })).toEqual({ name: 'Master', id: 0 });
    const otherList = [...list];
    otherList[1] = { id: 100, name: 'session100' };
    expect(filter(otherList, 'session100')).toEqual({ id: 100, name: 'session100' });
  });
});
