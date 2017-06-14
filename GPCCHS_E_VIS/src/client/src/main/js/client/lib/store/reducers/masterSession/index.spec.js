import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/masterSession';
import masterSessionReducer, { getMasterSessionId } from '.';

const reducer = freezeArgs(masterSessionReducer);

describe('store:masterSession:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    expect(r).toEqual({});
  });
  it('should ignore unknown action', () => {
    const state = { sessionId: 10 };
    expect(reducer(state, {})).toBe(state);
  });
  it('should update masterSessionId', () => {
    expect(reducer(undefined, actions.updateMasterSession(100))).toEqual({ sessionId: 100 });
    expect(reducer(100, actions.updateMasterSession(200))).toEqual({ sessionId: 200 });
  });
});


describe('store:masterSession:selectors', () => {
  describe('getMasterSessionId', () => {
    it('should support empty state without error', () => {
      expect(getMasterSessionId({})).toBeFalsy();
    });
    it('should returns master sessionId', () => {
      expect(getMasterSessionId({ masterSession: { sessionId: 10 } })).toBe(10);
    });
  });
});
