import { should } from '../../common/test';
import {
  getMasterSessionId,
  getMasterSession,
} from './masterSession';

describe('store:masterSession:selectors', () => {
  it('should support empty state without error', () => {
    should.not.exist(getMasterSessionId({}));
  });
  it('should returns master sessionId', () => {
    getMasterSessionId({ masterSession: { sessionId: 10 } })
      .should.equal(10);
  });
  it('should return master session', () => {
    const state = {
      masterSession: { sessionId: 10 },
      sessions: [{ id: 10 }],
    };
    getMasterSession(state).should.eql({ id: 10 });
  });
});
