/* eslint no-unused-expressions: 0 */
import { freezeMe } from '../../../common/test';
import { updateAxis } from './axis';

describe('store:views:axes', () => {
  describe('updateAxis', () => {
    const state = freezeMe({
      view1: {
        type: 'PlotView',
        configuration: {
          axes: {
            axis1: null,
          },
        },
      },
      view2: {
        type: 'Unknown',
      },
    });
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
      const newState = updateAxis(state, freezeMe({ payload: { viewId: 'view2', axisId: 'axis1', axis: true } }));
      newState.should.be.eql(state);
    });
    it('updates axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { viewId: 'view1', axisId: 'axis1', axis: true } }));
      newState.should.not.be.eql(state);
      newState.view2.should.be.eql(state.view2);
      newState.view1.isModified.should.be.true;
      newState.view1.configuration.axes.axis1.should.be.true;
    });
  });
});
