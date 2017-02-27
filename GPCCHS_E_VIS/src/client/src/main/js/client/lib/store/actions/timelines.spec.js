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
      actions.update('myTimelineUuid', { sessionId: 'not a number' })(dispatch);
      dispatch.should.not.been.called;
    });
    it('updates sessionId', () => {
      actions.update('myTimelineUuid', { sessionId: 1234 })(dispatch);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_SESSIONID,
        payload: {
          timelineUuid: 'myTimelineUuid',
          sessionId: 1234,
        },
      });
    });
    it('updates offset', () => {
      actions.update('myTimelineUuid', { offset: true })(dispatch);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_OFFSET,
        payload: {
          timelineUuid: 'myTimelineUuid',
          offset: true,
        },
      });
    });
    it('updates id', () => {
      actions.update('myTimelineUuid', { id: true })(dispatch);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_ID,
        payload: {
          timelineUuid: 'myTimelineUuid',
          id: true,
        },
      });
    });
    it('updates sessionId, offset and id', () => {
      actions.update('myTimelineUuid', { sessionId: 1234, offset: true, id: true })(dispatch);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_SESSIONID,
        payload: {
          timelineUuid: 'myTimelineUuid',
          sessionId: 1234,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_OFFSET,
        payload: {
          timelineUuid: 'myTimelineUuid',
          offset: true,
        },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_ID,
        payload: {
          timelineUuid: 'myTimelineUuid',
          id: true,
        },
      });
    });
  });
});
