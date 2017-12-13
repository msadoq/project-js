// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Add configurationReducer.spec for PlotView .
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in viewManager
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Improve PlotView editor UI -> legend in store.
// END-HISTORY
// ====================================================================

import * as actions from 'store/actions/views';
import * as types from 'store/types';
import { freezeArgs } from 'common/jest';
import configurationReducer from './configurationReducer';

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
  showLegend: false,
};

describe('store:reducer:PlotViewConfiguration', () => {
  describe('showYAxes', () => {
    test('updates', () => {
      const state = reducer(stateConf, actions.updateShowYAxes('plot1', 'right'));
      expect(state.showYAxes).toEqual('right');
    });
  });
  describe('showLegend', () => {
    test('updates', () => {
      const state = reducer(stateConf, actions.toggleLegend('plot1', true));
      expect(state.showLegend).toEqual(true);
    });
  });
  describe('legend', () => {
    test('update', () => {
      const state = reducer(stateConf, actions.updateLegend('plot1', 'new Legend'));
      expect(state.legend).toEqual('new Legend');
    });
  });
  describe('Grid', () => {
    test('adds', () => {
      const grid = { grid: '3' };
      const state = reducer(stateConf, actions.addGrid('plot1', grid));
      expect(state.grids).toEqual([{ grid: '1' }, { grid: '2' }, { grid: '3' }]);
    });
    test('add when empty', () => {
      const state = reducer({}, actions.addGrid('plot1', { grid: '3' }));
      expect(state.grids).toEqual([{ grid: '3' }]);
    });
    test('updates', () => {
      const grid = { grid: '3' };
      const state = reducer(stateConf, actions.updateGrid('plot1', 0, grid));
      expect(state.grids[0]).toEqual(grid);
    });
    test('removes', () => {
      const state = reducer(stateConf, actions.removeGrid('plot1', 1));
      expect(state.grids).toEqual([{ grid: '1' }]);
    });
  });
  describe('markers', () => {
    test('adds', () => {
      const marker = { m: '3' };
      const state = reducer(stateConf, actions.addMarker('plot1', marker));
      expect(state.markers).toEqual([{ m: '1' }, { m: '2' }, { m: '3' }]);
    });
    test('updates', () => {
      const marker = { m: '3' };
      const state = reducer(stateConf, actions.updateMarker('plot1', 0, marker));
      expect(state.markers[0]).toEqual(marker);
    });
    test('removes', () => {
      const state = reducer(stateConf, actions.removeMarker('plot1', 1));
      expect(state.markers).toEqual([{ m: '1' }]);
    });
  });
  describe('entryPoints', () => {
    test('adds', () => {
      const action = {
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'text1',
          entryPoint: { name: 'ep2', connectedData: { timeline: 't2', domain: 'd2', unit: 'w' } },
        },
      };
      const state = reducer(stateConf, action);
      expect(state.entryPoints[2]).toMatchObject({
        name: 'ep2',
        connectedData: { timeline: 't2', domain: 'd2', unit: 'w' },
      });
    });
    test('removes should refresh only axes', () => {
      // remove an entrypoint is in commonConfigurationReducer
      const state = reducer(stateConf, actions.removeEntryPoint('plot1', 0));
      expect(state.axes).toEqual({
        axis2: { label: '2', unit: 'w', id: 'axis2' },
        axis3: { label: '3', unit: 'p', id: 'axis3' },
      });
    });
  });
  describe('axes', () => {
    test('add axis', () => {
      const axis = { label: 'axis4', unit: 's' };
      const state = reducer(stateConf, actions.addAxis('plot1', axis));
      const keys = Object.keys(state.axes);
      expect(keys).toHaveLength(4);
      expect(state.axes[keys[0]]).toEqual({ label: 'Time', unit: 's', id: 'time' });
      expect(state.axes[keys[1]]).toEqual({ label: '2', unit: 'w', id: 'axis2' });
      expect(state.axes[keys[2]]).toEqual({ label: '3', unit: 'p', id: 'axis3' });
      expect(state.axes[keys[3]]).toEqual({ label: 'axis4', unit: 's', id: keys[3] });
    });
    test('update axis', () => {
      const axis = { label: '3', unit: 'z' };
      const state = reducer(stateConf, actions.updateAxis('plot1', 'axis1', axis));
      expect(state.axes.axis1).toEqual(Object.assign({}, axis, { id: 'axis1' }));
    });
    test('remove axis', () => {
      const state = reducer(stateConf, actions.removeAxis('plot1', 'axis2'));
      expect(state.axes).toEqual({ time: { label: 'Time', unit: 's', id: 'time' },
        axis3: { label: '3', unit: 'p', id: 'axis3' } });
    });
  });
  describe('liveExtents', () => {
    test('save liveExtents from empty', () => {
      const liveExtents = {
        32132132132: {
          width: 100,
          height: 100,
          xExtents: [],
          yExtents: [],
        },
      };
      const state = reducer(stateConf, actions.saveLiveExtents('plot1', liveExtents));
      expect(state).toEqual({
        ...state,
        liveExtents,
      });
    });
    test('save liveExtents from filled', () => {
      const liveExtents = {
        32132132132: {
          width: 100,
          height: 100,
          xExtents: [],
          yExtents: [],
        },
      };
      const state1 = reducer(stateConf, actions.saveLiveExtents('plot1', liveExtents));
      const state2 = reducer(state1, actions.saveLiveExtents('plot1', {
        ...liveExtents,
        32132132132: {
          width: 200,
          height: 200,
        },
      }));
      expect(state2).toEqual({
        ...state2,
        liveExtents: {
          ...liveExtents,
          32132132132: {
            width: 200,
            height: 200,
          },
        },
      });
    });
  });
});
