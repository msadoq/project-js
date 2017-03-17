/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import timelinesReducer from '.';
import * as types from '../../types';

const reducer = freezeArgs(timelinesReducer);

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
