import globalConstants from '../../../constants';
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/health';
import * as types from '../../types';
import healthReducer, {
  getHealth,
  getDcStatus,
  getHssStatus,
  getMainStatus,
  getLastPubSubTimestamp,
  getWindowsStatus,
  getHealthMap,
  getHealthMapForWindow,
} from '.';

const reducer = freezeArgs(healthReducer);

describe('store:health:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    expect(r).toHaveProperty('dcStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    expect(r).toHaveProperty('hssStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    expect(r).toHaveProperty('mainStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    expect(typeof r).toBe('object');
    expect(Object.keys(r.windowsStatus)).toHaveLength(0);
    expect(r).toHaveProperty('lastPubSubTimestamp', null);
  });
  it('should ignore unknown action', () => {
    const state = {
      dcStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      hssStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      mainStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      lastPubSubTimestamp: 42,
      windowsStatus: { id42: 42 },
    };
    expect(reducer(state, {})).toBe(state);
  });
  it('should update utils status', () => {
    expect(
      reducer(undefined, actions.updateDcStatus(globalConstants.HEALTH_STATUS_CRITICAL))
    ).toHaveProperty('dcStatus', globalConstants.HEALTH_STATUS_CRITICAL);
  });
  it('should update hss status', () => {
    expect(
      reducer(undefined, actions.updateHssStatus(globalConstants.HEALTH_STATUS_WARNING))
    ).toHaveProperty('hssStatus', globalConstants.HEALTH_STATUS_WARNING);
  });
  it('should update main status', () => {
    expect(
      reducer(undefined, actions.updateMainStatus(globalConstants.HEALTH_STATUS_HEALTHY))
    ).toHaveProperty('mainStatus', globalConstants.HEALTH_STATUS_HEALTHY);
  });
  it('should update last pubsub timestamp', () => {
    expect(reducer(undefined, actions.updateLastPubSubTimestamp(91))).toHaveProperty('lastPubSubTimestamp', 91);
  });
  it('should update window status', () => {
    const state = { windowsStatus: { id91: 91 } };
    const nextState = reducer(state, actions.updateWindowStatus('id42', 42));
    expect(nextState).toEqual({
      windowsStatus: { id91: 91, id42: 42 },
    });
  });
  it('should clean windowsStatus', () => {
    const state = { windowsStatus: { a: 1, b: 2, c: 3 } };
    expect(reducer(state, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({
      windowsStatus: {},
    });
  });
  it('should remove a window from windowsStaus', () => {
    const state = { windowsStatus: { a: 1, b: 2, c: 3 } };
    expect(
      reducer(state, { type: types.WS_WINDOW_CLOSE, payload: { windowId: 'a' } })
    ).toEqual({
      windowsStatus: { b: 2, c: 3 },
    });
  });
});


describe('store:health:selectors', () => {
  describe('getHealth', () => {
    it('should return state', () => {
      const state = { health: 'THE HEALTH' };
      expect(getHealth(state)).toBe('THE HEALTH');
    });
  });
  describe('getLastPubSubTimestamp', () => {
    it('should return status', () => {
      const state = { health: { lastPubSubTimestamp: 42 } };
      expect(getLastPubSubTimestamp(state)).toEqual(42);
    });
    it('should support empty state', () => {
      const state = { health: {} };
      expect(getLastPubSubTimestamp(state)).toBeFalsy();
    });
  });
  describe('getDcStatus', () => {
    it('should return status', () => {
      const state = {
        health: { dcStatus: globalConstants.HEALTH_STATUS_CRITICAL },
      };
      expect(getDcStatus(state)).toEqual(globalConstants.HEALTH_STATUS_CRITICAL);
    });
    it('should support empty state', () => {
      const state = { health: {} };
      expect(getDcStatus(state)).toBeFalsy();
    });
  });
  describe('getHssStatus', () => {
    it('should return status', () => {
      const state = {
        health: { hssStatus: globalConstants.HEALTH_STATUS_WARNING },
      };
      expect(getHssStatus(state)).toEqual(globalConstants.HEALTH_STATUS_WARNING);
    });
    it('should support empty state', () => {
      const state = { health: {} };
      expect(getHssStatus(state)).toBeFalsy();
    });
  });
  describe('getMainStatus', () => {
    it('should return status', () => {
      const state = {
        health: {
          mainStatus: globalConstants.HEALTH_STATUS_WARNING,
        },
      };
      expect(getMainStatus(state)).toEqual(globalConstants.HEALTH_STATUS_WARNING);
    });
    it('should support empty state', () => {
      const state = { health: {} };
      expect(getHssStatus(state)).toBeFalsy();
    });
  });
  describe('getWindowsStatus', () => {
    it('should return getSlowRenderers', () => {
      const state = {
        health: {
          windowsStatus: { id42: 42 },
        },
      };
      expect(getWindowsStatus(state)).toEqual({ id42: 42 });
    });
    it('should support empty state', () => {
      const state = { health: {} };
      expect(getWindowsStatus(state)).toBeFalsy();
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
      expect(getHealthMap(state)).toEqual({
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
    expect(getHealthMapForWindow(state, { windowId: '59f33479-807b-4427-89d6-35afe5bf71af' })).toEqual({
      dc: state.health.dcStatus,
      hss: state.health.hssStatus,
      main: state.health.mainStatus,
      lastPubSubTimestamp: 1487672503931,
      window: 'HEALTHY',
    });
  });
});
