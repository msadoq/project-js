import globalConstants from 'common/constants';
import { should, getStore } from '../../common/test';
import {
  getDcStatus,
  getHssStatus,
  getMainStatus,
  getLastPubSubTimestamp,
  getWindowsStatus,
} from './health';

describe('store:health:selectors', () => {
  describe('getLastPubSubTimestamp', () => {
    it('should return status', () => {
      const { getState } = getStore({ health: { lastPubSubTimestamp: 42 } });
      getLastPubSubTimestamp(getState()).should.eql(42);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getLastPubSubTimestamp(getState()));
    });
  });
  describe('getDcStatus', () => {
    it('should return status', () => {
      const { getState } = getStore({
        health: {
          dcStatus: globalConstants.HEALTH_STATUS_CRITICAL,
        },
      });
      getDcStatus(getState()).should.eql(globalConstants.HEALTH_STATUS_CRITICAL);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getDcStatus(getState()));
    });
  });
  describe('getHssStatus', () => {
    it('should return status', () => {
      const { getState } = getStore({
        health: {
          hssStatus: globalConstants.HEALTH_STATUS_WARNING,
        },
      });
      getHssStatus(getState()).should.eql(globalConstants.HEALTH_STATUS_WARNING);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getHssStatus(getState()));
    });
  });
  describe('getMainStatus', () => {
    it('should return status', () => {
      const { getState } = getStore({
        health: {
          mainStatus: globalConstants.HEALTH_STATUS_WARNING,
        },
      });
      getMainStatus(getState()).should.eql(globalConstants.HEALTH_STATUS_WARNING);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getHssStatus(getState()));
    });
  });
  describe('getWindowsStatus', () => {
    it('should return getSlowRenderers', () => {
      const { getState } = getStore({
        health: {
          windowsStatus: { id42: 42 },
        },
      });
      getWindowsStatus(getState()).should.eql({ id42: 42 });
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getWindowsStatus(getState()));
    });
  });
});
