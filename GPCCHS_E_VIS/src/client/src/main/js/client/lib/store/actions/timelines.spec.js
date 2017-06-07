/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './timelines';
import {} from '../../common/test';

describe('store:actions:timelines', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('update', () => {
    it('does nothing with empty configuration', () => {
      actions.update('myTimelineUuid', { sessionId: 'not a number' })(dispatch);
      expect(dispatch).not.been.called;
    });
    it('updates sessionName', () => {
      actions.update('myTimelineUuid', { sessionName: 'session1' })(dispatch);
      expect(dispatch).have.been.callCount(1);
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_SESSIONNAME,
        payload: {
          timelineUuid: 'myTimelineUuid',
          sessionName: 'session1',
        },
      });
    });
    it('updates offset', () => {
      actions.update('myTimelineUuid', { offset: true })(dispatch);
      expect(dispatch).have.been.callCount(1);
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_OFFSET,
        payload: {
          timelineUuid: 'myTimelineUuid',
          offset: true,
        },
      });
    });
    it('updates id', () => {
      actions.update('myTimelineUuid', { id: true })(dispatch);
      expect(dispatch).have.been.callCount(1);
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_ID,
        payload: {
          timelineUuid: 'myTimelineUuid',
          id: true,
        },
      });
    });
    it('updates sessionName, offset and id', () => {
      actions.update('myTimelineUuid', { sessionName: 'session1', offset: true, id: true })(dispatch);
      expect(dispatch).have.been.callCount(3);
      expect(dispatch.getCall(0)).have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_SESSIONNAME,
        payload: {
          timelineUuid: 'myTimelineUuid',
          sessionName: 'session1',
        },
      });
      expect(dispatch.getCall(1)).have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_OFFSET,
        payload: {
          timelineUuid: 'myTimelineUuid',
          offset: true,
        },
      });
      expect(dispatch.getCall(2)).have.been.calledWith({
        type: types.WS_TIMELINE_UPDATE_ID,
        payload: {
          timelineUuid: 'myTimelineUuid',
          id: true,
        },
      });
    });
  });
});
