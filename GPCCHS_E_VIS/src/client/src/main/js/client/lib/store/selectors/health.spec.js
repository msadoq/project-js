import globalConstants from 'common/constants';
import { should, getStore } from '../../common/test';
import {
  getHealth,
  getDcStatus,
  getHssStatus,
  getMainStatus,
  getLastPubSubTimestamp,
  getWindowsStatus,
  getHealthMap,
  getHealthMapForWindow,
} from './health';

describe('store:health:selectors', () => {
  describe('getHealth', () => {
    it('should return state', () => {
      const { getState } = getStore({ health: {} });
      getHealth(getState()).should.equal(getState().health);
    });
  });
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
  describe('getHealthMap', () => {
    const testGetHealthMap = (status) => {
      const state = {
        health: {
          hssStatus: 'HEALTHY',
          mainStatus: 'HEALTHY',
          dcStatus: 'HEALTHY',
          windowsStatus: {
            '59f33479-807b-4427-89d6-35afe5bf71af': 'HEALTHY',
            '59f33479-807b-4427-89d6-35afe5bf71ae': status,
          },
          lastPubSubTimestamp: 1487672503931,
        },
      };
      const { getState } = getStore(state);
      getHealthMap(getState()).should.have.properties({
        dc: state.health.dcStatus,
        hss: state.health.hssStatus,
        main: state.health.mainStatus,
        windows: status,
      });
    };
    it('WARNING', () => {
      testGetHealthMap('WARNING');
    });
    it('CRITICAL', () => {
      testGetHealthMap('CRITICAL');
    });
  });
  it('getHealthMapForWindow', () => {
    const state = {
      health: {
        hssStatus: 'HEALTHY',
        mainStatus: 'HEALTHY',
        dcStatus: 'HEALTHY',
        windowsStatus: {
          '59f33479-807b-4427-89d6-35afe5bf71af': 'HEALTHY',
          '59f33479-807b-4427-89d6-35afe5bf71ae': 'WARNING',
        },
        lastPubSubTimestamp: 1487672503931,
      },
    };
    const { getState } = getStore(state);
    getHealthMapForWindow(
      getState(),
      { windowId: '59f33479-807b-4427-89d6-35afe5bf71af' }
    ).should.have.properties({
      dc: state.health.dcStatus,
      hss: state.health.hssStatus,
      main: state.health.mainStatus,
      lastPubSubTimestamp: 1487672503931,
      window: 'HEALTHY',
    });
  });
});
