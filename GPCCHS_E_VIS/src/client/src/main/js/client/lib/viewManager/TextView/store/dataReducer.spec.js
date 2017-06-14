import moment from 'moment';
import textViewData from './dataReducer';
import * as types from '../../../store/types';
import { freezeMe } from '../../../common/test';

describe('viewManager/TextView/store/dataReducer', () => {
  const payload = { rId1: {}, rId2: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: (j * 10) + 1,
      val2: (j * 10) + 2,
      val3: (j * 10) + 3,
      referenceTimestamp: j,
      time: j + 0.2,
    };

    payload.rId2[j] = payload.rId1[j];
  }

  it('DATA_REMOVE_ALL_VIEWDATA', () => {
    const state = freezeMe({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    const action = { type: types.DATA_REMOVE_ALL_VIEWDATA };
    expect(textViewData(state, action)).toEqual({});
  });
  it('HSC_CLOSE_WORKSPACE', () => {
    const state = freezeMe({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    expect(textViewData(state, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
  });
  it('WS_VIEW_RELOAD', () => {
    const action = { type: types.WS_VIEW_RELOAD,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(textViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'TextView', uuid: 'myText' };
    expect(textViewData(freezeMe({}), action)).toEqual({ myText: { index: {}, values: {} } });
  });
  it('WS_VIEW_OPEN', () => {
    const action = { type: types.WS_VIEW_OPEN,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(textViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'TextView', uuid: 'myText' };
    expect(textViewData(freezeMe({}), action)).toEqual({ myText: { index: {}, values: {} } });
  });
  it('WS_VIEW_ADD_BLANK', () => {
    const action = { type: types.WS_VIEW_ADD_BLANK,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(textViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'TextView', uuid: 'myText' };
    expect(textViewData(freezeMe({}), action)).toEqual({ myText: { index: {}, values: {} } });
  });
  it('WS_PAGE_OPEN', () => {
    const action = { type: types.WS_PAGE_OPEN,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'TextView', uuid: 'myText' }] } };
    expect(textViewData(freezeMe({}), action)).toEqual({ myText: { index: {}, values: {} } });
  });
  it('WS_WORKSPACE_OPEN', () => {
    const action = { type: types.WS_WORKSPACE_OPEN,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'TextView', uuid: 'myText' }] } };
    expect(textViewData(freezeMe({}), action)).toEqual({ myText: { index: {}, values: {} } });
  });
  it('WS_VIEW_CLOSE', () => {
    const action = { type: types.WS_VIEW_CLOSE, payload: { viewId: 'myPlot' } };
    expect(textViewData(freezeMe({}), action)).toEqual({});
    const frozen = freezeMe({ myText: { index: {}, values: {} } });
    expect(textViewData(freezeMe(frozen), action)).toBe(frozen);
    action.payload.viewId = 'myText';
    expect(textViewData(frozen, action)).toEqual({});
  });
  it('WS_PAGE_CLOSE', () => {
    const action = { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['myPlot', 'myText'] } };
    expect(textViewData(freezeMe({ myText: {}, myOtherText: {} }), action))
      .toEqual({ myOtherText: {} });
  });
  it('Unknown action', () => {
    const action = { type: types.UNKNOWN, payload: { viewId: 'myText' } };
    const frozen = freezeMe({ myText: { index: {}, values: {} } });
    expect(textViewData(freezeMe(frozen), action)).toBe(frozen);
  });
  describe('DATA_UPDATE_VIEWDATA', () => {
    let newViewMap;
    let oldViewMap;
    let dataToInject;
    let oldExpectedIntervals;
    let newExpectedIntervals;
    beforeAll(() => {
      oldViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              remoteId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
          },
        },
        plot: {
          type: 'PlotView',
          entryPoints: {
            ep2: {
              remoteId: 'rId2',
              fieldX: 'time',
              fieldY: 'val2',
              offset: 0,
              localId: 'local2',
            },
          },
        },
      };
      oldExpectedIntervals = {
        rId1: { local1: { expectedInterval: [5, 9] } },
        rId2: { local2: { expectedInterval: [7, 10] } },
      };
      newViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              remoteId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
            ep4: {
              remoteId: 'rId2',
              field: 'val4',
              localId: 'local4',
            },
          },
        },
        plot: {
          type: 'PlotView',
          entryPoints: {
            ep2: {
              remoteId: 'rId1',
              fieldX: 'time',
              fieldY: 'val2',
              offset: 0,
              localId: 'local2',
            },
            ep3: {
              remoteId: 'rId2',
              fieldX: 'time',
              fieldY: 'val4',
              offset: 0,
              localId: 'local3',
            },
          },
        },
      };
      newExpectedIntervals = {
        rId1: {
          local1: { expectedInterval: [5, 10] },
          local2: { expectedInterval: [8, 12] },
        },
        rId2: {
          local4: { expectedInterval: [5, 10] },
          local3: { expectedInterval: [8, 12] },
        },
      };
      dataToInject = { rId1: {}, rId2: {} };
      for (let j = 1; j < 21; j += 1) {
        dataToInject.rId1[j] = {
          val1: { type: 'uinteger', value: (j * 10) + 1 },
          val2: { type: 'uinteger', value: (j * 10) + 2 },
          val3: { type: 'uinteger', value: (j * 10) + 3 },
          val4: { type: 'enum', value: j, symbol: 'val'.concat(j) },
          referenceTimestamp: { type: 'time', value: j },
          time: { type: 'time', value: j },
        };
        if (j % 2) {
          dataToInject.rId2[j] = dataToInject.rId1[j];
        }
      }
    });
    it('valid viewData with empty state', () => {
      const action = { type: types.DATA_UPDATE_VIEWDATA,
        payload: {
          oldViewMap,
          newViewMap,
          oldExpectedIntervals,
          newExpectedIntervals,
          dataToInject,
        } };
      expect(textViewData(freezeMe({ text: { index: {}, values: {} } }), action)).toEqual({
        text: {
          index: { ep1: 10, ep4: 9 },
          values: {
            ep1: { value: moment(10).utc().toISOString() },
            ep4: { value: 'val9' } },
        },
      });
    });
    it('valid viewData with state', () => {
      const state = freezeMe({ text: {
        index: { ep1: 9, ep4: 9 },
        values: {
          ep1: { value: moment(9).utc().toISOString() },
          ep4: { value: 'val9', monit: undefined } },
      } });
      const action = { type: types.DATA_UPDATE_VIEWDATA,
        payload: {
          oldViewMap,
          newViewMap,
          oldExpectedIntervals,
          newExpectedIntervals,
          dataToInject,
        } };
      expect(textViewData(state, action)).toEqual({
        text: {
          index: { ep1: 10, ep4: 9 },
          values: {
            ep1: { value: moment(10).utc().toISOString() },
            ep4: { value: 'val9' } },
        },
      });
    });
  });
});
