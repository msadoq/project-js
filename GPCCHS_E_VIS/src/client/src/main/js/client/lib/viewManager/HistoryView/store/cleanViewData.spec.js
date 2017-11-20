import _cloneDeep from 'lodash/cloneDeep';
import _omit from 'lodash/omit';
import cleanCurrentViewData, { updateEpLabel, removeViewDataByEp } from './cleanViewData';
import { freezeMe } from '../../../common/jest';
import state from '../../../common/jest/stateTest';
import dataMapGenerator from '../../../dataManager/map';


describe('viewManager/HistoryView/store/cleanViewData', () => {
  const dataMap = dataMapGenerator(state);
  const viewMap = dataMap.perView;
  const historyConfig = state.HistoryViewConfiguration;

  describe('cleanCurrentViewData', () => {
    test('no update', () => {
      const frozen = freezeMe(state.HistoryViewData.hist1);
      expect(
        cleanCurrentViewData(frozen, viewMap.hist1, viewMap.hist1, dataMap.expectedRangeIntervals,
          dataMap.expectedRangeIntervals, historyConfig)).toBe(frozen);
    });
    test('interval update History: keep all', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(dataMap.expectedRangeIntervals);
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:0']
      .expectedInterval[1] += 5000;
      const frozen = freezeMe(state.HistoryViewData.hist1);
      expect(
        cleanCurrentViewData(frozen, viewMap.hist1, newMap.hist1, dataMap.expectedRangeIntervals,
          newIntervals, historyConfig)).toBe(frozen);
    });
    test('interval update History: keep some', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(dataMap.expectedRangeIntervals);
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:0']
      .expectedInterval[1] += 5000;
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:0']
      .expectedInterval[0] += 5000;
      const newState = cleanCurrentViewData(freezeMe(state.HistoryViewData.hist1), viewMap.hist1,
        newMap.hist1, dataMap.expectedRangeIntervals, newIntervals, historyConfig);
      expect(newState).toMatchSnapshot();
    });
    test.skip('interval update History: remove all', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(dataMap.expectedRangeIntervals);
      newIntervals['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:rawValue.>.100']['extractedValue.tb1:0']
        .expectedInterval = [500030, 900000];
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:0']
        .expectedInterval = [500030, 900000];
      const newState = cleanCurrentViewData(freezeMe(state.HistoryViewData.hist1), viewMap.hist1,
              newMap.hist1, dataMap.expectedRangeIntervals, newIntervals, historyConfig);
      expect(newState).toEqual(
        { cols: state.HistoryViewData.hist1.cols, lines: [], data: {}, indexes: {} });
    });
    test('interval error History: remove all', () => {
      const newMap = _cloneDeep(viewMap);
      const newState = cleanCurrentViewData(freezeMe(state.HistoryViewData.hist1), viewMap.hist1,
        newMap.hist1, dataMap.expectedRangeIntervals, undefined, historyConfig);
      expect(newState).toEqual(
        { cols: state.HistoryViewData.hist1.cols, lines: [], data: {}, indexes: {} });
    });
    test('Ep renaming', () => {
      const newMap = _cloneDeep(viewMap);
      newMap.hist1.entryPoints = {
        ...newMap.hist1.entryPoints,
        ATT_BC_REVTCOUNT10: Object.assign({}, newMap.hist1.entryPoints.ATT_BC_REVTCOUNT1),
      };
      newMap.hist1.entryPoints = _omit(newMap.hist1.entryPoints, 'ATT_BC_REVTCOUNT1');
      expect(cleanCurrentViewData(Object.freeze(state.HistoryViewData.hist1), viewMap.hist1,
        newMap.hist1, dataMap.expectedRangeIntervals, dataMap.expectedRangeIntervals
        , historyConfig))
        .toMatchSnapshot();
    });
  });
  describe('updateEpLabel', () => {
    test('values ok', () => {
      expect(updateEpLabel(freezeMe(state.HistoryViewData.hist1), 'ATT_BC_REVTCOUNT1', 'ATT_BC_REVTCOUNT10'))
      .toEqual({ cols:
      ['referenceTimestamp',
        'extractedValue',
        'rawValue',
        'monitoringState'],
        lines:
        ['ATT_BC_REVTCOUNT10 100020',
          'ATT_BC_REVTCOUNT10 200020',
          'ATT_BC_REVTCOUNT10 300020',
          'ATT_BC_REVTCOUNT10 400020',
          'ATT_BC_REVTCOUNT10 500020'],
        indexes: { ATT_BC_REVTCOUNT10: ['100020', '200020', '300020', '400020', '500020'] },
        data: { ATT_BC_REVTCOUNT10: state.HistoryViewData.hist1.data.ATT_BC_REVTCOUNT1 },
      });
    });
    test('unknown value', () => {
      const frozen = freezeMe(state.HistoryViewData.hist1);
      expect(updateEpLabel(frozen, 'ATT_BC_REVTCOUNT10', 'ATT_BC_REVTCOUNT100')).toBe(frozen);
    });
  });
  describe('removeViewDataByEp', () => {
    test('should support empty state', () => {
      const frozen = freezeMe({});
      expect(removeViewDataByEp(frozen, 'TMMGT_BC_VIRTCHAN3', 10, 20)).toBe(frozen);
      const otherFrozen = freezeMe({ cols: [], lines: [], data: {}, indexes: {} });
      expect(removeViewDataByEp(otherFrozen, 'TMMGT_BC_VIRTCHAN3', 10, 20)).toBe(otherFrozen);
    });
    test('should support nothing to keep', () => {
      expect(removeViewDataByEp(freezeMe(state.HistoryViewData.hist1), 'ATT_BC_REVTCOUNT1', 0, 100))
      .toMatchSnapshot();
    });
    test('upper < lower: nothing to keep', () => {
      expect(removeViewDataByEp(freezeMe(state.HistoryViewData.hist1), 'ATT_BC_REVTCOUNT1', 10000, 100))
      .toMatchSnapshot();
    });
    test('should support partial keeping', () => {
      expect(removeViewDataByEp(freezeMe(state.HistoryViewData.hist1), 'ATT_BC_REVTCOUNT1', 100000, 250000))
      .toMatchSnapshot();
    });
    test('should support keep everything', () => {
      expect(removeViewDataByEp(freezeMe(state.HistoryViewData.hist1), 'ATT_BC_REVTCOUNT1', 100000, 600000))
      .toMatchSnapshot();
    });
  });
});
