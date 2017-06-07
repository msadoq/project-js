/* eslint no-unused-expressions: 0 */
import { freezeMe, should } from '../../../common/test';
import { updateAxis, addAxis, removeAxis, getYAxis } from './axes';

describe('store:views:axes', () => {
  const state = freezeMe({
    axes: {
      axis_1: { label: 'AXIS1', id: 'axis_1', unit: 'volts' },
      axis_2: { label: 'AXIS2', id: 'axis_2', unit: 'seconds' },
      axis_1_1: {},
    },
  });
  describe('updateAxis', () => {
    it('does nothing when received an unknown viewId', () => {
      const newState = updateAxis(state, freezeMe({ payload: {} }));
      expect(newState).toEqual(state);
    });
    it('does nothing when received an unknown axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { } }));
      expect(newState).toEqual(state);
    });
    it('does nothing when received an unknown axisId', () => {
      const newState = updateAxis(state, freezeMe({ payload: { axis: true } }));
      expect(newState).toEqual(state);
    });
    it('updates axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { axisId: 'axis_1', axis: { someValues: true } } }));
      expect(newState).not.toEqual(state);
      expect(newState.axes.axis_1.someValues).toBe(true);
      expect(newState.axes.axis_1.id).toEqual('axis_1');
    });
  });

  describe('addAxis', () => {
    it('does nothing when received an unknown axis', () => {
      const newState = addAxis(state, { payload: { } });
      expect(newState).toEqual(state);
    });
    it('does nothing when received an axis without label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: {} } });
      expect(newState).toEqual(state);
    });
    it('adds axis with given id', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'yolo', id: 'axis42' } } });
      expect(newState).not.toEqual(state);
      expect(newState.axes.axis42).toEqual({ label: 'yolo', id: 'axis42' });
      expect(newState.axes.axis_1).toEqual(state.axes.axis_1);
    });
    it('adds axis generating new id from label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'axis_1' } } });
      expect(newState).not.toEqual(state);
      expect(newState.axes.axis_1_2).toEqual({ label: 'axis_1', id: 'axis_1_2' });
      expect(newState.axes.axis_1).toEqual(state.axes.axis_1);
    });
  });

  describe('removeAxis', () => {
    it('does nothing when no axisId', () => {
      const newState = removeAxis(state, { payload: { } });
      expect(newState).toEqual(state);
    });
    it('does nothing when received an unknown axisId', () => {
      const newState = removeAxis(state, { payload: { axisId: 'unknown' } });
      expect(newState).toEqual(state);
    });
    it('removes axis', () => {
      const newState = removeAxis(state, { payload: { viewId: 'view1', axisId: 'axis_1' } });
      expect(newState.axes.axis_1).toBeFalsy();
    });
  });

  describe('getAxes', () => {
    it('returns 1 generated Y axis', () => {
      const entryPoint = {
        name: 'time',
        connectedData: { unit: 'useless' },
      };
      const axisY = getYAxis(state, { payload: { entryPoint } });
      expect(axisY.label).toEqual('time');
      expect(axisY.id).toEqual('Y:time');
      expect(axisY.unit).toEqual('useless');
    });
    it('returns found Y Axis', () => {
      const entryPoint = {
        name: 'ep2',
        connectedData: { axisId: 'axis_1' },
      };
      const axisY = getYAxis(state, { payload: { entryPoint } });
      expect(axisY).toEqual({ label: 'AXIS1', unit: 'volts', id: 'axis_1' });
    });
  });
});
