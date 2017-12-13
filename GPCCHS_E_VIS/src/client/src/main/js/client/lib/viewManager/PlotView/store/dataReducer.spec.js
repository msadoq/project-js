// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : update viewData when closing a page
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : DM : #6700 : 02/08/2017 : Update unit tests for Plot View store
// END-HISTORY
// ====================================================================

import { freezeMe } from 'common/jest';
import * as types from 'store/types';
import state from 'common/jest/stateTest';
import dataMapGenerator from 'dataManager/map';
import plotViewData from './dataReducer';

describe('viewManager/PlotView/store/dataReducer', () => {
  test('DATA_REMOVE_ALL_VIEWDATA', () => {
    const action = { type: types.DATA_REMOVE_ALL_VIEWDATA };
    expect(plotViewData(state.PlotViewData, action)).toEqual({});
  });
  test('HSC_CLOSE_WORKSPACE', () => {
    expect(plotViewData(state.PlotViewData, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
  });
  test('WS_VIEW_RELOAD', () => {
    const action = { type: types.WS_VIEW_RELOAD,
      payload: { view: { type: 'TextView', uuid: 'myText' } } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'PlotView', uuid: 'myPlot' };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  test('WS_VIEW_OPENED', () => {
    const action = { type: types.WS_VIEW_OPENED,
      payload: { view: { type: 'TextView', uuid: 'myText' } } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'PlotView', uuid: 'myPlot' };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  test('WS_VIEW_ADD_BLANK', () => {
    const action = { type: types.WS_VIEW_ADD_BLANK,
      payload: { view: { type: 'TextView', uuid: 'myText' } } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'PlotView', uuid: 'myPlot' };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  test('WS_PAGE_OPENED', () => {
    const action = { type: types.WS_PAGE_OPENED,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'TextView', uuid: 'myText' }] } };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  test('WS_WORKSPACE_OPENED', () => {
    const action = { type: types.WS_WORKSPACE_OPENED,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'TextView', uuid: 'myText' }] } };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  test('WS_VIEW_CLOSE', () => {
    const action = { type: types.WS_VIEW_CLOSE, payload: { viewId: 'myText' } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    const frozen = freezeMe({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
    expect(plotViewData(freezeMe(frozen), action)).toBe(frozen);
    action.payload.viewId = 'myPlot';
    expect(plotViewData(frozen, action)).toEqual({});
  });
  test('WS_PAGE_CLOSE', () => {
    const action = { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['myPlot', 'myText'] } };
    expect(plotViewData(freezeMe({ myPlot: {}, myOtherPlot: {} }), action))
      .toEqual({ myOtherPlot: {} });
  });
  test('Unknown action', () => {
    const action = { type: types.UNKNOWN, payload: { viewId: 'myPlot' } };
    const frozen = freezeMe({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
    expect(plotViewData(freezeMe(frozen), action)).toBe(frozen);
  });
  describe('INJECT_DATA_RANGE', () => {
    const dataMap = dataMapGenerator(state);
    const payload = {
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100': {},
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': {},
      tbdId3: {} };
    for (let j = 100120; j < 100920; j += 100) {
      payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100'][j] = {
        extractedValue: { type: 'uinteger', value: (j / 10000) + 1 },
        rawValue: { type: 'uinteger', value: j + 2 },
        convertedValue: { type: 'uinteger', value: j + 3 },
        referenceTimestamp: { type: 'time', value: j },
        time: { type: 'time', value: j + 0.2 },
        groundDate: { type: 'time', value: j + 0.2 },
      };

      payload['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1'][j] =
        payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100'][j];
      payload.tbdId3[j] =
        payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100'][j];
    }

    test('ok', () => {
      const frozen = freezeMe(state.PlotViewData);
      const action = { type: types.INJECT_DATA_RANGE,
        payload: {
          oldViewMap: dataMap.perView,
          newViewMap: dataMap.perView,
          oldExpectedRangeIntervals: dataMap.expectedRangeIntervals,
          newExpectedRangeIntervals: dataMap.expectedRangeIntervals,
          dataToInject: payload,
        },
      };

      const newState = plotViewData(frozen, action);
      expect(newState).toMatchSnapshot();
    });
    test('nothing to add', () => {
      const frozen = freezeMe(state.PlotViewData);
      const action = { type: types.INJECT_DATA_RANGE,
        payload: {
          oldViewMap: dataMap.perView,
          newViewMap: dataMap.perView,
          oldExpectedRangeIntervals: dataMap.expectedRangeIntervals,
          newExpectedRangeIntervals: dataMap.expectedRangeIntervals,
          dataToInject: {},
        },
      };
      const newState = plotViewData(frozen, action);
      expect(newState).toBe(frozen);
    });
  });
});
