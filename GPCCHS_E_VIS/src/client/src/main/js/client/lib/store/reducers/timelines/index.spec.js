/* eslint no-unused-expressions: 0 */
import { freezeMe, freezeArgs } from '../../../common/test';
import timelinesReducer, { getTimeline, getTimelines } from '.';
import * as types from '../../types';

const reducer = freezeArgs(timelinesReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:timelines:reducer', () => {
  it('set initial state to an empty object', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('doest nothing with unknown action', () => {
    expect(
      reducer({ myTimelineUuid: { id: 'myTimelineId' } }, { payload: { timelineId: 'myTimelineId' } })
    ).toEqual({ myTimelineUuid: { id: 'myTimelineId' } });
  });
  describe('HSC workspace', () => {
    it('erase timelines when close workspace', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      expect(newState).toEqual({});
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:timelines:selectors', () => {
  it('getTimeline', () => {
    const state = freezeMe({
      timelines: {
        myTimelineId: { id: 'Id' },
      },
    });
    expect(getTimeline(state, { timelineUuid: 'myTimelineId' })).toHaveProperty('id', 'Id');
    expect(getTimeline(state, { timelineUuid: 'unknownId' })).toBeFalsy();
  });
  it('getTimelines', () => {
    expect(getTimelines({ timelines: true })).toBe(true);
  });
});
