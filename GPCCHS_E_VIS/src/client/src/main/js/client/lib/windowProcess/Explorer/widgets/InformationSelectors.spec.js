import { freezeMe, testMemoization, should } from '../../../common/test';

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
    it('return expected session', () => {
      expect(getMasterSession(state)).toBe(state.sessions[1]);
    });
    it('should returns undefined if no masterSessionId', () => {
      expect(getMasterSession(freezeMe({
        masterSession: {},
        sessions: [
          { id: 9 },
          { id: 10 },
        ],
      }))).toBeFalsy();
    });
    it('should returns undefined if no corresponding session', () => {
      expect(getMasterSession(freezeMe({
        masterSession: { sessionId: 10 },
        sessions: [
          { id: 9 },
        ],
      }))).toBeFalsy();
    });
    it('should memoize', () => {
      testMemoization(getMasterSession, state);
    });
  });
});
