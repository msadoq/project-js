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
