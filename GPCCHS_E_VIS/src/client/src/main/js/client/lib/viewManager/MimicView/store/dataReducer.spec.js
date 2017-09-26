// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 16/05/2017 : Fix tests on mimic view
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for mocha .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Plug mimic view to data consumption
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json patch
// END-HISTORY
// ====================================================================

import moment from 'moment';
import mimicViewData from './dataReducer';
import * as types from '../../../store/types';
import { freezeMe } from '../../../common/jest';

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

  test('DATA_REMOVE_ALL_VIEWDATA', () => {
    const state = freezeMe({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    const action = { type: types.DATA_REMOVE_ALL_VIEWDATA };
    expect(mimicViewData(state, action)).toEqual({});
  });
  test('HSC_CLOSE_WORKSPACE', () => {
    const state = freezeMe({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    expect(mimicViewData(state, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
  });
  test('WS_VIEW_RELOAD', () => {
    const action = { type: types.WS_VIEW_RELOAD,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(mimicViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'MimicView', uuid: 'myMimic' };
    expect(mimicViewData(freezeMe({}), action)).toEqual({ myMimic: { index: {}, values: {} } });
  });
  test('WS_VIEW_OPENED', () => {
    const action = { type: types.WS_VIEW_OPENED,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(mimicViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'MimicView', uuid: 'myMimic' };
    expect(mimicViewData(freezeMe({}), action)).toEqual({ myMimic: { index: {}, values: {} } });
  });
  test('WS_VIEW_ADD_BLANK', () => {
    const action = { type: types.WS_VIEW_ADD_BLANK,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(mimicViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'MimicView', uuid: 'myMimic' };
    expect(mimicViewData(freezeMe({}), action)).toEqual({ myMimic: { index: {}, values: {} } });
  });
  test('WS_PAGE_OPENED', () => {
    const action = { type: types.WS_PAGE_OPENED,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'MimicView', uuid: 'myMimic' }] } };
    expect(mimicViewData(freezeMe({}), action)).toEqual({ myMimic: { index: {}, values: {} } });
  });
  test('WS_WORKSPACE_OPENED', () => {
    const action = { type: types.WS_WORKSPACE_OPENED,
      payload: { views:
        [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'MimicView', uuid: 'myMimic' }] } };
    expect(mimicViewData(freezeMe({}), action)).toEqual({ myMimic: { index: {}, values: {} } });
  });
  test('WS_VIEW_CLOSE', () => {
    const action = { type: types.WS_VIEW_CLOSE, payload: { viewId: 'myPlot' } };
    expect(mimicViewData(freezeMe({}), action)).toEqual({});
    const frozen = freezeMe({ myMimic: { index: {}, values: {} } });
    expect(mimicViewData(freezeMe(frozen), action)).toBe(frozen);
    action.payload.viewId = 'myMimic';
    expect(mimicViewData(frozen, action)).toEqual({});
  });
  test('WS_PAGE_CLOSE', () => {
    const action = { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['myPlot', 'myMimic'] } };
    expect(
      mimicViewData(freezeMe({ myMimic: {}, myOtherMimic: {} }), action))
        .toEqual({ myOtherMimic: {} }
    );
  });
  test('Unknown action', () => {
    const action = { type: types.UNKNOWN, payload: { viewId: 'myText' } };
    const frozen = freezeMe({ myText: { index: {}, values: {} } });
    expect(mimicViewData(freezeMe(frozen), action)).toBe(frozen);
  });
  describe('INJECT_DATA_LAST', () => {
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
              tbdId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
          },
        },
        plot: {
          type: 'PlotView',
          entryPoints: {
            ep2: {
              tbdId: 'rId2',
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
              tbdId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
            ep4: {
              tbdId: 'rId2',
              field: 'val4',
              localId: 'local4',
            },
          },
        },
        plot: {
          type: 'PlotView',
          entryPoints: {
            ep2: {
              tbdId: 'rId1',
              fieldX: 'time',
              fieldY: 'val2',
              offset: 0,
              localId: 'local2',
            },
            ep3: {
              tbdId: 'rId2',
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
    test('valid viewData with empty state', () => {
      const action = { type: types.INJECT_DATA_LAST,
        payload: {
          oldViewMap,
          newViewMap,
          oldExpectedLastIntervals: oldExpectedIntervals,
          newExpectedLastIntervals: newExpectedIntervals,
          dataToInject,
        } };
      expect(mimicViewData(freezeMe({ text: { index: {}, values: {} } }), action)).toEqual({
        text: {
          index: { ep1: 10, ep4: 9 },
          values: {
            ep1: { value: moment(10).utc().toISOString() },
            ep4: { value: 'val9' } },
        },
      });
    });
    test('valid viewData with state', () => {
      const state = freezeMe({ text: {
        index: { ep1: 9, ep4: 9 },
        values: {
          ep1: { value: moment(9).utc().toISOString() },
          ep4: { value: 'val9', monit: undefined } },
      } });
      const action = { type: types.INJECT_DATA_LAST,
        payload: {
          oldViewMap,
          newViewMap,
          oldExpectedLastIntervals: oldExpectedIntervals,
          newExpectedLastIntervals: newExpectedIntervals,
          dataToInject,
        } };
      expect(mimicViewData(state, action)).toEqual({
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
