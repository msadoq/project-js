// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Remove .only() from unit test
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeMe, testMemoization } from 'common/jest';

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
    test('return expected session', () => {
      expect(getMasterSession(state)).toBe(state.sessions[1]);
    });
    test('should returns undefined if no masterSessionId', () => {
      expect(getMasterSession(freezeMe({
        masterSession: {},
        sessions: [
          { id: 9 },
          { id: 10 },
        ],
      }))).toBeFalsy();
    });
    test('should returns undefined if no corresponding session', () => {
      expect(getMasterSession(freezeMe({
        masterSession: { sessionId: 10 },
        sessions: [
          { id: 9 },
        ],
      }))).toBeFalsy();
    });
    test('should memoize', () => {
      testMemoization(getMasterSession, state);
    });
  });
});
