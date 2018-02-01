// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all selectors from selectors/sessions to reducers/sessions
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/sessions';
import sessionsReducer, { getSession, getSessions } from '.';

const reducer = freezeArgs(sessionsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:sessions:reducer', () => {
  const state = [{
    name: 'Master',
    id: 0,
    timestamp: { ms: 1479210950713, ps: null },
    delta: 0,
  }];
  const action = actions.updateSessions(state);
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  test('unknown action', () => {
    expect(reducer(state, {})).toEqual(action.payload.sessions);
  });
  test('set state', () => {
    expect(reducer(undefined, action)).toEqual(action.payload.sessions);
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:sessions:selectors', () => {
  test('getSessions', () => {
    expect(getSessions({
      sessions: [{ name: 'Master' }],
    })).toEqual([{ name: 'Master' }]);
  });
  test('getSession', () => {
    expect(getSession({ sessions: [{ name: 'Master' }, { name: 'session1' }] },
    { sessionName: 'Master' })).toEqual({ name: 'Master' });
  });
});
