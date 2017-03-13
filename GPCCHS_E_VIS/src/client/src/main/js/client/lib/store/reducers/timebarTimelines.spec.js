/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../common/test';
import timebarTimelinesReducer from './timebarTimelines';
import * as types from '../types';

const reducer = freezeArgs(timebarTimelinesReducer);

describe('store:timebarTimelines:reducer', () => {
  it('does nothing with unknown action', () => {
    const state = reducer(undefined, { type: 'DUMMY_ACTION' });
    state.should.be.eql({});
  });
  it('cleans timebarTimelines when close workspace', () => {
    const state = reducer({ a: [1, 2, 3] }, { type: types.HSC_CLOSE_WORKSPACE });
    state.should.be.eql({});
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
    state.should.be.eql({
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
    state.should.be.eql({ a: [1, 2, 3], tb1: [] });
  });
  it('creates new timeline', () => {
    const action = {
      type: types.WS_TIMELINE_CREATE_NEW,
      payload: { timebarUuid: 'tb1', timeline: { uuid: 'tl2' } },
    };
    const state = reducer({ tb1: ['tl1'] }, action);
    state.should.be.eql({ tb1: ['tl1', 'tl2'] });
  });
  it('removes timeline', () => {
    const action = {
      type: types.WS_TIMELINE_REMOVE,
      payload: { timelineUuid: 'tl1', timebarUuid: 'tb1' },
    };
    const state = reducer({ tb1: ['tl1', 'tl2'], tb2: [] }, action);
    state.should.be.eql({ tb1: ['tl2'], tb2: [] });
  });
});
