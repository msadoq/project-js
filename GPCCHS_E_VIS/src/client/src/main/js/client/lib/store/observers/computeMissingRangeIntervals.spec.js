/* eslint-disable camelcase */
import _cloneDeep from 'lodash/cloneDeep';
import computeMissingRangeIntervals from './computeMissingRangeIntervals';
import state from '../../common/jest/stateTest';
import dataMapGenerator from '../../dataManager/map';


describe('store/observers/computeMissingRangeIntervals', () => {
  const dataId_TMMGT_BC_VIRTCHAN3 = {
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    parameterName: 'TMMGT_BC_VIRTCHAN3',
    domain: 'fr.cnes.isis.simupus',
    domainId: 4,
    sessionId: 0,
    sessionName: 'Master' };
  const dataId_ATT_BC_REVTCOUNT1 = {
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    domain: 'fr.cnes.isis',
    domainId: 1,
    sessionId: 0,
    sessionName: 'Master',
    parameterName: 'ATT_BC_REVTCOUNT1' };
  const offset = state.timelines.tlOffset.offset;

  test('no change for range entry points', () => {
    const lastMap = dataMapGenerator(state);
    const state1 = state;
    state1.TextViewConfiguration.text1.entryPoints.push({
      connectedData: {
        digits: 5,
        domain: 'fr.cnes.isis.simupus',
        filter: [],
        format: 'decimal',
        formula: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>.rawValue',
        timeline: 'Session 1',
        unit: 'V',
      },
      id: 'text1ep11',
      name: 'AGA_AM_RAW',
    });
    const newMap = dataMapGenerator(state1);
    expect(computeMissingRangeIntervals(newMap, lastMap)).toEqual({});
  });
  test('New interval included in last one, new upper > last upper', () => {
    const state1 = _cloneDeep(state);
    state1.timebars.tb1.visuWindow.lower += 10;
    state1.timebars.tb1.visuWindow.upper += 10;
    state1.timebars.tb1.visuWindow.current += 10;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingRangeIntervals(newMap, lastMap)).toEqual({
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'extractedValue',
          operand: '100',
          operator: '<',
        }],
        intervals:
          [[state.timebars.tb1.visuWindow.upper, state1.timebars.tb1.visuWindow.upper]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:rawValue.>.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'rawValue',
          operand: '100',
          operator: '>',
        }],
        intervals:
          [[state.timebars.tb1.visuWindow.upper, state1.timebars.tb1.visuWindow.upper]],
      },
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': {
        dataId: dataId_ATT_BC_REVTCOUNT1,
        intervals:
        [[state.timebars.tb1.visuWindow.upper - offset,
          state1.timebars.tb1.visuWindow.upper - offset],
        [state.timebars.tb1.visuWindow.upper, state1.timebars.tb1.visuWindow.upper]],
      },
    });
  });
  test('New interval included in last one, new upper < last upper', () => {
    const state1 = _cloneDeep(state);
    state1.timebars.tb1.visuWindow.lower -= 10000;
    state1.timebars.tb1.visuWindow.upper -= 10000;
    state1.timebars.tb1.visuWindow.current -= 10000;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingRangeIntervals(newMap, lastMap)).toEqual({
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:extractedValue.<.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'extractedValue',
          operand: '100',
          operator: '<',
        }],
        intervals:
          [[state1.timebars.tb1.visuWindow.lower, state.timebars.tb1.visuWindow.lower]],
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:rawValue.>.100': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'rawValue',
          operand: '100',
          operator: '>',
        }],
        intervals:
          [[state1.timebars.tb1.visuWindow.lower, state.timebars.tb1.visuWindow.lower]],
      },
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': {
        dataId: dataId_ATT_BC_REVTCOUNT1,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower - offset,
          state.timebars.tb1.visuWindow.lower]],
      },
    });
  });
});
