/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import * as types from '../types';
import * as actions from './health';
import { freezeMe } from '../../common/test';

describe('store:actions:health', () => {
  const state = freezeMe({
    health: {
      dcStatus: false,
      hssStatus: false,
      lastPubSubTimestamp: 0,
    },
  });

  let dispatch;
  const getState = () => state;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('updateHealth', () => {
    it('does nothing when no status has changed', () => {
      actions.updateHealth(state.health)(dispatch, getState);
      dispatch.should.not.be.called;
    });

    it('does update all status', (done) => {
      const status = { dcStatus: true, hssStatus: true, lastPubSubTimestamp: 42 };
      actions.updateHealth(status, 5)(dispatch, getState);

      dispatch.should.have.been.callCount(3);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(1).args[0].should.be.an('object');
      dispatch.getCall(2).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.HSS_UPDATE_DC_STATUS,
        payload: {
          status: true,
        },
      });
      dispatch.getCall(1).should.have.been.calledWith({
        type: types.HSS_UPDATE_HEALTH_STATUS,
        payload: {
          status: true,
        },
      });
      dispatch.getCall(2).should.have.been.calledWith({
        type: types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP,
        payload: {
          timestamp: 42,
        },
      });
      setTimeout(done, 10); // waiting 5 ms throttle
    });

    it('does update dc status', (done) => {
      const status = { dcStatus: true, hssStatus: false, lastPubSubTimestamp: 0 };
      actions.updateHealth(status, 5)(dispatch, getState);

      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');
      dispatch.getCall(0).should.have.been.calledWith({
        type: types.HSS_UPDATE_DC_STATUS,
        payload: {
          status: true,
        },
      });
      setTimeout(done, 10); // waiting 5 ms throttle
    });

    it('does update hss status', (done) => {
      const status = { dcStatus: false, hssStatus: true, lastPubSubTimestamp: 0 };
      actions.updateHealth(status, 5)(dispatch, getState);

      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.HSS_UPDATE_HEALTH_STATUS,
        payload: {
          status: true,
        },
      });
      setTimeout(done, 10); // waiting 5 ms throttle
    });

    it('does update lastPubSubTimestamp status (throttled)', (done) => {
      const status = { dcStatus: false, hssStatus: false, lastPubSubTimestamp: 42 };
      actions.updateHealth(status, 5)(dispatch, getState);
      actions.updateHealth(status, 5)(dispatch, getState);

      dispatch.should.have.been.callCount(1);
      dispatch.getCall(0).args[0].should.be.an('object');

      dispatch.getCall(0).should.have.been.calledWith({
        type: types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP,
        payload: {
          timestamp: 42,
        },
      });
      setTimeout(done, 10); // waiting 5 ms throttle
    });

    it('throttles updateLastPubSubTimestamp using second parameter as delay', (done) => {
      const status = { dcStatus: false, hssStatus: false, lastPubSubTimestamp: 42 };
      actions.updateHealth(status, 5)(dispatch, getState);
      setTimeout(() => {
        actions.updateHealth(status, 5)(dispatch, getState);

        dispatch.should.have.been.callCount(2);
        dispatch.getCall(0).args[0].should.be.an('object');
        dispatch.getCall(1).args[0].should.be.an('object');

        dispatch.getCall(0).should.have.been.calledWith({
          type: types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP,
          payload: {
            timestamp: 42,
          },
        });
        dispatch.getCall(1).should.have.been.calledWith({
          type: types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP,
          payload: {
            timestamp: 42,
          },
        });

        done();
      }, 10);
    });
  });
});
