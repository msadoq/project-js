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
  describe('update ', () => {
    it('sessionId', () => {
      const state = reducer(
        { myTimelineUuid: { sessionId: 1 } },
        actions.updateSessionId('myTimelineUuid', 2)
      );
      state.should.have.property('myTimelineUuid');
      state.myTimelineUuid.sessionId.should.equal(2);
    });
    it('offset', () => {
      const state = reducer(
        { myTimelineUuid: { offset: 0 } },
        actions.updateOffset('myTimelineUuid', 1000)
      );
      state.should.have.property('myTimelineUuid');
      state.myTimelineUuid.offset.should.equal(1000);
    });
    it('color', () => {
      const state = reducer(
        { myTimelineUuid: { color: '#ffaaff' } },
        actions.updateColor('myTimelineUuid', '#ffaaaa')
      );
      state.should.have.property('myTimelineUuid');
      state.myTimelineUuid.color.should.equal('#ffaaaa');
    });
    it('id', () => {
      const state = reducer(
        { myTimelineUuid: { id: 'Timeline 01' } },
        actions.updateId('myTimelineUuid', 'Timeline 02')
      );
      state.should.have.property('myTimelineUuid');
      state.myTimelineUuid.id.should.equal('Timeline 02');
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
  describe('close_workspace', () => {
    const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
    newState.should.be.an('object').that.is.empty;
  });
});
