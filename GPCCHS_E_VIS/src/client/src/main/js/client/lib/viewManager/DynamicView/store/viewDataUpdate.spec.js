// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update DynamicView : plug it to data consumption
// END-HISTORY
// ====================================================================

import { viewDataUpdate, selectDataPerView } from './viewDataUpdate';

describe('viewManager/DynamicView/store/viewDataUpdate', () => {
  describe('Update', () => {
    test('should ignore payloads', () => {
      const frozen = Object.freeze({});
      expect(viewDataUpdate(frozen, {})).toBe(frozen);
    });
    test('should add', () => {
      const frozen = Object.freeze({});
      expect(viewDataUpdate(frozen, { index: 15, value: { va1: 300, val2: 400 } }))
        .toEqual({ index: 15, value: { va1: 300, val2: 400 } });
    });
    test('should update', () => {
      const state = Object.freeze({ index: '15', value: { va1: 300, val2: 400 } });
      expect(viewDataUpdate(state, { index: 20, value: { va1: 500, val2: 600 } }))
        .toEqual({ index: 20, value: { va1: 500, val2: 600 } });
    });
  });
  describe('selectDataPerView', () => {
    const payload = { rId1: {}, rId2: {} };
    for (let j = 10; j < 21; j += 1) {
      payload.rId1[j] = {
        val1: { type: 'uinteger', value: (j * 10) + 1 },
        val4: { type: 'enum', value: j - 10, symbol: 'val'.concat(j - 10) },
        referenceTimestamp: { type: 'time', value: j },
        time: { type: 'time', value: j },
        monitoringState: { type: 'uinteger', value: 'ok' },
      };

      payload.rId2[j] = payload.rId1[j];
    }

    const viewDataMap = {
      text2: {
        type: 'TextView',
        entryPoints: {
          ep5: {
            tbdId: 'rId1',
            field: 'val3',
            offset: 0,
            localId: 'localEp5',
          },
          ep6: {
            tbdId: 'rId2',
            field: 'val3',
            offset: 0,
            localId: 'localEp6',
          },
        },
      },
      dynamic: {
        type: 'DynamicView',
        entryPoints: {
          dynamicEP: {
            tbdId: 'rId1',
            offset: 0,
            localId: 'localEpDyn',
          },
        },
      },
    };
    const expectedIntervals = {
      rId1: {
        localrId1: { expectedInterval: [10, 20] },
        localEp5: { expectedInterval: [18, 20] },
        localEpDyn: { expectedInterval: [18, 20] },
      },
      rId2: {
        localrId2: { expectedInterval: [10, 13] },
        localEp6: { expectedInterval: [12, 20] },
      },
    };
    test('state undefined', () => {
      const data =
        selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, {});
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
    test('state with value > current', () => {
      const oldState = {
        index: 22,
        value: {
          val1: { type: 'uinteger', value: 221 },
          val4: { type: 'enum', value: 'val12', symbol: 'val12' },
          referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          time: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          monitoringState: { type: 'uinteger', value: 'ok' },
        } };
      const data = selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, oldState);
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
    test('state with value < current', () => {
      const oldState = { index: 19,
        value: {
          val1: { type: 'uinteger', value: 221 },
          val4: { type: 'enum', value: 'val12', symbol: 'val10' },
          referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          time: { type: 'time', value: '1970-01-01T00:00:00.019Z' },
          monitoringState: { type: 'uinteger', value: 'ok' },
        } };
      const data = selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, oldState);
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
    test('state with value = current', () => {
      const oldState = { index: 20,
        value: {
          val1: { type: 'uinteger', value: 221 },
          val4: { type: 'enum', value: 'val12', symbol: 'val10' },
          referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
          monitoringState: { type: 'uinteger', value: 'ok' },
        } };
      const data = selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, oldState);
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
    test('visuWindow duration too long', () => {
      const oldState = { index: 20,
        value: {
          val1: { type: 'uinteger', value: 221 },
          val4: { type: 'enum', value: 'val12', symbol: 'val10' },
          referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
          monitoringState: { type: 'uinteger', value: 'ok' },
        } };
      const intervals = {
        rId1: {
          localrId1: { expectedInterval: [10, 20] },
          localEp5: { expectedInterval: [18, 20] },
          localEpDyn: { error: 'visuWindow' },
        },
        rId2: {
          localrId2: { expectedInterval: [10, 13] },
          localEp6: { expectedInterval: [12, 20] },
        },
      };
      const data = selectDataPerView(viewDataMap.dynamic, intervals, payload, oldState);
      expect(data).toEqual({ });
    });
  });
});
