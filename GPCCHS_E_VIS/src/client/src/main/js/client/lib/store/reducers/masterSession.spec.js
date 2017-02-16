import { freezeArgs } from '../../common/test';
import * as actions from '../actions/masterSession';
import masterSessionReducer from './masterSession';

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
