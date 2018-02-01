// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/health . . .
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Add tests to reducers/health .
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// END-HISTORY
// ====================================================================

import globalConstants from 'constants';
import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/health';
import * as types from 'store/types';
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
  test('should returns initial state', () => {
    const r = reducer(undefined, {});
    expect(r).toHaveProperty('dcStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    expect(r).toHaveProperty('hssStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    expect(r).toHaveProperty('mainStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    expect(r).toHaveProperty('stress', 'server', false);
    expect(r).toHaveProperty('stress', 'main', false);
    expect(r).toHaveProperty('stress', 'window', false);
    expect(typeof r).toBe('object');
    expect(Object.keys(r.windowsStatus)).toHaveLength(0);
    expect(r).toHaveProperty('lastPubSubTimestamp', null);
  });
  test('should ignore unknown action', () => {
    const state = {
      dcStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      hssStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      mainStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      lastPubSubTimestamp: 42,
      windowsStatus: { id42: 42 },
      stress: {
        main: false,
        server: false,
        window: false,
      },
    };
    expect(reducer(state, {})).toBe(state);
  });
  test('should update utils status', () => {
    expect(
      reducer(undefined, actions.updateDcStatus(globalConstants.HEALTH_STATUS_CRITICAL))
    ).toHaveProperty('dcStatus', globalConstants.HEALTH_STATUS_CRITICAL);
  });
  test('should update hss status', () => {
    expect(
      reducer(undefined, actions.updateHssStatus(globalConstants.HEALTH_STATUS_WARNING))
    ).toHaveProperty('hssStatus', globalConstants.HEALTH_STATUS_WARNING);
  });
  test('should update main status', () => {
    expect(
      reducer(undefined, actions.updateMainStatus(globalConstants.HEALTH_STATUS_HEALTHY))
    ).toHaveProperty('mainStatus', globalConstants.HEALTH_STATUS_HEALTHY);
  });
  test('should update last pubsub timestamp', () => {
    expect(reducer(undefined, actions.updateLastPubSubTimestamp(91))).toHaveProperty('lastPubSubTimestamp', 91);
  });
  test('should update window status', () => {
    const state = { windowsStatus: { id91: 91 } };
    const nextState = reducer(state, actions.updateWindowStatus('id42', 42));
    expect(nextState).toEqual({
      windowsStatus: { id91: 91, id42: 42 },
    });
  });
  test('should clean windowsStatus', () => {
    const state = { windowsStatus: { a: 1, b: 2, c: 3 } };
    expect(reducer(state, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({
      windowsStatus: {},
    });
  });
  test('should remove a window from windowsStaus', () => {
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
    test('should return state', () => {
      const state = { health: 'THE HEALTH' };
      expect(getHealth(state)).toBe('THE HEALTH');
    });
  });
  describe('getLastPubSubTimestamp', () => {
    test('should return status', () => {
      const state = { health: { lastPubSubTimestamp: 42 } };
      expect(getLastPubSubTimestamp(state)).toEqual(42);
    });
    test('should support empty state', () => {
      const state = { health: {} };
      expect(getLastPubSubTimestamp(state)).toBeFalsy();
    });
  });
  describe('getDcStatus', () => {
    test('should return status', () => {
      const state = {
        health: { dcStatus: globalConstants.HEALTH_STATUS_CRITICAL },
      };
      expect(getDcStatus(state)).toEqual(globalConstants.HEALTH_STATUS_CRITICAL);
    });
    test('should support empty state', () => {
      const state = { health: {} };
      expect(getDcStatus(state)).toBeFalsy();
    });
  });
  describe('getHssStatus', () => {
    test('should return status', () => {
      const state = {
        health: { hssStatus: globalConstants.HEALTH_STATUS_WARNING },
      };
      expect(getHssStatus(state)).toEqual(globalConstants.HEALTH_STATUS_WARNING);
    });
    test('should support empty state', () => {
      const state = { health: {} };
      expect(getHssStatus(state)).toBeFalsy();
    });
  });
  describe('getMainStatus', () => {
    test('should return status', () => {
      const state = {
        health: {
          mainStatus: globalConstants.HEALTH_STATUS_WARNING,
        },
      };
      expect(getMainStatus(state)).toEqual(globalConstants.HEALTH_STATUS_WARNING);
    });
    test('should support empty state', () => {
      const state = { health: {} };
      expect(getHssStatus(state)).toBeFalsy();
    });
  });
  describe('getWindowsStatus', () => {
    test('should return getSlowRenderers', () => {
      const state = {
        health: {
          windowsStatus: { id42: 42 },
        },
      };
      expect(getWindowsStatus(state)).toEqual({ id42: 42 });
    });
    test('should support empty state', () => {
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
    test('WARNING', () => {
      testGetHealthMap('WARNING');
    });
    test('CRITICAL', () => {
      testGetHealthMap('CRITICAL');
    });
  });
  test('getHealthMapForWindow', () => {
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
        stress: {
          server: true,
          main: true,
          windows: true,
        },
      },
    };
    expect(getHealthMapForWindow(state, { windowId: '59f33479-807b-4427-89d6-35afe5bf71af' })).toEqual({
      dc: state.health.dcStatus,
      hss: {
        isStressed: state.health.stress.server,
        status: state.health.mainStatus,
      },
      main: {
        isStressed: state.health.stress.main,
        status: state.health.mainStatus,
      },
      lastPubSubTimestamp: 1487672503931,
      windows: {
        isStressed: state.health.stress.windows,
        status: 'HEALTHY',
      },
    });
  });
});
