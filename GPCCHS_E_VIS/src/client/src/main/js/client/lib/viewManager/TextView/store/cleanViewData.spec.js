// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js
//  in jest/index.js
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 2.0.0 : FA : ISIS-FT-1992 : 31/10/2017 : Fix broken TUs . .
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Skip / fix unit tests
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _cloneDeep from 'lodash/cloneDeep';
import { freezeMe } from 'common/jest';
import cleanCurrentViewData from './cleanViewData';

describe.skip('viewManager/TextView/store/cleanViewData', () => {
  let viewDataState;
  let viewMap;
  let oldIntervals;
  beforeEach(() => {
    viewMap = {
      text: {
        type: 'TextView',
        entryPoints: {
          STAT_SU_PID: {
            id: 'id1',
            dataId: {
              catalog: 'Reporting',
              parameterName: 'STAT_SU_PID',
              comObject: 'ReportingParameter',
              domainId: 4,
              sessionId: 181,
            },
            field: 'extractedValue',
            offset: 0,
            filter: [],
            localId: 'extractedValue.tb1:0',
            timebarUuid: 'tb1',
            remoteId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
          },
          STAT_WILDCARD_TIMELINE: {
            id: 'id46',
            dataId: {
              catalog: 'Reporting',
              parameterName: 'STAT_WILDCARD_TIMELINE',
              comObject: 'ReportingParameter',
              domainId: 4,
              sessionId: 10,
            },
            field: 'extractedValue',
            offset: 0,
            filter: [],
            localId: 'extractedValue.tb1:0',
            timebarUuid: 'tb1',
            remoteId: 'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4',
          },
          STAT_UNKNOW_DOMAIN: {
            error: 'invalid entry point, no domain matches',
          },
        },
      },
      plot: {
        type: 'PlotView',
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
            remoteId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
            stateColors: [{
              color: '#000000',
              condition: {
                field: 'monitoringState',
                operator: '=',
                operand: 'waiting',
              },
            }],
          },
          STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
        },
      },
      dynamic1: {
        type: 'DynamicView',
        entryPoints: {
          dynamicEP: {
            id: 'id70',
            dataId: {
              catalog: 'TelemetryPacket',
              parameterName: 'CLCW_TM_NOMINAL',
              comObject: 'DecommutedPacket',
              domainId: 4,
              sessionId: 181,
            },
            field: undefined,
            offset: 0,
            filter: [],
            localId: 'undefined.tb1:0',
            timebarUuid: 'tb1',
            remoteId: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
            type: 'DynamicView',
            stateColors: [{
              color: '#000000',
              condition: {
                field: 'monitoringState',
                operator: '=',
                operand: 'waiting',
              },
            }],
          },
        },
      },
    };
    viewDataState = {
      text: {
        index: {
          STAT_SU_PID: 14,
          STAT_WILDCARD_TIMELINE: 13,
        },
        values: {
          STAT_SU_PID: { value: 14, monit: 'info' },
          STAT_WILDCARD_TIMELINE: { value: 13, monit: 'info' },
        },
      },
    };
    oldIntervals = {
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'extractedValue.tb1:0': { expectedInterval: [10, 15] },
        'groundDate/extractedValue.tb1:0/0': { expectedInterval: [10, 20] },
      },
      'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'extractedValue.tb1:0': { expectedInterval: [10, 15] },
      },
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
        'undefined.tb1:0': { expectedInterval: [10, 15] },
      },
    };
  });
  test('no update', () => {
    const frozen = freezeMe(viewDataState.text);
    expect(
      cleanCurrentViewData(frozen, viewMap.text, viewMap.text, oldIntervals, oldIntervals)
    ).toBe(frozen);
  });
  test('interval update text: keep', () => {
    const newMap = _cloneDeep(viewMap);
    const newIntervals = _cloneDeep(oldIntervals);
    newIntervals['Reporting.STAT_SU_PID<ReportingParameter>:181:4']['extractedValue.tb1:0'].expectedInterval
      = [12, 17];
    const frozen = freezeMe(viewDataState.text);
    expect(
      cleanCurrentViewData(frozen, viewMap.text, newMap.text, oldIntervals, newIntervals)
    ).toBe(frozen);
  });
  test('interval update text: remove', () => {
    const newMap = _cloneDeep(viewMap);
    const newIntervals = _cloneDeep(oldIntervals);
    newIntervals['Reporting.STAT_SU_PID<ReportingParameter>:181:4']['extractedValue.tb1:0'].expectedInterval
      = [3, 8];
    const frozen = freezeMe(viewDataState.text);
    expect(
      cleanCurrentViewData(frozen, viewMap.text, newMap.text, oldIntervals, newIntervals)
    ).toEqual({
      index: {
        STAT_WILDCARD_TIMELINE: 13,
      },
      values: {
        STAT_WILDCARD_TIMELINE: { value: 13, monit: 'info' },
      },
    });
  });
  test('interval error text: remove', () => {
    const newMap = _cloneDeep(viewMap);
    const frozen = freezeMe(viewDataState.text);
    expect(
      cleanCurrentViewData(frozen, viewMap.text, newMap.text, oldIntervals, undefined)
    ).toEqual({ index: {}, values: {} });
  });
});
