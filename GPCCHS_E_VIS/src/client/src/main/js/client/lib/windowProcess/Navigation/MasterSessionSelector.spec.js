import { should } from '../../common/test';
import { getMasterSession } from './MasterSessionSelector';

describe('store:masterSession:selectors', () => {
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
