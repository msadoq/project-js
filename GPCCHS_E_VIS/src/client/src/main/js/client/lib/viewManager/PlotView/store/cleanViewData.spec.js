import _cloneDeep from 'lodash/cloneDeep';
import _omit from 'lodash/omit';
import cleanCurrentViewData,
  { updateEpLabel,
    scanForMinAndMax,
    removeViewDataByEp } from './cleanViewData';
import { freezeMe } from '../../../common/jest';
import state from '../../../common/jest/stateTest';
import dataMapGenerator from '../../../dataManager/map';


describe('viewManager/PlotView/store/cleanViewData', () => {
  const dataMap = dataMapGenerator(state);
  const viewMap = dataMap.perView;

  describe('cleanCurrentViewData', () => {
    test('no update', () => {
      const frozen = freezeMe(state.PlotViewData.plot1);
      expect(
        cleanCurrentViewData(frozen, viewMap.plot1, viewMap.plot1, dataMap.expectedRangeIntervals,
          dataMap.expectedRangeIntervals)).toBe(frozen);
    });
    test('interval update Plot: keep all', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(dataMap.expectedRangeIntervals);
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:10000']
      .expectedInterval[1] += 5000;
      const frozen = freezeMe(state.PlotViewData.plot1);
      expect(
        cleanCurrentViewData(frozen, viewMap.plot1, newMap.plot1, dataMap.expectedRangeIntervals,
          newIntervals)).toBe(frozen);
    });
    test('interval update Plot: keep some', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(dataMap.expectedRangeIntervals);
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:10000']
      .expectedInterval[1] += 5000;
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:10000']
      .expectedInterval[0] += 5000;
      const newState = cleanCurrentViewData(freezeMe(state.PlotViewData.plot1), viewMap.plot1,
        newMap.plot1, dataMap.expectedRangeIntervals, newIntervals);
      expect(newState).toMatchSnapshot();
    });
    test('interval update Plot: remove all', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(dataMap.expectedRangeIntervals);
      newIntervals['Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100']['groundDate/extractedValue.tb1:0']
        .expectedInterval = [500030, 900000];
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:10000']
        .expectedInterval = [490030, 890000];
      newIntervals['Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1']['groundDate/extractedValue.tb1:0']
        .expectedInterval = [500030, 900000];
      const newState = cleanCurrentViewData(freezeMe(state.PlotViewData.plot1), viewMap.plot1,
              newMap.plot1, dataMap.expectedRangeIntervals, newIntervals);
      expect(newState).toEqual({ indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: { },
        maxTime: { },
      });
    });
    test('interval error Plot: remove all', () => {
      const newMap = _cloneDeep(viewMap);
      const newState = cleanCurrentViewData(freezeMe(state.PlotViewData.plot1), viewMap.plot1,
        newMap.plot1, dataMap.expectedRangeIntervals, undefined);
      expect(newState).toEqual({ indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: { },
        maxTime: { },
      });
    });
    test('Ep renaming', () => {
      const newMap = _cloneDeep(viewMap);
      let newPlotData = _cloneDeep(state.PlotViewData.plot1);

      newPlotData = {
        ...newPlotData,
        lines: {
          ..._omit(newPlotData.lines, 'ATT_BC_REVTCOUNT1'),
          ATT_BC_REVTCOUNT10: newPlotData.lines.ATT_BC_REVTCOUNT1,
        },
        indexes: {
          ..._omit(newPlotData.indexes, 'ATT_BC_REVTCOUNT1'),
          ATT_BC_REVTCOUNT10: newPlotData.indexes.ATT_BC_REVTCOUNT1,
        },
        min: {
          ..._omit(newPlotData.min, 'ATT_BC_REVTCOUNT1'),
          ATT_BC_REVTCOUNT10: newPlotData.min.ATT_BC_REVTCOUNT1,
        },
        minTime: {
          ..._omit(newPlotData.minTime, 'ATT_BC_REVTCOUNT1'),
          ATT_BC_REVTCOUNT10: newPlotData.minTime.ATT_BC_REVTCOUNT1,
        },
        max: {
          ..._omit(newPlotData.max, 'ATT_BC_REVTCOUNT1'),
          ATT_BC_REVTCOUNT10: newPlotData.max.ATT_BC_REVTCOUNT1,
        },
        maxTime: {
          ..._omit(newPlotData.maxTime, 'ATT_BC_REVTCOUNT1'),
          ATT_BC_REVTCOUNT10: newPlotData.maxTime.ATT_BC_REVTCOUNT1,
        },
      };
      newMap.plot1.entryPoints = {
        ...newMap.plot1.entryPoints,
        ATT_BC_REVTCOUNT10: Object.assign({}, newMap.plot1.entryPoints.ATT_BC_REVTCOUNT1),
      };
      newMap.plot1.entryPoints = _omit(newMap.plot1.entryPoints, 'ATT_BC_REVTCOUNT1');
      expect(cleanCurrentViewData(Object.freeze(state.PlotViewData.plot1), viewMap.plot1,
        newMap.plot1, dataMap.expectedRangeIntervals, dataMap.expectedRangeIntervals))
        .toEqual(newPlotData);
    });
  });
  describe('updateEpLabel', () => {
    test('values ok', () => {
      expect(updateEpLabel(freezeMe(state.PlotViewData.plot1), 'ATT_BC_REVTCOUNT1', 'ATT_BC_REVTCOUNT10'))
      .toMatchSnapshot();
    });
    test('unknown value', () => {
      const frozen = freezeMe(state.PlotViewData.plot1);
      expect(updateEpLabel(frozen, 'ATT_BC_REVTCOUNT10', 'ATT_BC_REVTCOUNT100')).toBe(frozen);
    });
  });
  describe('scanForMinAndMax', () => {
    test('nothing to change', () => {
      const frozen = freezeMe(state.PlotViewData.plot1);
      expect(scanForMinAndMax(frozen)).toBe(frozen);
    });
    test('min to update', () => {
      const plotViewData = _cloneDeep(state.PlotViewData.plot1);
      plotViewData.minTime.TMMGT_BC_VIRTCHAN3 = 900000;
      expect(scanForMinAndMax(freezeMe(plotViewData))).toMatchSnapshot();
    });
    test('max to update', () => {
      const plotViewData = _cloneDeep(state.PlotViewData.plot1);
      plotViewData.maxTime.TMMGT_BC_VIRTCHAN3 = 1000;
      expect(scanForMinAndMax(freezeMe(plotViewData))).toMatchSnapshot();
    });
  });
  describe('removeViewDataByEp', () => {
    test('should support empty state', () => {
      const frozen = freezeMe({});
      expect(removeViewDataByEp(frozen, 10, 20)).toBe(frozen);
      const otherFrozen = freezeMe({ indexes: {} });
      expect(removeViewDataByEp(otherFrozen, 10, 20)).toBe(otherFrozen);
    });
    test('should support nothing to keep', () => {
      expect(removeViewDataByEp(freezeMe(state.PlotViewData.plot1), 'TMMGT_BC_VIRTCHAN3', 0, 100))
      .toMatchSnapshot();
    });
    test('upper < lower: nothing to keep', () => {
      expect(removeViewDataByEp(freezeMe(state.PlotViewData.plot1), 'TMMGT_BC_VIRTCHAN3', 10000, 100))
      .toMatchSnapshot();
    });
    test('should support partial keeping', () => {
      expect(removeViewDataByEp(freezeMe(state.PlotViewData.plot1), 'TMMGT_BC_VIRTCHAN3', 100000, 200020))
      .toMatchSnapshot();
    });
    test('should support keep everything', () => {
      expect(removeViewDataByEp(freezeMe(state.PlotViewData.plot1), 'TMMGT_BC_VIRTCHAN3', 100000, 600000))
      .toMatchSnapshot();
    });
  });
});
