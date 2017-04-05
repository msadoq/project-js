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
      getMasterSession(state).should.equal(state.sessions[1]);
    });
    it('should returns undefined if no masterSessionId', () => {
      should.not.exist(getMasterSession(freezeMe({
        masterSession: {},
        sessions: [
          { id: 9 },
          { id: 10 },
        ],
      })));
    });
    it('should returns undefined if no corresponding session', () => {
      should.not.exist(getMasterSession(freezeMe({
        masterSession: { sessionId: 10 },
        sessions: [
          { id: 9 },
        ],
      })));
    });
    it('should memoize', () => {
      testMemoization(getMasterSession, state);
    });
  });
});
