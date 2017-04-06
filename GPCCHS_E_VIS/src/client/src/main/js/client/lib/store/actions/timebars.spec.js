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
        visuWindow: { lower: 100, current: 150, upper: 117200000 },
        slideWindow: { lower: 160, upper: 170 },
        speed: 1,
        realTime: true,
      },
      tb2: {
        mode: 'Normal',
        speed: 2,
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
      },
      tb3: {
        mode: 'Normal',
        speed: 1,
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
      },
      tb4: {
        mode: 'Fixed',
        speed: 2,
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 400 },
      },
      tb5: {
        mode: 'Normal',
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
      },
      tb6: {
        mode: 'Fixed',
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 400 },
        realTime: true,
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

  describe('updateCursors', () => {
    it('updates cursors (Extensible)', () => {
      actions.updateCursors('tb1', {}, {})(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: {},
          slideWindow: { lower: 100, upper: 117200000 },
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
  describe('restoreWidth', () => {
    it('disables real time then restore width', () => {
      actions.restoreWidth('tb1')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb1',
          flag: false,
        },
      });
    });
    it('restores width', () => {
      actions.restoreWidth('tb3')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.a('function');
    });
  });
  describe('jump', () => {
    it('disables real time then jump', () => {
      actions.jump('tb1', 42)(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb1',
          flag: false,
        },
      });
    });
    it('jumps', () => {
      actions.jump('tb3', 42)(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.a('function');
    });
  });
  describe('goNow', () => {
    it('disables real time then go now', () => {
      actions.goNow('tb1', 42)(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb1',
          flag: false,
        },
      });
    });
    it('goes now', () => {
      actions.goNow('tb3', 42)(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.a('function');
    });
  });
  describe('switchToNormalMode', () => {
    it('updates mode', () => {
      actions.switchToNormalMode('tb3')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb3',
          mode: 'Normal',
        },
      });
    });
    it('updates mode and update cursors', () => {
      actions.switchToNormalMode('tb4')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb4',
          mode: 'Normal',
        },
      });
    });
  });
  describe('switchToRealtimeMode', () => {
    it('sets real time mode and update cursors + smartPlay', () => {
      actions.switchToRealtimeMode('tb3')(dispatch, getState);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(2).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb3',
          flag: true,
        },
      });
    });
    it('sets real time mode, reset speed to 1 and update cursors + smartPlay', () => {
      actions.switchToRealtimeMode('tb2')(dispatch, getState);
      dispatch.should.have.been.callCount(4);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.a('function');
      dispatch.getCall(3).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb2',
          flag: true,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SPEED_UPDATE,
        payload: {
          timebarUuid: 'tb2',
          speed: 1,
        },
      });
    });
    it('sets real time mode, reset mode to Normal and update cursors + smartPlay', () => {
      actions.switchToRealtimeMode('tb1')(dispatch, getState);
      dispatch.should.have.been.callCount(4);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.a('function');
      dispatch.getCall(3).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb1',
          flag: true,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb1',
          mode: 'Normal',
        },
      });
    });
    it('sets real time mode, reset speed to 1, reset mode to Normal and update cursors + smartPlay', () => {
      actions.switchToRealtimeMode('tb4')(dispatch, getState);
      dispatch.should.have.been.callCount(5);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.an('object');
      dispatch.getCall(3).args[0].should.be.a('function');
      dispatch.getCall(4).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb4',
          flag: true,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SPEED_UPDATE,
        payload: {
          timebarUuid: 'tb4',
          speed: 1,
        },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb4',
          mode: 'Normal',
        },
      });
    });
  });
  describe('switchToExtensibleMode', () => {
    it('updates mode to Extensible', () => {
      actions.switchToExtensibleMode('tb4')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb4',
          mode: 'Extensible',
        },
      });
    });
    it('updates mode and disable real time', () => {
      actions.switchToExtensibleMode('tb6')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb6',
          mode: 'Extensible',
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb6',
          flag: false,
        },
      });
    });
    it('updates mode and update cursors', () => {
      actions.switchToExtensibleMode('tb5')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb5',
          mode: 'Extensible',
        },
      });
    });
    it('updates mode, disable real time and update cursors', () => {
      actions.switchToExtensibleMode('tb1')(dispatch, getState);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.a('function');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb1',
          mode: 'Extensible',
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb1',
          flag: false,
        },
      });
    });
  });
  describe('switchToFixedMode', () => {
    it('updates mode', () => {
      actions.switchToFixedMode('tb3')(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb3',
          mode: 'Fixed',
        },
      });
    });
    it('updates mode and update cursors', () => {
      actions.switchToFixedMode('tb4')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.a('function');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb4',
          mode: 'Fixed',
        },
      });
    });
    it('updates mode and disable real time', () => {
      actions.switchToFixedMode('tb1')(dispatch, getState);
      dispatch.should.have.been.callCount(2);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb1',
          mode: 'Fixed',
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb1',
          flag: false,
        },
      });
    });
    it('updates mode, disable real time and update cursors', () => {
      actions.switchToFixedMode('tb6')(dispatch, getState);
      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.a('function');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid: 'tb6',
          mode: 'Fixed',
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'tb6',
          flag: false,
        },
      });
    });
  });
});
