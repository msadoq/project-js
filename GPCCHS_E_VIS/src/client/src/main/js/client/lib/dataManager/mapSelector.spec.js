// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : update of dataMap selector .
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : creatin of selectors on datamap
// VERSION : 1.1.2 : DM : #6700 : 27/07/2017 : update preparePubSub and add unit tests for it
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action viewData_clean
// END-HISTORY
// ====================================================================

import { isDataIdInDatamapLast, isTimestampInLastInterval } from './mapSelector';
import flattenDataId from '../common/flattenDataId';
import dataMapGenerator from './map';
import state from '../common/jest/stateTest';

describe('dataManager/mapSelector', () => {
  let dataId;
  beforeEach(() => {
    dataId = {
      catalog: 'Reporting',
      parameterName: 'paramName',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 0,
    };
  });

  const dataMap = dataMapGenerator(state);

  test('isDataIdInDatamapLast: empty state', () => {
    expect(isDataIdInDatamapLast({}, dataId)).toEqual([]);
  });
  test('isDataIdInDatamapLast: unknown dataId', () => {
    expect(isDataIdInDatamapLast(state, dataId)).toEqual([]);
  });
  test('isDataIdInDatamapLast: known dataId', () => {
    dataId.parameterName = 'TMMGT_BC_VIRTCHAN3';
    expect(isDataIdInDatamapLast(state, dataId)).toEqual([
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4',
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100',
    ]);
  });
  test('isTimestampInLastInterval: empty dataMap', () => {
    expect(isTimestampInLastInterval(dataMapGenerator({}),
    { tbdId: flattenDataId(dataId), timestamp: 200000 }))
    .toEqual(false);
  });
  test('isTimestampInLastInterval: unknown dataId', () => {
    expect(isTimestampInLastInterval(dataMap,
      { tbdId: flattenDataId(dataId), timestamp: 200000 })).toEqual(false);
  });
  test('isTimestampInLastInterval: known dataId timestamp ok', () => {
    dataId.parameterName = 'TMMGT_BC_VIRTCHAN3';
    expect(isTimestampInLastInterval(dataMap,
      { tbdId: flattenDataId(dataId), timestamp: 200000 })).toEqual(true);
  });
  test('isTimestampInLastInterval: known dataId timestamp nok', () => {
    dataId.parameterName = 'TMMGT_BC_VIRTCHAN3';
    expect(isTimestampInLastInterval(dataMap,
      { tbdId: flattenDataId(dataId), timestamp: 1200000 })).toEqual(false);
  });
});
