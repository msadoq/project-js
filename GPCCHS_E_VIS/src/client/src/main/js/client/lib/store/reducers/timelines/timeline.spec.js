/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/timelines';
import timelinesReducer from '.././timelines';

const reducer = freezeArgs(timelinesReducer);

describe('store:timelines:reducer', () => {
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
});
