/* eslint no-unused-expressions: 0 */
import { freezeArgs, should, getStore } from '../../../common/test';
import timelinesReducer, { getTimeline, getTimelines } from '.';
import * as types from '../../types';

const reducer = freezeArgs(timelinesReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:timelines:reducer', () => {
  it('initial state', () => {
    expect(typeof reducer(undefined, {})).toHaveLength(0);
  });
  it('unknown action', () => {
    expect(
      reducer({ myTimelineUuid: { id: 'myTimelineId' } }, { payload: { timelineId: 'myTimelineId' } })
    ).toEqual({ myTimelineUuid: { id: 'myTimelineId' } });
  });
  describe('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      expect(typeof newState).toHaveLength(0);
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:timelines:selectors', () => {
  it('getTimeline', () => {
    const { getState } = getStore({
      timelines: {
        myTimelineId: { id: 'Id' },
      },
    });
    expect(getTimeline(getState(), { timelineUuid: 'myTimelineId' })).toHaveProperty('id', 'Id');
    expect(getTimeline(getState(), { timelineUuid: 'unknownId' })).toBeFalsy();
  });
  it('getTimelines', () => {
    const { getState } = getStore({ timelines: true });
    expect(getTimelines(getState())).toBe(true);
  });
});
