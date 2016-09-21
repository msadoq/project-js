/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './timelineActions';
import reducer, {
  getTimeline,
} from './timelineReducer';

describe('store:timeline', () => {
  describe('actions & reducer', () => {
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
        });
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
  });
  describe('selectors', () => {
    it('getTimeline', () => {
      const { getState } = getStore({
        timelines: {
          myTimelineId: { id: 'Id' },
        },
      });
      getTimeline(getState(), 'myTimelineId').should.have.property('id', 'Id');
      should.not.exist(getTimeline(getState(), 'unknownId'));
    });
  });
});
