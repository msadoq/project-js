/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './timebars';
import { freezeMe } from '../../common/test';

describe('store:actions:timebars', () => {
  const state = freezeMe({
    timebars: {
      tb1: {
        masterId: 'masterId',
      },
    },
    timelines: {
      tl1: { id: 'myTimelineId', sessionId: 1 },
      invalidSessionId: { id: 'myTimelineId', sessionId: 'string' },
      invalidId: { sessionId: 1 },
      other: { id: 'other', sessionId: 1 },
      tl2: { id: 'myOtherTimelineId', sessionId: 2 },
    },
    timebarTimelines: {
      tb1: ['tl1', 'tl2'],
      myOtherId: ['other'],
    },
  });
  let dispatch;
  const getState = () => state;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  it('add new timebar without timelines', () => {
    actions.add('newTB', { masterId: 'masterId2' })(dispatch, getState);

    dispatch.should.have.been.callCount(2);
    dispatch.getCall(0).args[0].should.be.a('object');
    dispatch.getCall(1).args[0].should.be.an('object');

    dispatch.getCall(0).should.have.been.calledWith({
      type: types.WS_TIMEBAR_ADD,
      payload: { timebarUuid: 'newTB', configuration: { masterId: 'masterId2' } },
    });
    dispatch.getCall(1).should.have.been.calledWith({
      type: types.WS_TBTL_ADD_TIMEBAR,
      payload: { timebarUuid: 'newTB' },
    });
  });
  it('add new timebar with timelines', () => {
    const configuration = { masterId: 'masterId2', timelines: ['tl3', 'tl4'] };
    actions.add('newTB', configuration)(dispatch, getState);
    dispatch.should.have.been.callCount(4);
    dispatch.getCall(0).args[0].should.be.a('object');
    dispatch.getCall(1).args[0].should.be.an('object');
    dispatch.getCall(2).args[0].should.be.an('object');
    dispatch.getCall(3).args[0].should.be.an('object');
    dispatch.getCall(0).should.have.been.calledWith({
      type: types.WS_TIMEBAR_ADD,
      payload: { timebarUuid: 'newTB', configuration },
    });
    dispatch.getCall(1).should.have.been.calledWith({
      type: types.WS_TBTL_ADD_TIMEBAR,
      payload: { timebarUuid: 'newTB' },
    });
    dispatch.getCall(2).should.have.been.calledWith({
      type: types.WS_TBTL_MOUNT_TIMELINE,
      payload: { timebarUuid: 'newTB', timelineUuid: 'tl3' },
    });
    dispatch.getCall(3).should.have.been.calledWith({
      type: types.WS_TBTL_MOUNT_TIMELINE,
      payload: { timebarUuid: 'newTB', timelineUuid: 'tl4' },
    });
  });
  it('add existing timebar', () => {
    const configuration = { masterId: 'masterId3' };
    actions.add('tb1', configuration)(dispatch, getState);
    dispatch.should.have.been.callCount(0);
  });
});
