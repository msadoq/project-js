import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/sessions';
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
