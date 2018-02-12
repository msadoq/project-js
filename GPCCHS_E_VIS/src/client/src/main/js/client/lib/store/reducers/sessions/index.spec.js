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
import sessionsReducer, {
  getSession,
  getSessions,
  getSessionByTimelineId,
  getSessionByNameWithFallback,
} from '.';

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
  test('getSessionByTimelineId :: nominal case', () => {
    const state = {
      sessions: [{ name: 'Master', id: 40 }],
      timelines: {
        '63ed38e3-e47c-4c62-992a-656662123cb5': {
          id: 'session-1',
          uuid: '63ed38e3-e47c-4c62-992a-656662123cb5',
          sessionName: 'Master',
        },
      },
    };
    expect(getSessionByTimelineId(state, { timelineId: 'session-1' }))
      .toEqual({ name: 'Master', id: 40 });
  });
  test('getSessionByTimelineId :: undefined timeline id', () => {
    const state = {
      sessions: [{ name: 'Master', id: 40 }],
      timelines: {
        '63ed38e3-e47c-4c62-992a-656662123cb5': {
          id: 'session-1',
          uuid: '63ed38e3-e47c-4c62-992a-656662123cb5',
          sessionName: 'Master',
        },
      },
    };
    expect(getSessionByTimelineId(state, { timelineId: 'undefined' }))
      .toEqual(undefined);
  });
  describe('getSessionByNameWithFallback', () => {
    const state = {
      views: {
        'view-id': {
          sessionName: 'viewSessionName',
        },
      },
      pages: {
        'page-id': {
          uuid: 'page-id',
          sessionName: 'pageSessionName',
        },
      },
      hsc: {
        sessionName: 'workspaceSessionName',
      },
      sessions: [
        { id: 0, name: 'Master', timestamp: {} },
        { id: 1, name: 'viewSessionName', timestamp: {} },
        { id: 2, name: 'pageSessionName', timestamp: {} },
        { id: 3, name: 'workspaceSessionName', timestamp: {} },
      ],
    };
    test('should find matched session name', () => {
      expect(getSessionByNameWithFallback(state, {
        sessionName: 'Master', viewId: 'view-id', pageId: 'page-id',
      })).toEqual({ id: 0, name: 'Master', timestamp: {} });
    });
    test('should find fallback view session name', () => {
      expect(getSessionByNameWithFallback(state, {
        sessionName: '*', viewId: 'view-id', pageId: 'page-id',
      })).toEqual({ id: 1, name: 'viewSessionName', timestamp: {} });
    });
    test('should find fallback page session name', () => {
      expect(getSessionByNameWithFallback(state, {
        sessionName: '*', viewId: '*', pageId: 'page-id',
      })).toEqual({ id: 2, name: 'pageSessionName', timestamp: {} });
    });
    test('should find fallback workspace session name', () => {
      expect(getSessionByNameWithFallback(state, {
        sessionName: '*', viewId: '*', pageId: '*',
      })).toEqual({ id: 3, name: 'workspaceSessionName', timestamp: {} });
    });
    test('No sessions available', () => {
      expect(getSessionByNameWithFallback({
        ...state,
        sessions: [],
      }, {
        sessionName: 'Master', viewId: 'view-id', pageId: 'page-id',
      })).toEqual({ error: 'invalid entry point, no session available' });
    });
    [undefined, '', 1].forEach(sessionName => (
      test('invalid session name', () => {
        expect(getSessionByNameWithFallback(state, {
          sessionName, viewId: 'view-id', pageId: 'page-id',
        })).toEqual({ error: 'invalid entry point, invalid session name' });
      })
    ));
    test('No sessions available', () => {
      expect(getSessionByNameWithFallback(state, {
        sessionName: 'undefined', viewId: 'view-id', pageId: 'page-id',
      })).toEqual({ error: 'invalid entry point, no session matches' });
    });
    test('more than one session available', () => {
      expect(getSessionByNameWithFallback({
        ...state,
        sessions: [
          { id: 0, name: 'Master', timestamp: {} },
          { id: 0, name: 'Master', timestamp: {} },
        ],
      }, {
        sessionName: 'Master', viewId: 'view-id', pageId: 'page-id',
      })).toEqual({ error: 'invalid entry point, more than one session match' });
    });
    // test('no fallback', () => {
    //   expect(getDomainByNameWithFallback(state, {
    //     domainName: 'domainName-1', viewId: 'view-id', pageId: 'page-id',
    //   })).toEqual({ domainId: 1, name: 'domainName-1' });
    // });
    // test('fallback on view domain name', () => {
    //   expect(getDomainByNameWithFallback(state, {
    //     domainName: '*', viewId: 'view-id', pageId: 'page-id',
    //   })).toEqual({ domainId: 3, name: 'viewDomainName' });
    // });
    // test('fallback on page domain name', () => {
    //   expect(getDomainByNameWithFallback(state, {
    //     domainName: '*', viewId: '*', pageId: 'page-id',
    //   })).toEqual({ domainId: 4, name: 'pageDomainName' });
    // });
    // test('fallback on workspace domain name', () => {
    //   expect(getDomainByNameWithFallback(state, {
    //     domainName: '*', viewId: '*', pageId: '*',
    //   })).toEqual({ domainId: 5, name: 'workspaceDomainName' });
    // });
    // test('invalid configuration', () => {
    //   expect(getDomainByNameWithFallback({
    //     ...state,
    //     hsc: {},
    //   }, {
    //     domainName: '*', viewId: '*', pageId: '*',
    //   })).toEqual({ error: 'invalid entry point, domain not defined on entities' });
    // });
  });
});
