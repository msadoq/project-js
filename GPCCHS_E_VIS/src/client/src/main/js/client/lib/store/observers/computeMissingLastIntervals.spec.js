// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Add unit test on missing interval computing
// END-HISTORY
// ====================================================================

/* eslint-disable camelcase */
import _cloneDeep from 'lodash/cloneDeep';
import state from 'common/jest/stateTest';
import dataMapGenerator from 'dataManager/map';
import computeMissingLastIntervals from './computeMissingLastIntervals';

describe('store/observers/computeMissingLastIntervals', () => {
  const dataId_CLCW_TM_NOMINAL = {
    catalog: 'TelemetryPacket',
    comObject: 'DecommutedPacket',
    domain: 'fr.cnes.isis.simupus',
    domainId: 4,
    parameterName: 'CLCW_TM_NOMINAL',
    sessionId: 0,
    sessionName: 'Master' };
  const dataId_TMMGT_BC_VIRTCHAN3 = { ...dataId_CLCW_TM_NOMINAL,
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    parameterName: 'TMMGT_BC_VIRTCHAN3' };
  const dataId_AGA_AM_PRIORITY = { ...dataId_TMMGT_BC_VIRTCHAN3,
    parameterName: 'AGA_AM_PRIORITY' };
  const offset = state.timelines.tlOffset.offset;

  test('no change for last entry points', () => {
    const lastMap = dataMapGenerator(state);
    const state1 = state;
    state1.PlotViewConfiguration.plot1.entryPoints.push({
      connectedData: {
        axisId: 'VBat',
        digits: 5,
        domain: 'fr.cnes.isis.simupus',
        fieldX: 'groundDate',
        filter: [{
          field: 'extractedValue',
          operand: 100,
          operator: '<',
        }],
        format: 'decimal',
        formula: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>.rawValue',
        timeline: 'Session 1',
        unit: 'V',
      },
      id: 'plot1ep3',
      name: 'TMMGT_BC_VIRTCHAN3',
      timeBasedData: true,
    });
    const newMap = dataMapGenerator(state1);
    expect(computeMissingLastIntervals(newMap, lastMap)).toEqual({});
  });
  test('New interval included in last one, new upper > last upper', () => {
    const state1 = _cloneDeep(state);
    state1.timebars.tb1.visuWindow.lower += 10;
    state1.timebars.tb1.visuWindow.upper += 10;
    state1.timebars.tb1.visuWindow.current += 10;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingLastIntervals(newMap, lastMap)).toEqual({
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:0:4': {
        dataId: dataId_CLCW_TM_NOMINAL,
        intervals:
          [[state.timebars.tb1.visuWindow.current, state1.timebars.tb1.visuWindow.current]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        intervals:
          [[state.timebars.tb1.visuWindow.current, state1.timebars.tb1.visuWindow.current]],
      },
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        dataId: dataId_AGA_AM_PRIORITY,
        intervals:
        [[state.timebars.tb1.visuWindow.current, state1.timebars.tb1.visuWindow.current],
          [state.timebars.tb1.visuWindow.current - offset,
            state1.timebars.tb1.visuWindow.current - offset]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'raw',
          operand: '100',
          operator: '>',
        }],
        intervals:
        [[state.timebars.tb1.visuWindow.current, state1.timebars.tb1.visuWindow.current]],
      },
    });
  });
  test('New interval included in last one, new upper < last upper', () => {
    const state1 = _cloneDeep(state);
    state1.timebars.tb1.visuWindow.lower -= 10;
    state1.timebars.tb1.visuWindow.upper -= 10;
    state1.timebars.tb1.visuWindow.current -= 10;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingLastIntervals(newMap, lastMap)).toEqual({
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:0:4': {
        dataId: dataId_CLCW_TM_NOMINAL,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current]],
      },
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        dataId: dataId_AGA_AM_PRIORITY,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current],
          [state1.timebars.tb1.visuWindow.lower - offset,
            state1.timebars.tb1.visuWindow.current - offset]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'raw',
          operand: '100',
          operator: '>',
        }],
        intervals:
        [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current]],
      },
    });
  });
  test('New interval before last one', () => {
    const state1 = _cloneDeep(state);
    state1.timebars.tb1.visuWindow.lower = 10000;
    state1.timebars.tb1.visuWindow.upper = 15000;
    state1.timebars.tb1.visuWindow.current = 14000;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingLastIntervals(newMap, lastMap)).toEqual({
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:0:4': {
        dataId: dataId_CLCW_TM_NOMINAL,
        intervals: [[10000, 14000]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        intervals: [[10000, 14000]],
      },
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        dataId: dataId_AGA_AM_PRIORITY,
        intervals: [[10000, 14000], [10000 - offset, 14000 - offset]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'raw',
          operand: '100',
          operator: '>',
        }],
        intervals: [[10000, 14000]],
      },
    });
  });
  test('New interval after last one', () => {
    const state1 = _cloneDeep(state);
    state1.timebars.tb1.visuWindow.lower = state.timebars.tb1.visuWindow.upper + 10;
    state1.timebars.tb1.visuWindow.upper = state1.timebars.tb1.visuWindow.lower + 10000;
    state1.timebars.tb1.visuWindow.current += state1.timebars.tb1.visuWindow.lower + 8000;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingLastIntervals(newMap, lastMap)).toEqual({
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:0:4': {
        dataId: dataId_CLCW_TM_NOMINAL,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current]],
      },
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        dataId: dataId_AGA_AM_PRIORITY,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current],
          [state1.timebars.tb1.visuWindow.lower - offset,
            state1.timebars.tb1.visuWindow.current - offset]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:raw.>.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'raw',
          operand: '100',
          operator: '>',
        }],
        intervals: [[state1.timebars.tb1.visuWindow.lower, state1.timebars.tb1.visuWindow.current]],
      },
    });
  });
});
