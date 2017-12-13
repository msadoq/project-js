// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

import filter from './timelines';

describe('viewManager/commonData/timelines', () => {
  const list = [
    { id: 'tl1', sessionName: 'session1', offset: 0 },
    { id: 'tl2', sessionName: 'session2', offset: 10 },
    { id: 'other', sessionName: 'sessionOther', offset: -10 },
    { id: undefined, sessionName: 'invalid', offset: 0 },
  ];
  test('exact', () => {
    expect(filter(list, 'tl1')).toEqual({ sessionName: 'session1', offset: 0 });
  });
  test('wildcard', () => {
    expect(filter(list, '*')).toEqual({ sessionName: '*', offset: 0 });
    expect(filter(list, 'tl*')).toEqual({ error: 'invalid entry point, no timeline matches' });
  });
  test('no timeline', () => {
    expect(filter(undefined, 'tl1')).toEqual({ error: 'invalid entry point, no timeline available' });
    expect(filter([], 'tl1')).toEqual({ error: 'invalid entry point, no timeline available' });
  });
  test('no search', () => {
    expect(filter(list, '')).toEqual({ error: 'invalid entry point, no timeline set' });
  });
  test('no match', () => {
    expect(filter(list, 'unknown')).toEqual({ error: 'invalid entry point, no timeline matches' });
  });
});
