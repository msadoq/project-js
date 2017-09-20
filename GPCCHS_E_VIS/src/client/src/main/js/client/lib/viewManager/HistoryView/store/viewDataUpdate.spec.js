import { freezeMe } from '../../../common/jest';
import { compareValue, viewRangeAdd, selectEpData, addDataInEpTable, updateLines }
  from './viewDataUpdate';
import dataMapGenerator from '../../../dataManager/map';
import state from '../../../common/jest/stateTest';
import { SORTING_DESC, SORTING_ASC } from '../../../constants';

describe('viewManager/HistoryView/store/viewDataUpdate', () => {
  const dataMap = dataMapGenerator(state);
  const resultState = {
    ATT_BC_REVTCOUNT1: {
      100120: {
        extractedValue: { type: 'uinteger', value: 11.012 },
        rawValue: { type: 'uinteger', value: 100122 },
        convertedValue: { type: 'uinteger', value: -100120 },
        referenceTimestamp: { type: 'time', value: 100120 },
        groundDate: { type: 'time', value: 100120 },
        time: { type: 'time', value: 100120.2 },
        epName: { type: 'string', value: 'ATT_BC_REVTCOUNT1' },
        masterTime: { type: 'time', value: 100120 },
      },
      100220: {
        extractedValue: { type: 'uinteger', value: 11.022 },
        rawValue: { type: 'uinteger', value: 100222 },
        convertedValue: { type: 'uinteger', value: -100220 },
        referenceTimestamp: { type: 'time', value: 100220 },
        groundDate: { type: 'time', value: 100220 },
        time: { type: 'time', value: 100220.2 },
        epName: { type: 'string', value: 'ATT_BC_REVTCOUNT1' },
        masterTime: { type: 'time', value: 100220 },
      },
      100320: {
        extractedValue: { type: 'uinteger', value: 11.032 },
        rawValue: { type: 'uinteger', value: 100322 },
        convertedValue: { type: 'uinteger', value: -100320 },
        referenceTimestamp: { type: 'time', value: 100320 },
        groundDate: { type: 'time', value: 100320 },
        time: { type: 'time', value: 100320.2 },
        epName: { type: 'string', value: 'ATT_BC_REVTCOUNT1' },
        masterTime: { type: 'time', value: 100320 },
      },
    },
  };

  const payload = {
    'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100': {},
    'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': {},
    tbdId3: {} };
  for (let j = 100120; j < 100420; j += 100) {
    payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100'][j]
    = {
      extractedValue: { type: 'uinteger', value: (j / 10000) + 1 },
      rawValue: { type: 'uinteger', value: j + 2 },
      convertedValue: { type: 'uinteger', value: -j },
      referenceTimestamp: { type: 'time', value: j },
      groundDate: { type: 'time', value: j },
      time: { type: 'time', value: j + 0.2 },
    };

    payload['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1'][j] =
      payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100'][j];
    payload.tbdId3[j] =
      payload['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100'][j];
  }

  describe('selectEpData', () => {
    test('no sorting, empty SubState', () => {
      const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
      const newState = selectEpData(payload[ep1],
        dataMap.perView.hist1.entryPoints.ATT_BC_REVTCOUNT1,
        'ATT_BC_REVTCOUNT1', dataMap.expectedRangeIntervals);
      expect(newState).toEqual(resultState);
    });
    test('sorting on known column: up', () => {
      const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
      const newState = selectEpData(payload[ep1],
        dataMap.perView.hist1.entryPoints.ATT_BC_REVTCOUNT1,
        'ATT_BC_REVTCOUNT1', dataMap.expectedRangeIntervals,
        { colName: 'convertedValue', direction: SORTING_ASC });
      expect(newState).toEqual(resultState);
    });
    test('sorting on known column: down', () => {
      const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
      const newState = selectEpData(payload[ep1],
        dataMap.perView.hist1.entryPoints.ATT_BC_REVTCOUNT1,
        'ATT_BC_REVTCOUNT1', dataMap.expectedRangeIntervals,
        { colName: 'convertedValue', direction: SORTING_DESC });

      expect(newState).toEqual(resultState);
    });
    test('sorting on unknown column', () => {
      const ep1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
      const newState = selectEpData(payload[ep1],
        dataMap.perView.hist1.entryPoints.ATT_BC_REVTCOUNT1,
        'ATT_BC_REVTCOUNT1', dataMap.expectedRangeIntervals,
        { colName: 'colValue', direction: SORTING_DESC });
      expect(newState).toEqual(resultState);
    });
  });
  describe('compareValue', () => {
    test('no dataRef', () => {
      expect(compareValue(undefined, 102, SORTING_ASC)).toEqual(true);
    });
    test('direction up', () => {
      expect(compareValue(100, 102, SORTING_ASC)).toEqual(false);
      expect(compareValue(110, 102, SORTING_ASC)).toEqual(true);
      expect(compareValue('a', 'b', SORTING_ASC)).toEqual(false);
      expect(compareValue('c', 'b', SORTING_ASC)).toEqual(true);
    });
    test('direction down', () => {
      expect(compareValue(100, 102, SORTING_DESC)).toEqual(true);
      expect(compareValue(110, 102, SORTING_DESC)).toEqual(false);
      expect(compareValue('a', 'b', SORTING_DESC)).toEqual(true);
      expect(compareValue('c', 'b', SORTING_DESC)).toEqual(false);
    });
  });
  describe('addDataInEpTable', () => {
    test('no dataRef', () => {
      expect(addDataInEpTable([], -1, resultState.ATT_BC_REVTCOUNT1[100220]))
      .toEqual({ newState: [resultState.ATT_BC_REVTCOUNT1[100220]] });
    });
    test('dataRef not empty: insert', () => {
      expect(addDataInEpTable([resultState.ATT_BC_REVTCOUNT1[100120],
        resultState.ATT_BC_REVTCOUNT1[100320]], 1, resultState.ATT_BC_REVTCOUNT1[100220]))
      .toEqual({ newState: [resultState.ATT_BC_REVTCOUNT1[100120],
        resultState.ATT_BC_REVTCOUNT1[100220], resultState.ATT_BC_REVTCOUNT1[100320]] });
    });
    test('dataRef not empty: push', () => {
      expect(addDataInEpTable([resultState.ATT_BC_REVTCOUNT1[100120],
        resultState.ATT_BC_REVTCOUNT1[100220]], -1, resultState.ATT_BC_REVTCOUNT1[100320]))
      .toEqual({ newState: [resultState.ATT_BC_REVTCOUNT1[100120],
        resultState.ATT_BC_REVTCOUNT1[100220], resultState.ATT_BC_REVTCOUNT1[100320]] });
    });
  });
  describe('updateLines', () => {
    test('state lines empty', () => {
      const thisState = {
        cols: [],
        lines: [],
        data: { ATT_BC_REVTCOUNT1: { 100220: resultState.ATT_BC_REVTCOUNT1[100220] } },
        indexes: { ATT_BC_REVTCOUNT1: [100220] },
      };
      expect(updateLines(thisState, 'ATT_BC_REVTCOUNT1', 100220, 'referenceTimestamp', SORTING_ASC))
      .toEqual({
        cols: [],
        lines: ['ATT_BC_REVTCOUNT1 100220'],
        data: thisState.data,
        indexes: thisState.indexes,
      });
    });
    test('state lines not empty : no renumbering', () => {
      const thisState = {
        cols: [],
        lines: ['ATT_BC_REVTCOUNT1 100120', 'TMMGT_BC_VIRTCHAN3 100225', 'TMMGT_BC_VIRTCHAN3 100226'],
        indexes: {
          ATT_BC_REVTCOUNT1: [100120, 100220],
          TMMGT_BC_VIRTCHAN3: [100225, 100226],
        },
        data: {
          ATT_BC_REVTCOUNT1: {
            100120: resultState.ATT_BC_REVTCOUNT1[100120],
            100220: resultState.ATT_BC_REVTCOUNT1[100220],
          },
          TMMGT_BC_VIRTCHAN3: {
            100225: {
              extractedValue: { type: 'uinteger', value: 101.025 },
              rawValue: { type: 'uinteger', value: 100525 },
              convertedValue: { type: 'uinteger', value: -100525 },
              referenceTimestamp: { type: 'time', value: 100225 },
              groundDate: { type: 'time', value: 100225 },
              time: { type: 'time', value: 100220.5 },
              epName: { type: 'string', value: 'TMMGT_BC_VIRTCHAN3' },
              masterTime: { type: 'time', value: 100225 },
            },
            100226: {
              extractedValue: { type: 'uinteger', value: 11.025 },
              rawValue: { type: 'uinteger', value: 100225 },
              convertedValue: { type: 'uinteger', value: -100225 },
              referenceTimestamp: { type: 'time', value: 100226 },
              groundDate: { type: 'time', value: 100225 },
              time: { type: 'time', value: 100220.5 },
              epName: { type: 'string', value: 'TMMGT_BC_VIRTCHAN3' },
              masterTime: { type: 'time', value: 100226 },
            },
          },
        },
      };
      expect(updateLines(thisState, 'ATT_BC_REVTCOUNT1', 100220, 'referenceTimestamp', SORTING_ASC))
        .toEqual({
          cols: thisState.cols,
          lines: ['ATT_BC_REVTCOUNT1 100120', 'ATT_BC_REVTCOUNT1 100220',
            'TMMGT_BC_VIRTCHAN3 100225', 'TMMGT_BC_VIRTCHAN3 100226'],
          indexes: thisState.indexes,
          data: thisState.data,
        });
    });
    test('state lines not empty : renumbering', () => {
      const thisState = {
        cols: [],
        lines: ['ATT_BC_REVTCOUNT1 100220', 'ATT_BC_REVTCOUNT1 100120'],
        indexes: {
          ATT_BC_REVTCOUNT1: [100120, 100220, 100320],
        },
        data: {
          ATT_BC_REVTCOUNT1: {
            100120: resultState.ATT_BC_REVTCOUNT1[100120],
            100220: resultState.ATT_BC_REVTCOUNT1[100220],
            100320: resultState.ATT_BC_REVTCOUNT1[100320],
          },
        } };

      expect(updateLines(thisState, 'ATT_BC_REVTCOUNT1', 100320, 'referenceTimestamp', SORTING_DESC))
        .toEqual({
          cols: [],
          lines: ['ATT_BC_REVTCOUNT1 100320', 'ATT_BC_REVTCOUNT1 100220', 'ATT_BC_REVTCOUNT1 100120'],
          data: thisState.data,
          indexes: thisState.indexes,
        });
    });
  });
  describe('viewRangeAdd', () => {
    const viewConfig = {
      sorting: { colName: 'referenceTimestamp', direction: SORTING_ASC },
    };
    test('no payload', () => {
      const thisState = freezeMe({});
      expect(viewRangeAdd(thisState, 'hist1', [], viewConfig)).toEqual(thisState);
    });
    test('payload, old state empty', () => {
      const thisState = freezeMe({});
      expect(viewRangeAdd(thisState, 'hist1', resultState, viewConfig)).toEqual({
        lines: ['ATT_BC_REVTCOUNT1 100120', 'ATT_BC_REVTCOUNT1 100220', 'ATT_BC_REVTCOUNT1 100320'],
        cols: [],
        data: {
          ATT_BC_REVTCOUNT1: {
            100120: resultState.ATT_BC_REVTCOUNT1[100120],
            100220: resultState.ATT_BC_REVTCOUNT1[100220],
            100320: resultState.ATT_BC_REVTCOUNT1[100320],
          },
        },
        indexes: {
          ATT_BC_REVTCOUNT1: ['100120', '100220', '100320'],
        },
      });
    });
    test('payload, old state not empty', () => {
      const thisState = freezeMe({
        lines: ['TMMGT_BC_VIRTCHAN3 100025', 'TMMGT_BC_VIRTCHAN3 100225'],
        data: {
          TMMGT_BC_VIRTCHAN3: {
            100025: {
              extractedValue: { type: 'uinteger', value: 101.025 },
              rawValue: { type: 'uinteger', value: 100525 },
              convertedValue: { type: 'uinteger', value: -100525 },
              referenceTimestamp: { type: 'time', value: 100025 },
              groundDate: { type: 'time', value: 100225 },
              time: { type: 'time', value: 100220.5 },
              epName: { type: 'string', value: 'TMMGT_BC_VIRTCHAN3' },
              masterTime: { type: 'time', value: 100025 },
            },
            100225: {
              extractedValue: { type: 'uinteger', value: 11.025 },
              rawValue: { type: 'uinteger', value: 100225 },
              convertedValue: { type: 'uinteger', value: -100225 },
              referenceTimestamp: { type: 'time', value: 100225 },
              groundDate: { type: 'time', value: 100225 },
              time: { type: 'time', value: 100220.5 },
              epName: { type: 'string', value: 'TMMGT_BC_VIRTCHAN3' },
              masterTime: { type: 'time', value: 100225 },
            },
          },
        },
        indexes: {
          TMMGT_BC_VIRTCHAN3: ['100025', '100225'],
        },
        cols: ['extractedValue', 'rawValue', 'convertedValue', 'referenceTimestamp',
          'groundDate', 'time', 'epName', 'masterTime'],
      });

      const nState = viewRangeAdd(thisState, 'hist1', resultState, viewConfig);
      expect(nState).toEqual({
        data: {
          ...thisState.data,
          ...resultState,
        },
        indexes: {
          TMMGT_BC_VIRTCHAN3: ['100025', '100225'],
          ATT_BC_REVTCOUNT1: ['100120', '100220', '100320'],
        },
        lines: ['TMMGT_BC_VIRTCHAN3 100025', 'ATT_BC_REVTCOUNT1 100120', 'ATT_BC_REVTCOUNT1 100220',
          'TMMGT_BC_VIRTCHAN3 100225', 'ATT_BC_REVTCOUNT1 100320'],
        cols: thisState.cols,
      });
    });
  });
});
