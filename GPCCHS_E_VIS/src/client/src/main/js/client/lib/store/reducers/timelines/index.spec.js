/* eslint no-unused-expressions: 0 */
import { freezeArgs, should, getStore } from '../../../common/test';
import timelinesReducer, { getTimeline, getTimelines } from '.';
import * as types from '../../types';

const reducer = freezeArgs(timelinesReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:timelines:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myTimelineUuid: { id: 'myTimelineId' } }, { payload: { timelineId: 'myTimelineId' } })
      .should.eql({ myTimelineUuid: { id: 'myTimelineId' } });
  });
  describe('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
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
    getTimeline(getState(), { timelineUuid: 'myTimelineId' }).should.have.property('id', 'Id');
    should.not.exist(getTimeline(getState(), { timelineUuid: 'unknownId' }));
  });
  it('getTimelines', () => {
    const { getState } = getStore({ timelines: true });
    getTimelines(getState()).should.be.true;
  });
});
