/* eslint-disable no-unused-expressions */
import { HEALTH_STATUS_CRITICAL } from 'common/constants';
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './hsc';
import { freezeMe } from '../../common/test';

describe('store:actions:hsc', () => {
  const state = freezeMe({
    timebars: {
      a: {},
      b: {},
    },
    health: {
      mainStatus: false,
      dcStatus: false,
      hssStatus: false,
      windowsStatus: {},
    },
  });

  const stateCriticalWindows = freezeMe({
    health: {
      mainStatus: false,
      dcStatus: false,
      hssStatus: false,
      windowsStatus: { a: HEALTH_STATUS_CRITICAL, b: null },
    },
  });

  let dispatch;
  const getState = () => state;
  const getStateCritical = () => stateCriticalWindows;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('smartPlay', () => {
    it('warns a message', () => {
      actions.smartPlay('myTimebarUuid')(dispatch, getStateCritical);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.a('function');

      const dispatchedThunk = dispatch.getCall(0).args[0];
      dispatch.reset();  // reset dispatch spy
      dispatchedThunk(dispatch, getState);
      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.have.properties({
        type: types.WS_MESSAGE_ADD,
      });
    });

    it('plays', () => {
      actions.smartPlay('myTimebarUuid')(dispatch, getState);
      dispatch.should.have.been.calledOnce;
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.HSC_PLAY,
        payload: {
          timebarUuid: 'myTimebarUuid',
        },
      });
    });
  });

  describe('pause', () => {
    it('just dispatch pause', () => {
      actions.pause()(dispatch, getStateCritical);
      dispatch.should.have.been.calledOnce;
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.HSC_PAUSE,
      });
    });

    it('pause and setRealTime to false for all windows', () => {
      actions.pause()(dispatch, getState);
      dispatch.should.have.been.callCount(3);

      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.HSC_PAUSE,
      });

      dispatch.getCall(1).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'a',
          flag: false,
        },
      });

      dispatch.getCall(2).should.have.been.calledWith({
        type: types.WS_TIMEBAR_SET_REALTIME,
        payload: {
          timebarUuid: 'b',
          flag: false,
        },
      });
    });
  });
});
