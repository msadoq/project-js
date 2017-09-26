// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : store/reducers/*.spec.js : spliting between plurial and singular specs.
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Add module onDataPull to get data from cache
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import __ from 'lodash/fp';
import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/timebars';
import timebarsReducer from '../timebars';
import * as types from '../../types';

const reducer = freezeArgs(timebarsReducer);

describe('store:timebars:reducer', () => {
  describe('update', () => {
    const tbState = {
      tb1: {
        id: 'tb1',
        visuWindow: {
          lower: 200,
          upper: 400,
          current: 300,
          defaultWidth: 200,
        },
        slideWindow: { lower: 250, upper: 350 },
        rulerStart: 0,
        rulerResolution: 100,
        speed: 10,
        realTime: false,
        mode: 'Normal',
        masterId: 'OtherId',
        timelines: ['myTimelineId', 'myTimelineId3'],
      },
    };
    test('id', () => {
      const newState = reducer(tbState, actions.updateId('tb1', 'newId'));
      expect(newState).toHaveProperty('tb1');
      expect(newState.tb1).toHaveProperty('id');
      expect(newState.tb1.id).toBe('newId');
    });
    test('slideWindow', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          slideWindow: { lower: 250, upper: 42 },
          timebarUuid: 'tb1',
        },
      };
      const newState = reducer(tbState, action);

      // visuWindow
      expect(newState.tb1.visuWindow).toEqual(tbState.tb1.visuWindow);

      // slideWindow
      expect(newState.tb1.slideWindow.lower).toEqual(250);
      expect(newState.tb1.slideWindow.upper).toEqual(42);
    });
    test('visuWindow', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: { lower: 1, upper: 2, current: 3 },
          timebarUuid: 'tb1',
        },
      };
      const newState = reducer(tbState, action);


      // visuWindow
      expect(newState.tb1.visuWindow.lower).toEqual(1);
      expect(newState.tb1.visuWindow.upper).toEqual(2);
      expect(newState.tb1.visuWindow.current).toEqual(3);

      // slideWindow
      expect(newState.tb1.slideWindow).toEqual(tbState.tb1.slideWindow);
    });
    test('empty visuWindow/slideWindow', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: { },
          slideWindow: { },
          timebarUuid: 'tb1',
        },
      };
      expect(reducer(tbState, action)).toEqual(tbState);
    });
    test('should be immutable with same data', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          timebarUuid: 'tb1',
          visuWindow: { lower: 5, upper: 40, current: 30 },
        },
      };
      const newState = reducer(tbState, action);
      expect(reducer(newState, action)).toBe(newState);
    });
    test('speed', () => {
      const action = {
        type: types.WS_TIMEBAR_SPEED_UPDATE,
        payload: {
          timebarUuid: 'tb1',
          speed: 20,
        },
      };
      const newState = reducer(tbState, action);
      expect(newState.tb1.speed).toEqual(20);
    });
    test('defaultWidth', () => {
      const newState = reducer(tbState, actions.updateDefaultWidth('tb1', 10005));
      expect(newState).toHaveProperty('tb1');
      expect(newState.tb1).toHaveProperty('visuWindow');
      expect(newState.tb1.visuWindow).toHaveProperty('defaultWidth');
      expect(newState.tb1.visuWindow.defaultWidth).toBe(10005);
    });
    test('masterId', () => {
      const newState = reducer(tbState, actions.updateMasterId('tb1', 'myTlId'));
      expect(newState).toHaveProperty('tb1');
      expect(newState.tb1).toHaveProperty('masterId');
      expect(newState.tb1.masterId).toBe('myTlId');
    });
    test('realTime', () => {
      const newState = reducer(tbState, actions.setRealTime('tb1', true));
      expect(newState).toHaveProperty('tb1');
      expect(newState.tb1).toHaveProperty('realTime');
      expect(newState.tb1.realTime).toBe(true);
    });
    test('updates rulerStart and rulerResolution', () => {
      const removeRulerProperties = __.update('tb1', __.omit(['rulerStart', 'rulerResolution']));
      const newState = reducer(tbState, actions.updateViewport('tb1', 42, 42));
      expect(newState.tb1.rulerStart).toEqual(42);
      expect(newState.tb1.rulerResolution).toEqual(42);
      expect(removeRulerProperties(tbState)).toEqual(removeRulerProperties(newState));
    });
  });
  describe('switch modes', () => {
    const state = {
      tb1: {
        id: 'tb1',
        visuWindow: {
          lower: 200,
          upper: 400,
          current: 300,
          defauttWidth: 600,
        },
        slideWindow: { lower: 250, upper: 350 },
      },
    };
    test('switch mode', () => {
      const action = {
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: { timebarUuid: 'tb1', mode: 'yolo' },
      };
      const newState = reducer(state, action);
      expect(newState.tb1.mode).toEqual('yolo');
    });
  });
});
