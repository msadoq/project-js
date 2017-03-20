import { should } from '../../common/test';
import {
  getMasterSessionId,
  getMasterSession,
} from './masterSession';

describe('store:masterSession:selectors', () => {
  describe('getMasterSessionId', () => {
    it('should support empty state without error', () => {
      should.not.exist(getMasterSessionId({}));
    });
    it('should returns master sessionId', () => {
      getMasterSessionId({ masterSession: { sessionId: 10 } }).should.equal(10);
    });
  });
  describe('getMasterSession', () => {
    it('should return master session', () => {
      const state = {
        masterSession: { sessionId: 10 },
        sessions: [{ id: 10 }],
      };
      getMasterSession(state).should.equal(state.sessions[0]);
    });
    it('should support unknown session', () => {
      should.not.exist(getMasterSession({
        masterSession: { sessionId: 11 },
        sessions: [{ id: 10 }],
      }));
      should.not.exist(getMasterSession({
        masterSession: { sessionId: 10 },
        sessions: [],
      }));
    });
    it('should memoize', () => {
      const state = {
        masterSession: { sessionId: 10 },
        sessions: [{ id: 10 }],
      };

      getMasterSession.resetRecomputations();
      const r = getMasterSession(state);
      getMasterSession.recomputations().should.equal(1);
      getMasterSession(state).should.equal(r);
      getMasterSession.recomputations().should.equal(1);
      should.not.exist(getMasterSession({}));
      getMasterSession.recomputations().should.equal(2);
    });
  });
});
