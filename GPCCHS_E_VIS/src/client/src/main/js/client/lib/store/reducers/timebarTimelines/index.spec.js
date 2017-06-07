/* eslint no-unused-expressions: 0 */
import { freezeArgs, getStore } from '../../../common/test';
import timebarTimelinesReducer, { getTimebarTimelines } from '.';
import * as types from '../../types';

const reducer = freezeArgs(timebarTimelinesReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:timebarTimelines:reducer', () => {
  it('does nothing with unknown action', () => {
    const state = reducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual({});
  });
  it('cleans timebarTimelines when close workspace', () => {
    const state = reducer({ a: [1, 2, 3] }, { type: types.HSC_CLOSE_WORKSPACE });
    expect(state).toEqual({});
  });
  it('add timebar and timelines ids when load a workspace', () => {
    const action = {
      type: types.WS_WORKSPACE_OPEN,
      payload: {
        timebars: {
          tb1: {
            uuid: 'tb1',
            timelines: [1, 2, 3],
          },
          tb2: {
            uuid: 'tb2',
            timelines: [1, 2, 3],
          },
        },
      },
    };
    const state = reducer({ a: [1, 2, 3] }, action);
    expect(state).toEqual({
      a: [1, 2, 3],
      tb1: [1, 2, 3],
      tb2: [1, 2, 3],
    });
  });
  it('creates new timebar', () => {
    const action = {
      type: types.WS_TIMEBAR_CREATE_NEW,
      payload: { timebarUuid: 'tb1' },
    };
    const state = reducer({ a: [1, 2, 3] }, action);
    expect(state).toEqual({ a: [1, 2, 3], tb1: [] });
  });
  it('creates new timeline', () => {
    const action = {
      type: types.WS_TIMELINE_CREATE_NEW,
      payload: { timebarUuid: 'tb1', timeline: { uuid: 'tl2' } },
    };
    const state = reducer({ tb1: ['tl1'] }, action);
    expect(state).toEqual({ tb1: ['tl1', 'tl2'] });
  });
  it('removes timeline', () => {
    const action = {
      type: types.WS_TIMELINE_REMOVE,
      payload: { timelineUuid: 'tl1', timebarUuid: 'tb1' },
    };
    const state = reducer({ tb1: ['tl1', 'tl2'], tb2: [] }, action);
    expect(state).toEqual({ tb1: ['tl2'], tb2: [] });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:timebarTimelines:selectors', () => {
  it('getTimebarTimelines: existing id', () => {
    const { getState } = getStore({
      timebarTimelines: {
        myTimebarId: ['tl1', 'tl2'],
        myOtherId: ['tl3'],
      },
    });
    expect(getTimebarTimelines(getState(), { timebarUuid: 'myTimebarId' })).toEqual(['tl1', 'tl2']);
  });
  it('getTimebarTimelines: unknown id', () => {
    const { getState } = getStore({
      timebarTimelines: {
        myTimebarId: ['tl1', 'tl2'],
        myOtherId: ['tl3'],
      },
    });
    expect(getTimebarTimelines(getState(), { timebarUuid: 'unknownId' })).toEqual([]);
  });
});
