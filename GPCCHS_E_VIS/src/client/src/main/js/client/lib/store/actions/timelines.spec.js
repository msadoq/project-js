/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './timelines';
import {} from '../../common/test';

describe('store:actions:pages', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('update', () => {
    it('does nothing with empty configuration', () => {
      actions.update('myTimelineId', { sessionId: 'not a number' })(dispatch);
      dispatch.should.not.been.called;
    });
    it('updates sessionId', () => {
      actions.update('myTimelineId', { sessionId: 1234 })(dispatch);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_SESSIONID,
        payload: {
          timelineId: 'myTimelineId',
          sessionId: 1234,
        },
      });
    });
    it('updates offset', () => {
      actions.update('myTimelineId', { offset: true })(dispatch);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_OFFSET,
        payload: {
          timelineId: 'myTimelineId',
          offset: true,
        },
      });
    });
    it('updates id', () => {
      actions.update('myTimelineId', { id: true })(dispatch);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_ID,
        payload: {
          timelineId: 'myTimelineId',
          id: true,
        },
      });
    });
    it('updates sessionId, offset and id', () => {
      actions.update('myTimelineId', { sessionId: 1234, offset: true, id: true })(dispatch);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_SESSIONID,
        payload: {
          timelineId: 'myTimelineId',
          sessionId: 1234,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_OFFSET,
        payload: {
          timelineId: 'myTimelineId',
          offset: true,
        },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_ID,
        payload: {
          timelineId: 'myTimelineId',
          id: true,
        },
      });
    });
  });
});
