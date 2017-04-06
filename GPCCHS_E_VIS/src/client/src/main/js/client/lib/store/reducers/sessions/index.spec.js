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
  it('initial state', () => {
    reducer(undefined, {}).should.eql([]);
  });
  it('unknown action', () => {
    reducer(state, {}).should.eql(action.payload.sessions);
  });
  it('set state', () => {
    reducer(undefined, action).should.eql(action.payload.sessions);
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:sessions:selectors', () => {
  it('getSessions', () => {
    getSessions({
      sessions: [{ name: 'Master' }],
    }).should.eql([{ name: 'Master' }]);
  });
  it('getSession', () => {
    getSession({ sessions: [{ name: 'Master' }, { name: 'session1' }] },
    { sessionName: 'Master' }).should.eql({ name: 'Master' });
  });
});
