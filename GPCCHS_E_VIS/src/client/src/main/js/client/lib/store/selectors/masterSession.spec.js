import { should } from '../../common/test';
import { getMasterSessionId } from './masterSession';

describe('store:masterSession:selectors', () => {
  it('should support empty state without error', () => {
    should.not.exist(getMasterSessionId({}));
  });
  it('should returns master sessionId', () => {
    getMasterSessionId({ masterSession: { sessionId: 10 } })
      .should.equal(10);
  });
});
