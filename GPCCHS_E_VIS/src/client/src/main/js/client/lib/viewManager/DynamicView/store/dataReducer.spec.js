import dynamicViewData from './dataReducer';
import * as types from '../../../store/types';
import { freezeMe } from '../../../common/test';

describe('viewManager/DynamicView/store/dataReducer', () => {
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
        index: 10,
        value: { myEntryPoint: 150 },
      },
    });
    const action = { type: types.DATA_REMOVE_ALL_VIEWDATA };
    dynamicViewData(state, action).should.eql({});
  });
  it('HSC_CLOSE_WORKSPACE', () => {
    const state = freezeMe({
      myViewId: {
        index: 10,
        value: { myEntryPoint: 150 },
      },
    });
    dynamicViewData(state, { type: types.HSC_CLOSE_WORKSPACE }).should.eql({});
  });
  it('WS_VIEW_RELOAD', () => {
    const action = { type: types.WS_VIEW_RELOAD,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    dynamicViewData(freezeMe({}), action).should.eql({});
    action.payload.view = { type: 'DynamicView', uuid: 'myDyn' };
    dynamicViewData(freezeMe({}), action).should.eql({ myDyn: {} });
  });
  it('WS_VIEW_OPEN', () => {
    const action = { type: types.WS_VIEW_OPEN,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    dynamicViewData(freezeMe({}), action).should.eql({});
    action.payload.view = { type: 'DynamicView', uuid: 'myDyn' };
    dynamicViewData(freezeMe({}), action).should.eql({ myDyn: {} });
  });
  it('WS_VIEW_ADD_BLANK', () => {
    const action = { type: types.WS_VIEW_ADD_BLANK,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    dynamicViewData(freezeMe({}), action).should.eql({});
    action.payload.view = { type: 'DynamicView', uuid: 'myDyn' };
    dynamicViewData(freezeMe({}), action).should.eql({ myDyn: {} });
  });
  it('WS_PAGE_OPEN', () => {
    const action = { type: types.WS_PAGE_OPEN,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'DynamicView', uuid: 'myDyn' }] } };
    dynamicViewData(freezeMe({}), action).should.eql({ myDyn: {} });
  });
  it('WS_WORKSPACE_OPEN', () => {
    const action = { type: types.WS_WORKSPACE_OPEN,
      payload: { views:
        [{ type: 'TextView', uuid: 'myText' }, { type: 'DynamicView', uuid: 'myDyn' }] } };
    dynamicViewData(freezeMe({}), action).should.eql({ myDyn: {} });
  });
  it('WS_VIEW_CLOSE', () => {
    const action = { type: types.WS_VIEW_CLOSE, payload: { viewId: 'myPlot' } };
    dynamicViewData(freezeMe({}), action).should.eql({});
    const frozen = freezeMe({ myDyn: {} });
    dynamicViewData(freezeMe(frozen), action).should.equal(frozen);
    action.payload.viewId = 'myDyn';
    dynamicViewData(frozen, action).should.eql({});
  });
  it('Unknown action', () => {
    const action = { type: types.UNKNOWN, payload: { viewId: 'myDyn' } };
    const frozen = freezeMe({ myDyn: {} });
    dynamicViewData(freezeMe(frozen), action).should.equal(frozen);
  });
  describe('DATA_UPDATE_VIEWDATA', () => {
    let newViewMap;
    let oldViewMap;
    let dataToInject;
    let oldExpectedIntervals;
    let newExpectedIntervals;
    before('', () => {
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
        dynamic: {
          type: 'DynamicView',
          entryPoints: {
            epDynamic: {
              remoteId: 'rId2',
              offset: 0,
              localId: 'local2',
            },
          },
        },
      };
      oldExpectedIntervals = {
        rId1: { local1: { expectedInterval: [5, 10] } },
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
        dynamic: {
          type: 'DynamicView',
          entryPoints: {
            epDynamic: {
              remoteId: 'rId1',
              offset: 0,
              localId: 'local1',
            },
          },
        },
      };
      newExpectedIntervals = {
        rId1: { local1: { expectedInterval: [7, 15] } },
        rId2: { local2: { expectedInterval: [11, 13] } },
      };
      dataToInject = { rId1: {}, rId2: {} };
      for (let j = 1; j < 21; j += 1) {
        dataToInject.rId1[j] = {
          val1: { type: 'uinteger', value: (j * 10) + 1 },
          val2: { type: 'uinteger', value: (j * 10) + 2 },
          val3: { type: 'uinteger', value: (j * 10) + 3 },
          val4: { type: 'enum', value: j, symbol: 'val'.concat(j) },
          referenceTimestamp: { type: 'time', value: j },
          time: { type: 'time', value: j + 0.2 },
        };
        if (j % 2) {
          dataToInject.rId2[j] = dataToInject.rId1[j];
        }
      }
    });
    it('valid viewData with empty state', () => {
      const action = { type: types.DATA_UPDATE_VIEWDATA,
        payload: {
          newViewMap,
          oldExpectedIntervals,
          newExpectedIntervals: oldExpectedIntervals,
          dataToInject,
        } };
      dynamicViewData(freezeMe({ dynamic: {} }), action).should.eql({
        dynamic: {
          index: 10,
          value: {
            val1: { type: 'uinteger', value: 101 },
            val2: { type: 'uinteger', value: 102 },
            val3: { type: 'uinteger', value: 103 },
            val4: { type: 'enum', value: 10, symbol: 'val10' },
            referenceTimestamp: { type: 'time', value: 10 },
            time: { type: 'time', value: 10.2 },
          },
        },
      });
    });
    it('valid viewData with state: interval update', () => {
      const state = freezeMe({
        dynamic: {
          index: 8,
          value: {
            val1: { type: 'uinteger', value: 81 },
            val2: { type: 'uinteger', value: 82 },
            val3: { type: 'uinteger', value: 83 },
            val4: { type: 'enum', value: 8, symbol: 'val8' },
            referenceTimestamp: { type: 'time', value: 8 },
            time: { type: 'time', value: 8.2 },
          },
        },
      });
      const action = { type: types.DATA_UPDATE_VIEWDATA,
        payload: {
          oldViewMap: newViewMap,
          newViewMap,
          oldExpectedIntervals,
          newExpectedIntervals,
          dataToInject,
        } };
      dynamicViewData(state, action).should.eql({
        dynamic: {
          index: 15,
          value: {
            val1: { type: 'uinteger', value: 151 },
            val2: { type: 'uinteger', value: 152 },
            val3: { type: 'uinteger', value: 153 },
            val4: { type: 'enum', value: 15, symbol: 'val15' },
            referenceTimestamp: { type: 'time', value: 15 },
            time: { type: 'time', value: 15.2 },
          },
        },
      });
    });
    it('valid viewData with state: remoteId update', () => {
      const state = freezeMe({
        dynamic: {
          index: 8,
          value: {
            val1: { type: 'uinteger', value: 81 },
            val2: { type: 'uinteger', value: 82 },
            val3: { type: 'uinteger', value: 83 },
            val4: { type: 'enum', value: 8, symbol: 'val8' },
            referenceTimestamp: { type: 'time', value: 8 },
            time: { type: 'time', value: 8.2 },
          },
        },
      });
      const action = { type: types.DATA_UPDATE_VIEWDATA,
        payload: {
          oldViewMap,
          newViewMap,
          oldExpectedIntervals,
          newExpectedIntervals,
          dataToInject,
        } };
      dynamicViewData(state, action).should.eql({
        dynamic: {
          index: 15,
          value: {
            val1: { type: 'uinteger', value: 151 },
            val2: { type: 'uinteger', value: 152 },
            val3: { type: 'uinteger', value: 153 },
            val4: { type: 'enum', value: 15, symbol: 'val15' },
            referenceTimestamp: { type: 'time', value: 15 },
            time: { type: 'time', value: 15.2 },
          },
        },
      });
    });
  });
});
