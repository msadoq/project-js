// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Add unit test on missing interval computing
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : comportement multisat VIMA . .
// END-HISTORY
// ====================================================================

/* eslint-disable camelcase */
import _cloneDeep from 'lodash/cloneDeep';
import state from 'common/jest/stateTest';
import dataMapGenerator from 'dataManager/map';
import computeMissingRangeIntervals from './computeMissingRangeIntervals';

describe('store/observers/computeMissingRangeIntervals', () => {
  const dataId_TMMGT_BC_VIRTCHAN3 = {
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    domain: 'fr.cnes.isis.simupus',
    domainId: 4,
    sessionId: 0,
    sessionName: 'Master',
    parameterName: 'TMMGT_BC_VIRTCHAN3',
    provider: '',
  };
  const dataId_ATT_BC_REVTCOUNT1 = {
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    domain: 'fr.cnes.isis.simupus',
    domainId: 4,
    sessionId: 0,
    sessionName: 'Master',
    parameterName: 'ATT_BC_REVTCOUNT1',
    provider: '',
  };
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
    state1.timebars.tb1.visuWindow.currentLines += 10;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingRangeIntervals(newMap, lastMap)).toEqual({
      '.<GroundMonitoringAlarmAckRequest>:0:4:::': {
        dataId: {
          catalog: '',
          comObject: 'GroundMonitoringAlarmAckRequest',
          domain: 'fr.cnes.isis.simupus',
          domainId: 4,
          parameterName: '',
          provider: undefined,
          sessionId: 0,
          sessionName: 'Master',
        },
        intervals:
          [[state.timebars.tb1.visuWindow.upper, state1.timebars.tb1.visuWindow.upper]],
        sampling: 'off',
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4::extractedValue.<.100:': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'extractedValue',
          operand: '100',
          operator: '<',
        }],
        intervals:
          [[state.timebars.tb1.visuWindow.upper, state1.timebars.tb1.visuWindow.upper]],
        sampling: 'off',
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4::rawValue.>.100:': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'rawValue',
          operand: '100',
          operator: '>',
        }],
        intervals:
          [[state.timebars.tb1.visuWindow.upper, state1.timebars.tb1.visuWindow.upper]],
        sampling: 'off',
      },
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4:::': {
        dataId: dataId_ATT_BC_REVTCOUNT1,
        intervals: [
          [
            state.timebars.tb1.visuWindow.upper - offset,
            state1.timebars.tb1.visuWindow.upper - offset,
          ],
          [state.timebars.tb1.visuWindow.upper, state1.timebars.tb1.visuWindow.upper],
        ],
        sampling: 'off',
      },
    });
  });
  test('New interval included in last one, new upper < last upper', () => {
    const state1 = _cloneDeep(state);
    state1.timebars.tb1.visuWindow.lower -= 10000;
    state1.timebars.tb1.visuWindow.upper -= 10000;
    state1.timebars.tb1.visuWindow.currentLines -= 10000;
    const lastMap = dataMapGenerator(state);
    const newMap = dataMapGenerator(state1);
    expect(computeMissingRangeIntervals(newMap, lastMap)).toEqual({
      '.<GroundMonitoringAlarmAckRequest>:0:4:::': {
        dataId: {
          catalog: '',
          comObject: 'GroundMonitoringAlarmAckRequest',
          domain: 'fr.cnes.isis.simupus',
          domainId: 4,
          parameterName: '',
          provider: undefined,
          sessionId: 0,
          sessionName: 'Master',
        },
        intervals:
          [[state1.timebars.tb1.visuWindow.lower, state.timebars.tb1.visuWindow.lower]],
        sampling: 'off',
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4::extractedValue.<.100:': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'extractedValue',
          operand: '100',
          operator: '<',
        }],
        intervals:
          [[state1.timebars.tb1.visuWindow.lower, state.timebars.tb1.visuWindow.lower]],
        sampling: 'off',
      },
      'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4::rawValue.>.100:': {
        dataId: dataId_TMMGT_BC_VIRTCHAN3,
        filters: [{
          field: 'rawValue',
          operand: '100',
          operator: '>',
        }],
        intervals:
          [[state1.timebars.tb1.visuWindow.lower, state.timebars.tb1.visuWindow.lower]],
        sampling: 'off',
      },
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4:::': {
        dataId: dataId_ATT_BC_REVTCOUNT1,
        intervals:
        [[state1.timebars.tb1.visuWindow.lower - offset,
          state.timebars.tb1.visuWindow.lower]],
        sampling: 'off',
      },
    });
  });
});
