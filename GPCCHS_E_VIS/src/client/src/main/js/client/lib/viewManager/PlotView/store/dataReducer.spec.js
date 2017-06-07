import { freezeMe } from '../../../common/test';
import plotViewData from './dataReducer';
import * as types from '../../../store/types';

describe('viewManager/PlotView/store/dataReducer', () => {
  it('DATA_REMOVE_ALL_VIEWDATA', () => {
    const state = freezeMe({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    const action = { type: types.DATA_REMOVE_ALL_VIEWDATA };
    expect(plotViewData(state, action)).toEqual({});
  });
  it('HSC_CLOSE_WORKSPACE', () => {
    const state = freezeMe({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    expect(plotViewData(state, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
  });
  it('WS_VIEW_RELOAD', () => {
    const action = { type: types.WS_VIEW_RELOAD,
      payload: { view: { type: 'TextView', uuid: 'myText' } } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'PlotView', uuid: 'myPlot' };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  it('WS_VIEW_OPEN', () => {
    const action = { type: types.WS_VIEW_OPEN,
      payload: { view: { type: 'TextView', uuid: 'myText' } } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'PlotView', uuid: 'myPlot' };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  it('WS_VIEW_ADD_BLANK', () => {
    const action = { type: types.WS_VIEW_ADD_BLANK,
      payload: { view: { type: 'TextView', uuid: 'myText' } } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'PlotView', uuid: 'myPlot' };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  it('WS_PAGE_OPEN', () => {
    const action = { type: types.WS_PAGE_OPEN,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'TextView', uuid: 'myText' }] } };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  it('WS_WORKSPACE_OPEN', () => {
    const action = { type: types.WS_WORKSPACE_OPEN,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'TextView', uuid: 'myText' }] } };
    expect(plotViewData(freezeMe({}), action)).toEqual({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
  });
  it('WS_VIEW_CLOSE', () => {
    const action = { type: types.WS_VIEW_CLOSE, payload: { viewId: 'myText' } };
    expect(plotViewData(freezeMe({}), action)).toEqual({});
    const frozen = freezeMe({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
    expect(plotViewData(freezeMe(frozen), action)).toBe(frozen);
    action.payload.viewId = 'myPlot';
    expect(plotViewData(frozen, action)).toEqual({});
  });
  it('WS_PAGE_CLOSE', () => {
    const action = { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['myPlot', 'myText'] } };
    expect(plotViewData(freezeMe({ myPlot: {}, myOtherPlot: {} }), action)).toEqual({ myOtherPlot: {} });
  });
  it('Unknown action', () => {
    const action = { type: types.UNKNOWN, payload: { viewId: 'myPlot' } };
    const frozen = freezeMe({ myPlot: {
      indexes: {}, lines: {}, min: {}, max: {}, minTime: {}, maxTime: {} } });
    expect(plotViewData(freezeMe(frozen), action)).toBe(frozen);
  });
  describe('DATA_UPDATE_VIEWDATA', () => {
    const payload = { rId1: {}, rId2: {}, rId3: {} };
    for (let j = 10; j < 21; j += 1) {
      payload.rId1[j] = {
        val1: { type: 'uinteger', value: (j * 10) + 1 },
        val2: { type: 'uinteger', value: (j * 10) + 2 },
        val3: { type: 'uinteger', value: (j * 10) + 3 },
        referenceTimestamp: { type: 'time', value: j },
        time: { type: 'time', value: j + 0.2 },
      };

      payload.rId2[j] = payload.rId1[j];
      payload.rId3[j] = payload.rId1[j];
    }

    const intervals = {
      rId1: {
        local1: { expectedInterval: [10, 15] },
        local2: { expectedInterval: [12, 16] },
        local4: { expectedInterval: [1001, 1005] },
      },
      rId2: {
        local3: { expectedInterval: [14, 18] },
      },
      rId3: {
        local5: { expectedInterval: [10, 20] },
        local6: { expectedInterval: [18, 20] },
        local7: { expectedInterval: [10, 20] },
      },
    };

    const viewDataMap = {
      plot1: {
        type: 'PlotView',
        entryPoints: {
          ep1: {
            remoteId: 'rId1',
            fieldX: 'time',
            fieldY: 'val1',
            offset: 0,
            localId: 'local1',
            stateColors: [
              {
                color: '#0000FF',
                condition: {
                  field: 'val1',
                  operator: '>',
                  operand: '1',
                },
              },
            ],
          },
        },
      },
      plot2: {
        type: 'PlotView',
        entryPoints: {
          ep2: {
            remoteId: 'rId1',
            fieldX: 'time',
            fieldY: 'val2',
            offset: 2,
            localId: 'local2',
            stateColors: [
              {
                color: '#0000FF',
                condition: {
                  field: 'val1',
                  operator: '>',
                  operand: '1',
                },
              },
            ],
          },
          ep3: {
            remoteId: 'rId2',
            fieldX: 'time',
            fieldY: 'val2',
            offset: 0,
            localId: 'local3',
          },
        },
      },
      plot3: {
        type: 'PlotView',
        entryPoints: {
          ep1: {
            remoteId: 'rId1',
            fieldX: 'time',
            fieldY: 'val1',
            offset: -987,
            localId: 'local4',
          },
        },
      },
      text1: {
        type: 'TextView',
        entryPoints: {
          ep4: {
            remoteId: 'rId3',
            field: 'val3',
            offset: 0,
            localId: 'local5',
          },
        },
      },
      text2: {
        type: 'TextView',
        entryPoints: {
          ep5: {
            remoteId: 'rId3',
            field: 'val3',
            offset: 0,
            localId: 'local6',
          },
          ep6: {
            remoteId: 'rId3',
            field: 'val3',
            offset: 0,
            localId: 'local7',
          },
        },
      },
    };
    const state = {
      plot2: {
        indexes: { ep5: [10, 14], ep3: [10, 14] },
        lines: {
          ep5: [{ masterTime: 10, x: 10.2, value: 100 }, { masterTime: 14, x: 10.7, value: 100 }],
          ep3: [{ masterTime: 10, x: 12.2, value: 25 }, { masterTime: 14, x: 12.7, value: 25 }],
        },
        min: { ep5: 100, ep3: 25 },
        max: { ep5: 100, ep3: 25 },
        minTime: { ep5: 14, ep3: 14 },
        maxTime: { ep5: 14, ep3: 14 },
      },
      plot3: {
        indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: {},
        maxTime: {},
      },
      plot1: {
        indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: {},
        maxTime: {},
      },
    };

    it('ok', () => {
      const frozen = freezeMe(state);
      const action = { type: 'DATA_UPDATE_VIEWDATA',
        payload: {
          oldViewMap: viewDataMap,
          newViewMap: viewDataMap,
          oldExpectedIntervals: intervals,
          newExpectedIntervals: intervals,
          dataToInject: payload,
        },
      };
      const newState = plotViewData(frozen, action);
      expect(newState).toEqual({
        plot1: {
          indexes: { ep1: [10, 11, 12, 13, 14, 15] },
          lines: { ep1: [
            { masterTime: 10, color: '#0000FF', symbol: undefined, value: 101, x: 10.2 },
            { masterTime: 11, color: '#0000FF', symbol: undefined, value: 111, x: 11.2 },
            { masterTime: 12, color: '#0000FF', symbol: undefined, value: 121, x: 12.2 },
            { masterTime: 13, color: '#0000FF', symbol: undefined, value: 131, x: 13.2 },
            { masterTime: 14, color: '#0000FF', symbol: undefined, value: 141, x: 14.2 },
            { masterTime: 15, color: '#0000FF', symbol: undefined, value: 151, x: 15.2 },
          ] },
          min: { ep1: 101 },
          max: { ep1: 151 },
          minTime: { ep1: 10 },
          maxTime: { ep1: 15 },
        },
        plot2: {
          indexes: { ep5: [10, 14], ep2: [14, 15, 16, 17, 18], ep3: [10, 14, 15, 16, 17, 18] },
          lines: { ep2: [
            { masterTime: 14, color: '#0000FF', symbol: undefined, value: 122, x: 12.2 },
            { masterTime: 15, color: '#0000FF', symbol: undefined, value: 132, x: 13.2 },
            { masterTime: 16, color: '#0000FF', symbol: undefined, value: 142, x: 14.2 },
            { masterTime: 17, color: '#0000FF', symbol: undefined, value: 152, x: 15.2 },
            { masterTime: 18, color: '#0000FF', symbol: undefined, value: 162, x: 16.2 },
          ],
            ep3: [
            { masterTime: 10, x: 12.2, value: 25 },
            { masterTime: 14, symbol: undefined, value: 142, x: 14.2 },
            { masterTime: 15, symbol: undefined, value: 152, x: 15.2 },
            { masterTime: 16, symbol: undefined, value: 162, x: 16.2 },
            { masterTime: 17, symbol: undefined, value: 172, x: 17.2 },
            { masterTime: 18, symbol: undefined, value: 182, x: 18.2 },
            ],
            ep5: [{ masterTime: 10, x: 10.2, value: 100 }, { masterTime: 14, x: 10.7, value: 100 }],
          },
          min: { ep2: 122, ep3: 142, ep5: 100 },
          max: { ep2: 162, ep3: 182, ep5: 100 },
          minTime: { ep2: 14, ep3: 14, ep5: 14 },
          maxTime: { ep2: 18, ep3: 18, ep5: 14 },
        },
        plot3: {
          indexes: {},
          lines: {},
          min: {},
          max: {},
          minTime: {},
          maxTime: {},
        },
      });
    });
    it('nothing to add', () => {
      const frozen = freezeMe(state);
      // const newState = injectData(frozen, viewDataMap, intervals, {});
      const action = { type: types.DATA_UPDATE_VIEWDATA,
        payload: {
          oldViewMap: viewDataMap,
          newViewMap: viewDataMap,
          oldExpectedIntervals: intervals,
          newExpectedIntervals: intervals,
          dataToInject: {},
        },
      };
      const newState = plotViewData(frozen, action);
      expect(newState).toBe(frozen);
    });
  });
});
