/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../common/test';
import * as actions from '../actions/timelines';
import timelinesReducer from './timelines';
import * as types from '../types';

const reducer = freezeArgs(timelinesReducer);

describe('store:timelines:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myTimelineUuid: { id: 'myTimelineId' } }, { payload: { timelineId: 'myTimelineId' } })
      .should.eql({ myTimelineUuid: { id: 'myTimelineId' } });
  });
  describe('add', () => {
    it('add', () => {
      const fixture = {
        id: 'Id',
        offset: 10,
        kind: 'DataSet',
        sessionId: 100,
      };
      const state = reducer(
        undefined,
        actions.add('myTimelineUuid', fixture)
      );
      state.myTimelineUuid.should.have.properties(fixture);
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions.add('myTimelineUuid')
      );
      state.myTimelineUuid.should.have.properties({
        id: null,
        offset: 0,
        kind: 'Session',
        sessionId: null,
        color: '#31b0d5',
      });
    });
  });
  describe('remove', () => {
    it('remove', () => {
      const state = reducer(
        { myTimelineUuid: { id: 'Id' } },
        actions.remove('myTimelineUuid')
      );
      state.should.not.have.property('myTimelineUuid');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myTimelineUuid: { id: 'Id' } },
        actions.remove('foo')
      );
      state.should.have.property('myTimelineUuid');
    });
  });
  describe('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
});
