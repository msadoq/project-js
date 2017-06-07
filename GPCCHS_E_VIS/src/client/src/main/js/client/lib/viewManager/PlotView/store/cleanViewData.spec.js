import _cloneDeep from 'lodash/cloneDeep';
import cleanCurrentViewData,
  { updateEpLabel,
    scanForMinAndMax,
    removeViewDataByEp } from './cleanViewData';
import { freezeMe } from '../../../common/test';


describe('viewManager/PlotView/store/cleanViewData', () => {
  let viewDataState;
  let viewMap;
  let oldIntervals;
  // let newIntervals;
  beforeEach(() => {
    viewMap = {
      plot: {
        type: 'PlotView',
        masterSessionId: 10,
        structureType: 'range',
        entryPoints: {
          STAT_SU_PID: {
            id: 'id60',
            dataId: {
              catalog: 'Reporting',
              parameterName: 'STAT_SU_PID',
              comObject: 'ReportingParameter',
              domainId: 4,
              sessionId: 181,
            },
            fieldX: 'groundDate',
            fieldY: 'extractedValue',
            offset: 0,
            filter: [],
            localId: 'groundDate/extractedValue.tb1:0/0',
            timebarUuid: 'tb1',
            structureType: 'range',
            remoteId: 'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
            stateColors: [{
              color: '#000000',
              condition: {
                field: 'monitoringState',
                operator: '==',
                operand: 'waiting',
              },
            }],
          },
          STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
        },
      },
    };
    viewDataState = {
      plot: {
        indexes: { STAT_SU_PID: [10, 11, 12, 13, 14, 15, 16] },
        lines: {
          STAT_SU_PID: [
          { masterTime: 10, value: 13, x: 10 },
          { masterTime: 11, value: 13, x: 11 },
          { masterTime: 12, value: 13, x: 12 },
          { masterTime: 13, value: 13, x: 13 },
          { masterTime: 14, value: 13, x: 14 },
          { masterTime: 15, value: 13, x: 15 },
          { masterTime: 16, value: 13, x: 16 },
          ] },
        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      },
    };
    oldIntervals = {
      'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'extractedValue.tb1:0': { expectedInterval: [10, 15] },
      },
      'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'extractedValue.tb1:0': { expectedInterval: [10, 15] },
      },
      'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'groundDate/extractedValue.tb1:0/0': { expectedInterval: [10, 20] },
      },
      'last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
        'undefined.tb1:0': { expectedInterval: [10, 15] },
      },
    };
  });

  describe('cleanCurrentViewData', () => {
    it('no update', () => {
      const frozen = freezeMe(viewDataState.plot);
      expect(
        cleanCurrentViewData(frozen, viewMap.plot, viewMap.plot, oldIntervals, oldIntervals)
      ).toBe(frozen);
    });
    it('interval update Dynamic: keep', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(oldIntervals);
      newIntervals['last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4']['undefined.tb1:0'].expectedInterval
        = [12, 17];
      const frozen = freezeMe(viewDataState.plot);
      const newState = cleanCurrentViewData(frozen, viewMap.plot, newMap.plot, oldIntervals,
        newIntervals);
      expect(newState).toBe(frozen);
    });
    it('interval update Plot: keep all', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(oldIntervals);
      newIntervals['range@Reporting.STAT_SU_PID<ReportingParameter>:181:4']['groundDate/extractedValue.tb1:0/0'].expectedInterval
        = [10, 25];
      const frozen = freezeMe(viewDataState.plot);
      expect(
        cleanCurrentViewData(frozen, viewMap.plot, newMap.plot, oldIntervals, newIntervals)
      ).toBe(frozen);
    });
    it('interval update Plot: keep some', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(oldIntervals);
      newIntervals['range@Reporting.STAT_SU_PID<ReportingParameter>:181:4']['groundDate/extractedValue.tb1:0/0'].expectedInterval
        = [15, 25];
      const newState = cleanCurrentViewData(freezeMe(viewDataState.plot), viewMap.plot, newMap.plot,
        oldIntervals, newIntervals);
      expect(newState.lines.STAT_SU_PID).toEqual([
        { masterTime: 15, value: 13, x: 15 },
        { masterTime: 16, value: 13, x: 16 },
      ]);
      expect(newState.indexes.STAT_SU_PID).toEqual([15, 16]);
      expect(newState.min).toEqual({ STAT_SU_PID: 13 });
      expect(newState.max).toEqual({ STAT_SU_PID: 13 });
      expect(newState.minTime).toEqual({ STAT_SU_PID: 16 });
      expect(newState.maxTime).toEqual({ STAT_SU_PID: 16 });
    });
    it('interval update Plot: remove all', () => {
      const newMap = _cloneDeep(viewMap);
      const newIntervals = _cloneDeep(oldIntervals);
      newIntervals['range@Reporting.STAT_SU_PID<ReportingParameter>:181:4']['groundDate/extractedValue.tb1:0/0'].expectedInterval
        = [20, 25];
      const newState = cleanCurrentViewData(Object.freeze(viewDataState.plot), viewMap.plot,
        newMap.plot, oldIntervals, newIntervals);
      expect(newState).toEqual({ indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: { },
        maxTime: { },
      });
    });
    it('Ep renaming', () => {
      const newPlot = { entryPoints: {
        STAT_SU_PID10: {
          id: 'id60',
          dataId: {
            catalog: 'Reporting',
            parameterName: 'STAT_SU_PID',
            comObject: 'ReportingParameter',
            domainId: 4,
            sessionId: 181,
          },
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          offset: 0,
          filter: [],
          localId: 'groundDate/extractedValue.tb1:0/0',
          timebarUuid: 'tb1',
          structureType: 'range',
          remoteId: 'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
          stateColors: [{
            color: '#000000',
            condition: {
              field: 'monitoringState',
              operator: '==',
              operand: 'waiting',
            },
          }],
        },
        STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
      } };
      const newIntervals = _cloneDeep(oldIntervals);
      newIntervals['range@Reporting.STAT_SU_PID<ReportingParameter>:181:4']['groundDate/extractedValue.tb1:0/0']
        .expectedInterval = [15, 25];

      expect(cleanCurrentViewData(Object.freeze(viewDataState.plot), viewMap.plot,
        newPlot, oldIntervals, oldIntervals)).toEqual({
          indexes: { STAT_SU_PID10: [10, 11, 12, 13, 14, 15, 16] },
          lines: {
            STAT_SU_PID10: [
            { masterTime: 10, value: 13, x: 10 },
            { masterTime: 11, value: 13, x: 11 },
            { masterTime: 12, value: 13, x: 12 },
            { masterTime: 13, value: 13, x: 13 },
            { masterTime: 14, value: 13, x: 14 },
            { masterTime: 15, value: 13, x: 15 },
            { masterTime: 16, value: 13, x: 16 },
            ] },
          min: { STAT_SU_PID10: 13 },
          max: { STAT_SU_PID10: 13 },
          minTime: { STAT_SU_PID10: 16 },
          maxTime: { STAT_SU_PID10: 16 },
        });
    });
  });
  describe('updateEpLabel', () => {
    it('values ok', () => {
      expect(updateEpLabel(freezeMe(viewDataState.plot), 'STAT_SU_PID', 'STAT_SU_PID1')).toEqual({
        indexes: { STAT_SU_PID1: [10, 11, 12, 13, 14, 15, 16] },
        lines: {
          STAT_SU_PID1: [
          { masterTime: 10, value: 13, x: 10 },
          { masterTime: 11, value: 13, x: 11 },
          { masterTime: 12, value: 13, x: 12 },
          { masterTime: 13, value: 13, x: 13 },
          { masterTime: 14, value: 13, x: 14 },
          { masterTime: 15, value: 13, x: 15 },
          { masterTime: 16, value: 13, x: 16 },
          ] },
        min: { STAT_SU_PID1: 13 },
        max: { STAT_SU_PID1: 13 },
        minTime: { STAT_SU_PID1: 16 },
        maxTime: { STAT_SU_PID1: 16 },
      });
    });
    it('unknown value', () => {
      const frozen = freezeMe(viewDataState.plot);
      expect(updateEpLabel(frozen, 'STAT_SU_PID2', 'STAT_SU_PID1')).toBe(frozen);
    });
  });
  describe('scanForMinAndMax', () => {
    it('nothing to change', () => {
      const frozen = freezeMe(viewDataState.plot);
      expect(scanForMinAndMax(frozen)).toBe(frozen);
    });
    it('min to update', () => {
      viewDataState.plot.minTime.STAT_SU_PID = 100;
      expect(scanForMinAndMax(freezeMe(viewDataState.plot))).toEqual({
        indexes: { STAT_SU_PID: [10, 11, 12, 13, 14, 15, 16] },
        lines: {
          STAT_SU_PID: [
          { masterTime: 10, value: 13, x: 10 },
          { masterTime: 11, value: 13, x: 11 },
          { masterTime: 12, value: 13, x: 12 },
          { masterTime: 13, value: 13, x: 13 },
          { masterTime: 14, value: 13, x: 14 },
          { masterTime: 15, value: 13, x: 15 },
          { masterTime: 16, value: 13, x: 16 },
          ] },
        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      });
    });
    it('max to update', () => {
      viewDataState.plot.maxTime.STAT_SU_PID = 1;
      expect(scanForMinAndMax(freezeMe(viewDataState.plot))).toEqual({
        indexes: { STAT_SU_PID: [10, 11, 12, 13, 14, 15, 16] },
        lines: {
          STAT_SU_PID: [
          { masterTime: 10, value: 13, x: 10 },
          { masterTime: 11, value: 13, x: 11 },
          { masterTime: 12, value: 13, x: 12 },
          { masterTime: 13, value: 13, x: 13 },
          { masterTime: 14, value: 13, x: 14 },
          { masterTime: 15, value: 13, x: 15 },
          { masterTime: 16, value: 13, x: 16 },
          ] },
        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      });
    });
  });
  describe('removeViewDataByEp', () => {
    it('should support empty state', () => {
      const frozen = freezeMe({});
      expect(removeViewDataByEp(frozen, 10, 20)).toBe(frozen);
      const otherFrozen = freezeMe({ indexes: {} });
      expect(removeViewDataByEp(otherFrozen, 10, 20)).toBe(otherFrozen);
    });
    it('should support nothing to keep', () => {
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', -3, -1)).toEqual({ indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: {},
        maxTime: {},
      });
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 4, 6)).toEqual({ indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: {},
        maxTime: {},
      });
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 2, 1)).toEqual({ indexes: {},
        lines: {},
        min: {},
        max: {},
        minTime: {},
        maxTime: {},
      });
    });
    it('should support partial keeping', () => {
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 10, 12)).toEqual({
        indexes: { STAT_SU_PID: [10, 11, 12] },
        lines: {
          STAT_SU_PID: [
          { masterTime: 10, value: 13, x: 10 },
          { masterTime: 11, value: 13, x: 11 },
          { masterTime: 12, value: 13, x: 12 },
          ] },

        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      });
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 10, 11)
      .indexes.STAT_SU_PID).toEqual([10, 11]);
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 5, 12)
      .indexes.STAT_SU_PID).toEqual([10, 11, 12]);
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 11, 13)
      .indexes.STAT_SU_PID).toEqual([11, 12, 13]);
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 15, 25)
      .indexes.STAT_SU_PID).toEqual([15, 16]);
    });
    it('should support keep everything', () => {
      expect(removeViewDataByEp(freezeMe(viewDataState.plot), 'STAT_SU_PID', 10, 16)
      .indexes.STAT_SU_PID).toEqual([10, 11, 12, 13, 14, 15, 16]);
    });
  });
});
