/* eslint no-unused-expressions: 0 */
import { freezeMe } from '../../../common/test';
import { updateAxis, addAxis } from './axis';

describe('store:views:axes', () => {
  const state = freezeMe({
    view1: {
      type: 'PlotView',
      configuration: {
        axes: {
          axis_1: { label: 'AXIS1', id: 'axis_1' },
          axis_1_1: {},
        },
      },
    },
    view2: {
      type: 'Unknown',
    },
  });
  describe('updateAxis', () => {
    it('does nothing when received an unknown viewId', () => {
      const newState = updateAxis(state, freezeMe({ payload: { viewId: 'unknown' } }));
      newState.should.be.eql(state);
    });
    it('does nothing when received an unknown axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { viewId: 'view1' } }));
      newState.should.be.eql(state);
    });
    it('does nothing when received an unknown axisId', () => {
      const newState = updateAxis(state, freezeMe({ payload: { viewId: 'view1', axis: true } }));
      newState.should.be.eql(state);
    });
    it('does nothing when view is not a PlotView', () => {
      const newState = updateAxis(state, freezeMe({ payload: { viewId: 'view2', axisId: 'axis_1', axis: true } }));
      newState.should.be.eql(state);
    });
    it('updates axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { viewId: 'view1', axisId: 'axis_1', axis: true } }));
      newState.should.not.be.eql(state);
      newState.view2.should.be.eql(state.view2);
      newState.view1.isModified.should.be.true;
      newState.view1.configuration.axes.axis_1.should.be.true;
    });
  });

  describe('addAxis', () => {
    it('does nothing when received an unknown viewId', () => {
      const newState = addAxis(state, { payload: { viewId: 'unknown' } });
      newState.should.be.eql(state);
    });
    it('does nothing when received an unknown axis', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1' } });
      newState.should.be.eql(state);
    });
    it('does nothing when received an axis without label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: {} } });
      newState.should.be.eql(state);
    });
    it('adds axis with given id', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'yolo', id: 'axis42' } } });
      newState.should.not.be.eql(state);
      newState.view1.isModified.should.be.true;
      newState.view1.configuration.axes.axis42.should.eql({ label: 'yolo', id: 'axis42' });
      newState.view1.configuration.axes.axis_1.should.eql(state.view1.configuration.axes.axis_1);
    });
    it('adds axis generating new id from label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'axis_1' } } });
      newState.should.not.be.eql(state);
      newState.view1.isModified.should.be.true;
      newState.view1.configuration.axes.axis_1_2.should.eql({ label: 'axis_1', id: 'axis_1_2' });
      newState.view1.configuration.axes.axis_1.should.eql(state.view1.configuration.axes.axis_1);
    });
  });
});
