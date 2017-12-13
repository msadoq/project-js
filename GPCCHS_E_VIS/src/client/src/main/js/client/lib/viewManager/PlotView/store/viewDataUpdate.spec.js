// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : Fix long data recovery for plot view
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Merge branch 'dev' into simplify_datamap
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in viewManager
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 02/08/2017 : Update unit tests for Plot View store
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json patch
// END-HISTORY
// ====================================================================

import { freezeMe } from 'common/jest';
import dataMapGenerator from 'dataManager/map';
import state from 'common/jest/stateTest';
import { viewRangeAdd, getExtremValue, selectDataPerView, selectEpData } from './viewDataUpdate';

describe('viewManager/PlotView/store/viewDataUpdate', () => {
  const dataMap = dataMapGenerator(state);

  describe('viewRangeAdd', () => {
    test('should ignore empty payloads call', () => {
      const previousState = freezeMe(state);
      const newState = viewRangeAdd(previousState, {});
      expect(newState).toBe(previousState);
    });
    test('should support empty state', () => {
      expect(viewRangeAdd(freezeMe({}), { ep1: {
        10: { x: 1, value: 0.1 },
        11: { x: 2, value: 0.1 } },
        min: { ep1: 0.1 },
        minTime: { ep1: 10 },
        max: { ep1: 0.1 },
        maxTime: { ep1: 11 },
      })).toEqual({
        indexes: { ep1: [10, 11] },
        lines: {
          ep1: {
            10: { masterTime: 10, x: 1, value: 0.1 },
            11: { masterTime: 11, x: 2, value: 0.1 },
          } },
        min: { ep1: 0.1 },
        minTime: { ep1: 10 },
        max: { ep1: 0.1 },
        maxTime: { ep1: 11 },
      });
    });
    describe('should add points', () => {
      test('one point in middle', () => {
        const frozen = freezeMe(state.PlotViewData.plot1);
        expect(viewRangeAdd(frozen, {
          TMMGT_BC_VIRTCHAN3: { 300100: {
            color: 'green',
            masterTime: 300120,
            symbol: 150,
            value: 150,
            x: 300100,
          } },
          max: { TMMGT_BC_VIRTCHAN3: 150 },
          maxTime: { TMMGT_BC_VIRTCHAN3: 300100 },
          min: { TMMGT_BC_VIRTCHAN3: 150 },
          minTime: { TMMGT_BC_VIRTCHAN3: 300100 },
        })).toMatchSnapshot();
      });
      test('points everywhere', () => {
        const frozen = freezeMe(state.PlotViewData.plot1);
        expect(viewRangeAdd(frozen, {
          TMMGT_BC_VIRTCHAN3: {
            90100: {
              color: 'darkred',
              masterTime: 90120,
              symbol: 139,
              value: 139,
              x: 90100,
            },
            200100: {
              color: 'blue',
              masterTime: 200120,
              symbol: 144,
              value: 144,
              x: 200100,
            },
          },
          ATT_BC_REVTCOUNT1: {
            300010: {
              color: 'green',
              masterTime: 300020,
              symbol: 159,
              value: 159,
              x: 300010,
            },
            500010: {
              color: 'green',
              masterTime: 500020,
              symbol: 169,
              value: 169,
              x: 500010,
            },
          },
          max: {
            TMMGT_BC_VIRTCHAN3: 144,
            ATT_BC_REVTCOUNT1: 169,
          },
          maxTime: {
            TMMGT_BC_VIRTCHAN3: 200100,
            ATT_BC_REVTCOUNT1: 500010,
          },
          min: {
            TMMGT_BC_VIRTCHAN3: 139,
            ATT_BC_REVTCOUNT1: 159,
          },
          minTime: {
            TMMGT_BC_VIRTCHAN3: 90100,
            ATT_BC_REVTCOUNT1: 300010,
          },
        })).toMatchSnapshot();
      });
    });
    describe('getExtremValue isMin', () => {
      test('isMin and new values are inferior', () => {
        const thisState = Object.freeze({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        expect(getExtremValue(thisState, 'ep1', { ep1: 90 }, { ep1: 0 }, true)).toEqual({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 90, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
      });
      test('!isMin and new values are superior', () => {
        const thisState = Object.freeze({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        expect(getExtremValue(thisState, 'ep1', { ep1: 300 }, { ep1: 5 }, false)).toEqual({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 300, ep2: 200.1 },
          maxTime: { ep1: 5, ep2: 1 },
        });
      });
      test('no min in state', () => {
        const thisState = Object.freeze({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep2: 200.1 },
          minTime: { ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        expect(getExtremValue(thisState, 'ep1', { ep1: 102 }, { ep1: 0 }, true)).toEqual({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
      });
      test('no max in state', () => {
        const thisState = Object.freeze({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep2: 200.1 },
          maxTime: { ep2: 1 },
        });
        expect(getExtremValue(thisState, 'ep1', { ep1: 105 }, { ep1: 5 }, false)).toEqual({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 105, ep2: 200.1 },
          maxTime: { ep1: 5, ep2: 1 },
        });
      });
    });
  });
  describe('data selection', () => {
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
        groundDate: { type: 'time', value: j },
        time: { type: 'time', value: j + 0.2 },
      };

      payload['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1'][j] =
        payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100'][j];
      payload.tbdId3[j] =
        payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100'][j];
    }

    describe('selectDataPerView', () => {
      test('empty state', () => {
        const bag =
          selectDataPerView(dataMap.perView.plot1, dataMap.expectedRangeIntervals, payload);
        expect(bag).toHaveKeys(['ATT_BC_REVTCOUNT1', 'TMMGT_BC_VIRTCHAN3', 'min', 'max', 'minTime', 'maxTime']);
      });
      test('viewMap undefined', () => {
        const newState =
          selectDataPerView(dataMap.perView.plot4, dataMap.expectedRangeIntervals, payload);
        expect(Object.keys(newState).length).toEqual(0);
      });
      test('no payload', () => {
        const newState =
          selectDataPerView(dataMap.perView.plot1, dataMap.expectedRangeIntervals, {});
        expect(Object.keys(newState).length).toEqual(0);
      });
    });
    describe('selectEpData', () => {
      test('undefined state', () => {
        const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
        const newState = selectEpData(payload[ep1],
          dataMap.perView.plot1.entryPoints.ATT_BC_REVTCOUNT1,
          'ATT_BC_REVTCOUNT1', undefined, dataMap.expectedRangeIntervals);
        expect(newState).toMatchSnapshot();
      });
      test('empty state', () => {
        const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
        const newState = selectEpData(payload[ep1],
          dataMap.perView.plot1.entryPoints.ATT_BC_REVTCOUNT1,
          'ATT_BC_REVTCOUNT1', {}, dataMap.expectedRangeIntervals);
        expect(newState).toMatchSnapshot();
      });
      test('state not empty', () => {
        const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
        const oldState = { OldTbdId: {
          10: { x: 11.5, col1: 101 },
          12: { x: 12.5, value: 102 },
        },
          min: { OldTbdId: 101 },
          max: { OldTbdId: 102 },
          minTime: { OldTbdId: 10 },
          maxTime: { OldTbdId: 12 },
        };
        const newState = selectEpData(payload[ep1],
          dataMap.perView.plot1.entryPoints.ATT_BC_REVTCOUNT1,
          'ATT_BC_REVTCOUNT1', oldState, dataMap.expectedRangeIntervals);
        expect(newState).toMatchSnapshot();
      });
      test('no interval', () => {
        const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
        const oldState = { OldTbdId: { 10: { x: 1001.5, col1: 101 },
          11: { x: 1002.5, value: 102 } },
          min: { OldTbdId: 101 },
          max: { OldTbdId: 102 },
          minTime: { OldTbdId: 10 },
          maxTime: { OldTbdId: 11 },
        };
        const newState = selectEpData(payload[ep1],
          dataMap.perView.plot1.entryPoints.ATT_BC_REVTCOUNT1,
          'ATT_BC_REVTCOUNT1', oldState, undefined);
        expect(newState).toEqual({});
      });
    });
  });
});
