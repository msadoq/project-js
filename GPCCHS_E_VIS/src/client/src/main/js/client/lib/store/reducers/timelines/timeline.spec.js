// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : store/reducers/*.spec.js : spliting between plurial and singular specs.
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/timelines';
import timelinesReducer from './index';

const reducer = freezeArgs(timelinesReducer);

describe('store:timelines:reducer', () => {
  describe('update ', () => {
    test('sessionId', () => {
      const state = reducer(
        { myTimelineUuid: { sessionId: 1 } },
        actions.updateSessionName('myTimelineUuid', 'Session2')
      );
      expect(state).toHaveProperty('myTimelineUuid');
      expect(state.myTimelineUuid.sessionName).toBe('Session2');
    });
    test('offset', () => {
      const state = reducer(
        { myTimelineUuid: { offset: 0 } },
        actions.updateOffset('myTimelineUuid', 1000)
      );
      expect(state).toHaveProperty('myTimelineUuid');
      expect(state.myTimelineUuid.offset).toBe(1000);
    });
    test('color', () => {
      const state = reducer(
        { myTimelineUuid: { color: '#ffaaff' } },
        actions.updateColor('myTimelineUuid', '#ffaaaa')
      );
      expect(state).toHaveProperty('myTimelineUuid');
      expect(state.myTimelineUuid.color).toBe('#ffaaaa');
    });
    test('id', () => {
      const state = reducer(
        { myTimelineUuid: { id: 'Timeline 01' } },
        actions.updateId('myTimelineUuid', 'Timeline 02')
      );
      expect(state).toHaveProperty('myTimelineUuid');
      expect(state.myTimelineUuid.id).toBe('Timeline 02');
    });
  });
});
