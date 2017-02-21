/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './timebars';
import { freezeMe } from '../../common/test';

describe('store:actions:timebars', () => {
  const state = freezeMe({
    hsc: {
      playingTimebarId: 'tb1',
    },
    messages: {
      'timeSetter-tb3': ['1', '2', '3', '4'],
    },
    timebars: {
      tb1: {
        mode: 'Extensible',
        masterId: 'masterId',
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
        speed: 1,
        realTime: true,
      },
      tb2: {
        mode: 'Normal',
      },
      tb3: {
        mode: 'Fixed',
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
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

  describe('add', () => {
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
  describe('updateCursors', () => {
    it('updates cursors (Extensible)', () => {
      actions.updateCursors('tb1', {}, {})(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: {},
          slideWindow: { lower: 100, upper: 200 },
          timebarUuid: 'tb1',
        },
      });
    });
    it('updates cursors (Fixed)', () => {
      const visuWindow = { lower: 1, upper: 400, current: 250 };
      const slideWindow = { lower: 100, upper: 200 };
      actions.updateCursors('tb2', visuWindow, slideWindow)(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: { lower: 1, upper: 400, current: 250 },
          slideWindow: { lower: 100, upper: 400 },
          timebarUuid: 'tb2',
        },
      });
    });
    it('reset messages and updates cursors', () => {
      actions.updateCursors('tb3', {}, {})(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_MESSAGE_RESET,
        payload: {
          containerId: 'timeSetter-tb3',
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: {},
          slideWindow: { lower: 100, upper: 170 },
          timebarUuid: 'tb3',
        },
      });
    });
    it('dispatches 3 thunks', () => {
      const visuWindow = { lower: 200, upper: 1, current: 100 };
      const slideWindow = { lower: 100, upper: 200 };
      actions.updateCursors('tb2', visuWindow, slideWindow)(dispatch, getState);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.a('function');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(2).args[0].should.be.a('function');
    });
  });

  describe('handlePlay', () => {
    it('doest nothing without playingTimebarUuid', () => {
      actions.handlePlay(0, 0)(dispatch, () => ({}));
      dispatch.should.have.not.been.called;
    });
    it('doest nothing without playingTimebar', () => {
      actions.handlePlay(0, 0)(dispatch, () => ({ timebars: [], hsc: { playingTimebarId: 1234 } }));
      dispatch.should.have.not.been.called;
    });
    it('updates cursors', () => {
      actions.handlePlay(0, 0)(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.a('function');
    });
  });
  describe('updateSpeed', () => {
    it('disables real time then update speed', () => {
      actions.updateSpeed('tb1', 42)(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb1',
          flag: false,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SPEED_UPDATE,
        payload: {
          timebarUuid: 'tb1',
          speed: 42,
        },
      });
    });
    it('updates speed', () => {
      actions.updateSpeed('tb2', 42)(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SPEED_UPDATE,
        payload: {
          timebarUuid: 'tb2',
          speed: 42,
        },
      });
    });
  });
});
