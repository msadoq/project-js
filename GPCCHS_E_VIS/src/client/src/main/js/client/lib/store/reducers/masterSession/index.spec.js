// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : move getMasterSessionId selector from selectors to reducers
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/masterSession';
import masterSessionReducer, { getMasterSessionId } from '.';

const reducer = freezeArgs(masterSessionReducer);

describe('store:masterSession:reducer', () => {
  test('should returns initial state', () => {
    const r = reducer(undefined, {});
    expect(r).toEqual({});
  });
  test('should ignore unknown action', () => {
    const state = { sessionId: 10 };
    expect(reducer(state, {})).toBe(state);
  });
  test('should update masterSessionId', () => {
    expect(reducer(undefined, actions.updateMasterSession(100))).toEqual({ sessionId: 100 });
    expect(reducer(100, actions.updateMasterSession(200))).toEqual({ sessionId: 200 });
  });
});


describe('store:masterSession:selectors', () => {
  describe('getMasterSessionId', () => {
    test('should support empty state without error', () => {
      expect(getMasterSessionId({})).toBeFalsy();
    });
    test('should returns master sessionId', () => {
      expect(getMasterSessionId({ masterSession: { sessionId: 10 } })).toBe(10);
    });
  });
});
