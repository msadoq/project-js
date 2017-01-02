/* eslint no-unused-expressions: 0 */
import '../../common/test';
import * as actions from '../actions/timelines';
import reducer from './timelines';
import * as types from '../types';

describe('store:timelines:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myTimelineId: { id: 'Id' } }, {})
      .should.eql({ myTimelineId: { id: 'Id' } });
  });
  describe('add', () => {
    it('add', () => {
      const fixture = {
        id: 'Id',
        offset: 10,
        kind: 'DataSet',
        sessionId: 100
      };
      const state = reducer(
        undefined,
        actions.add('myTimelineId', fixture)
      );
      state.myTimelineId.should.have.properties(fixture);
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions.add('myTimelineId')
      );
      state.myTimelineId.should.have.properties({
        id: null,
        offset: 0,
        kind: 'Session',
        sessionId: null,
        color: null,
      });
    });
  });
  describe('update ', () => {
    it('sessionId', () => {
      const state = reducer(
        { myTimelineId: { sessionId: 1 } },
        actions.updateSessionId('myTimelineId', 2)
      );
      state.should.have.property('myTimelineId');
      state.myTimelineId.sessionId.should.equal(2);
    });
    it('offset', () => {
      const state = reducer(
        { myTimelineId: { offset: 0 } },
        actions.updateOffset('myTimelineId', 1000)
      );
      state.should.have.property('myTimelineId');
      state.myTimelineId.offset.should.equal(1000);
    });
    it('id', () => {
      const state = reducer(
        { myTimelineId: { id: 'Timeline 01' } },
        actions.updateId('myTimelineId', 'Timeline 02')
      );
      state.should.have.property('myTimelineId');
      state.myTimelineId.id.should.equal('Timeline 02');
    });
  });
  describe('remove', () => {
    it('remove', () => {
      const state = reducer(
        { myTimelineId: { id: 'Id' } },
        actions.remove('myTimelineId')
      );
      state.should.not.have.property('myTimelineId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myTimelineId: { id: 'Id' } },
        actions.remove('foo')
      );
      state.should.have.property('myTimelineId');
    });
  });
  describe('close_workspace', () => {
    const newState = reducer({ myTimelineId: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
    newState.should.be.an('object').that.is.empty;
  });
});
