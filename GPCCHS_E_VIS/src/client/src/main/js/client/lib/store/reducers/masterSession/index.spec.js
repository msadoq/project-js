import { freezeArgs, should } from '../../../common/test';
import * as actions from '../../actions/masterSession';
import masterSessionReducer, { getMasterSessionId } from '.';

const reducer = freezeArgs(masterSessionReducer);

describe('store:masterSession:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.eql({});
  });
  it('should ignore unknown action', () => {
    const state = { sessionId: 10 };
    reducer(state, {}).should.equal(state);
  });
  it('should update masterSessionId', () => {
    reducer(undefined, actions.updateMasterSession(100))
      .should.eql({ sessionId: 100 });
    reducer(100, actions.updateMasterSession(200))
      .should.eql({ sessionId: 200 });
  });
});


describe('store:masterSession:selectors', () => {
  describe('getMasterSessionId', () => {
    it('should support empty state without error', () => {
      should.not.exist(getMasterSessionId({}));
    });
    it('should returns master sessionId', () => {
      getMasterSessionId({ masterSession: { sessionId: 10 } }).should.equal(10);
    });
  });
});
