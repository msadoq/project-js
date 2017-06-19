import { freezeMe, testMemoization } from '../../../common/jest';

import { getMasterSession } from './InformationSelectors';

describe('windowProcess:Explorer:InformationSelectors', () => {
  const state = freezeMe({
    masterSession: { sessionId: 10 },
    sessions: [
      { id: 9 },
      { id: 10 },
    ],
  });
  describe('getMasterSession', () => {
    test('return expected session', () => {
      expect(getMasterSession(state)).toBe(state.sessions[1]);
    });
    test('should returns undefined if no masterSessionId', () => {
      expect(getMasterSession(freezeMe({
        masterSession: {},
        sessions: [
          { id: 9 },
          { id: 10 },
        ],
      }))).toBeFalsy();
    });
    test('should returns undefined if no corresponding session', () => {
      expect(getMasterSession(freezeMe({
        masterSession: { sessionId: 10 },
        sessions: [
          { id: 9 },
        ],
      }))).toBeFalsy();
    });
    test('should memoize', () => {
      testMemoization(getMasterSession, state);
    });
  });
});
