// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add PlotView and DynamicView configurationReducer in viewManager
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Remove old configuration reducers from reducers/views/configuration
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Fixed tests - auto axis creation when new EntryPoint.
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import { freezeMe } from 'common/jest';
import { updateAxis, addAxis, removeAxis, getYAxis, createAxis } from './axes';

describe('store:views:axes', () => {
  const state = freezeMe({
    axes: {
      axis_1: { label: 'AXIS1', id: 'axis_1', unit: 'volts' },
      axis_2: { label: 'AXIS2', id: 'axis_2', unit: 'seconds' },
      axis_1_1: {},
    },
  });
  describe('updateAxis', () => {
    test('does nothing when received an unknown viewId', () => {
      const newState = updateAxis(state, freezeMe({ payload: {} }));
      expect(newState).toEqual(state);
    });
    test('does nothing when received an unknown axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { } }));
      expect(newState).toEqual(state);
    });
    test('does nothing when received an unknown axisId', () => {
      const newState = updateAxis(state, freezeMe({ payload: { axis: true } }));
      expect(newState).toEqual(state);
    });
    test('updates axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { axisId: 'axis_1', axis: { someValues: true } } }));
      expect(newState).not.toEqual(state);
      expect(newState.axes.axis_1.someValues).toBe(true);
      expect(newState.axes.axis_1.id).toEqual('axis_1');
    });
  });

  describe('addAxis', () => {
    test('does nothing when received an unknown axis', () => {
      const newState = addAxis(state, { payload: { } });
      expect(newState).toEqual(state);
    });
    test('does nothing when received an axis without label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: {} } });
      expect(newState).toEqual(state);
    });
    test('adds axis with given id', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'yolo', id: 'axis42' } } });
      expect(newState).not.toEqual(state);
      expect(newState.axes.axis42).toEqual({ label: 'yolo', id: 'axis42' });
      expect(newState.axes.axis_1).toEqual(state.axes.axis_1);
    });
    test('adds axis generating new id from label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'axis_1' } } });
      expect(newState).not.toEqual(state);
      expect(newState.axes.axis_1_2).toEqual({ label: 'axis_1', id: 'axis_1_2' });
      expect(newState.axes.axis_1).toEqual(state.axes.axis_1);
    });
  });

  describe('removeAxis', () => {
    test('does nothing when no axisId', () => {
      const newState = removeAxis(state, { payload: { } });
      expect(newState).toEqual(state);
    });
    test('does nothing when received an unknown axisId', () => {
      const newState = removeAxis(state, { payload: { axisId: 'unknown' } });
      expect(newState).toEqual(state);
    });
    test('removes axis', () => {
      const newState = removeAxis(state, { payload: { viewId: 'view1', axisId: 'axis_1' } });
      expect(newState.axes.axis_1).toBeFalsy();
    });
  });

  describe('getAxes', () => {
    test('returns 1 generated Y axis', () => {
      const entryPoint = {
        name: 'time',
        connectedData: { unit: 'useless' },
      };
      const axisY = getYAxis(state, { payload: { entryPoint } });
      expect(axisY.label).toEqual('time');
      expect(axisY.id).toEqual('Y:time');
      expect(axisY.unit).toEqual('useless');
    });
    test('returns found Y Axis', () => {
      const entryPoint = {
        name: 'ep2',
        connectedData: { axisId: 'axis_1' },
      };
      const axisY = getYAxis(state, { payload: { entryPoint } });
      expect(axisY).toEqual({ label: 'AXIS1', unit: 'volts', id: 'axis_1' });
    });
  });

  describe('createAxis', () => {
    test('createAxis', () => {
      const label = 'vBat';
      const unit = 'V';
      expect(createAxis(state, label, unit)).toEqual({
        autoLimits: true,
        showTicks: true,
        autoTick: true,
        showAxis: true,
        showLabels: true,
        max: 300,
        min: -300,
        logarithmic: false,
        logSettings: {
          min: 0.1,
          max: 1000000000,
          base: 10,
        },
        label,
        unit,
        id: 'v_bat',
      });
    });
  });
});
