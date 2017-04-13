// import _ from 'lodash/fp';
import * as actions from '../../../store/actions/views';
import * as types from '../../../store/types';
import configurationReducer from './configurationReducer';
import { freezeArgs } from '../../../common/test';

const reducer = freezeArgs(configurationReducer);

const stateConf = {
  entryPoints: [
    {
      name: 'ATT_BC_REVTCOUNT4',
      connectedData: { axisId: 'axis2' },
    },
    {
      name: 'ATT_BC_REVTCOUNT3',
      connectedData: { axisId: 'axis3' },
    },
  ],
  axes: {
    time: { label: 'Time', unit: 's', id: 'time' },
    axis2: { label: '2', unit: 'w', id: 'axis2' },
    axis3: { label: '3', unit: 'p', id: 'axis3' } },
  grids: [{ grid: '1' }, { grid: '2' }],
  legend: 'old Legend',
  markers: [{ m: '1' }, { m: '2' }],
  showYAxes: 'left',
};

describe('store:reducer:PlotViewConfiguration', () => {
  describe('showYAxes', () => {
    it('updates', () => {
      const state = reducer(stateConf, actions.updateShowYAxes('plot1', 'right'));
      state.showYAxes.should.eql('right');
    });
  });
  describe('legend', () => {
    it('update', () => {
      const state = reducer(stateConf, actions.updateLegend('plot1', 'new Legend'));
      state.legend.should.deep.equal('new Legend');
    });
  });
  describe('Grid', () => {
    it('adds', () => {
      const grid = { grid: '3' };
      const state = reducer(stateConf, actions.addGrid('plot1', grid));
      state.grids.should.deep.equal(
        [{ grid: '1' }, { grid: '2' }, { grid: '3' }]
      );
    });
    it('add when empty', () => {
      const state = reducer({}, actions.addGrid('plot1', { grid: '3' }));
      state.grids.should.be.eql([{ grid: '3' }]);
    });
    it('updates', () => {
      const grid = { grid: '3' };
      const state = reducer(stateConf, actions.updateGrid('plot1', 0, grid));
      state.grids[0].should.deep.equal(grid);
    });
    it('removes', () => {
      const state = reducer(stateConf, actions.removeGrid('plot1', 1));
      state.grids.should.deep.equal([{ grid: '1' }]);
    });
  });
  describe('markers', () => {
    it('adds', () => {
      const marker = { m: '3' };
      const state = reducer(stateConf, actions.addMarker('plot1', marker));
      state.markers.should.deep.equal(
        [{ m: '1' }, { m: '2' }, { m: '3' }]);
    });
    it('updates', () => {
      const marker = { m: '3' };
      const state = reducer(stateConf, actions.updateMarker('plot1', 0, marker));
      state.markers[0].should.deep.equal(marker);
    });
    it('removes', () => {
      const state = reducer(stateConf, actions.removeMarker('plot1', 1));
      state.markers.should.deep.equal([{ m: '1' }]);
    });
  });
  describe('entryPoints', () => {
    it('adds', () => {
      const action = {
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'text1',
          entryPoint: { name: 'ep2', connectedData: { timeline: 't2', domain: 'd2', unit: 'w' } },
        },
      };
      const state = reducer(stateConf, action);
      state.entryPoints[2].should.have.properties({
        name: 'ep2',
        connectedData: { timeline: 't2', domain: 'd2', unit: 'w' },
      });
    });
    it('removes should refresh only axes', () => {
      // remove an entrypoint is in commonConfigurationReducer
      const state = reducer(stateConf, actions.removeEntryPoint('plot1', 0));
      state.axes.should.deep.equal({
        axis2: { label: '2', unit: 'w', id: 'axis2' },
        axis3: { label: '3', unit: 'p', id: 'axis3' },
      });
    });
  });
  describe('axes', () => {
    it('add axis', () => {
      const axis = { label: 'axis4', unit: 's' };
      const state = reducer(stateConf, actions.addAxis('plot1', axis));
      const keys = Object.keys(state.axes);
      keys.should.have.length(4);
      state.axes[keys[0]].should.deep.equal({ label: 'Time', unit: 's', id: 'time' });
      state.axes[keys[1]].should.deep.equal({ label: '2', unit: 'w', id: 'axis2' });
      state.axes[keys[2]].should.deep.equal({ label: '3', unit: 'p', id: 'axis3' });
      state.axes[keys[3]].should.deep.equal({ label: 'axis4', unit: 's', id: keys[3] });
    });
    it('update axis', () => {
      const axis = { label: '3', unit: 'z' };
      const state = reducer(stateConf, actions.updateAxis('plot1', 'axis1', axis));
      state.axes.axis1.should.deep.equal(Object.assign({}, axis, { id: 'axis1' }));
    });
    it('remove axis', () => {
      const state = reducer(stateConf, actions.removeAxis('plot1', 'axis2'));
      state.axes.should.deep.equal(
        { time: { label: 'Time', unit: 's', id: 'time' },
          axis3: { label: '3', unit: 'p', id: 'axis3' } });
    });
  });
});
