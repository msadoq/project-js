// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all timelines simple selectors in store/reducers/timelines
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import { freezeMe, freezeArgs } from 'common/jest';
import * as types from 'store/types';
import timelinesReducer, { getTimeline, getTimelines } from '.';

const reducer = freezeArgs(timelinesReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:timelines:reducer', () => {
  test('set initial state to an empty object', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('doest nothing with unknown action', () => {
    expect(
      reducer({ myTimelineUuid: { id: 'myTimelineId' } }, { payload: { timelineId: 'myTimelineId' } })
    ).toEqual({ myTimelineUuid: { id: 'myTimelineId' } });
  });
  describe('HSC workspace', () => {
    test('erase timelines when close workspace', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      expect(newState).toEqual({});
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:timelines:selectors', () => {
  test('getTimeline', () => {
    const state = freezeMe({
      timelines: {
        myTimelineId: { id: 'Id' },
      },
    });
    expect(getTimeline(state, { timelineUuid: 'myTimelineId' })).toHaveProperty('id', 'Id');
    expect(getTimeline(state, { timelineUuid: 'unknownId' })).toBeFalsy();
  });
  test('getTimelines', () => {
    expect(getTimelines({ timelines: true })).toBe(true);
  });
});
