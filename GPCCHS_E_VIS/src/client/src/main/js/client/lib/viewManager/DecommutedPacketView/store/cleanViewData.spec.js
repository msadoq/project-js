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
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 2.0.0 : FA : ISIS-FT-1992 : 31/10/2017 : Fix broken TUs . .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _cloneDeep from 'lodash/cloneDeep';
import { freezeMe } from 'common/jest';
import cleanCurrentViewData from './cleanViewData';

describe('viewManager/DecommutedPacketView/store/cleanViewData', () => {
  let viewDataState;
  let viewMap;
  let oldIntervals;
  // let newIntervals;
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
            tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
          },
        },
      },
      decommutedPacket: {
        type: 'DecommutedPacketView',
        entryPoints: {
          decommutedPacketEP: {
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
            tbdId: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
            type: 'DecommutedPacketView',
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
      decommutedPacket: {
        index: 14,
        value: { val1: 1, val2: 2 },
      },
    };
    oldIntervals = {
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'extractedValue.tb1:0': { expectedInterval: [10, 15] },
      },
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
        'undefined.tb1:0': { expectedInterval: [10, 15] },
      },
    };
  });
  test('no update', () => {
    const frozen = freezeMe(viewDataState.decommutedPacket);
    expect(
      cleanCurrentViewData(frozen, viewMap.decommutedPacket, viewMap.decommutedPacket, oldIntervals, oldIntervals)
    ).toBe(frozen);
  });
  test('interval update decommutedPacket: keep', () => {
    const newMap = _cloneDeep(viewMap);
    const newIntervals = _cloneDeep(oldIntervals);
    newIntervals['TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4']['undefined.tb1:0'].expectedInterval
      = [12, 17];
    const frozen = freezeMe(viewDataState.decommutedPacket);
    expect(
      cleanCurrentViewData(frozen, viewMap.decommutedPacket, newMap.decommutedPacket, oldIntervals, newIntervals)
    ).toBe(frozen);
  });
  test('interval update decommutedPacket: remove', () => {
    const newMap = _cloneDeep(viewMap);
    const newIntervals = _cloneDeep(oldIntervals);
    newIntervals['TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4']['undefined.tb1:0'].expectedInterval
      = [3, 8];
    const frozen = freezeMe(viewDataState.decommutedPacket);
    expect(
      cleanCurrentViewData(frozen, viewMap.decommutedPacket, newMap.decommutedPacket, oldIntervals, newIntervals)
    ).toEqual({});
  });
  test('interval error decommutedPacket: remove', () => {
    const newMap = _cloneDeep(viewMap);
    const frozen = freezeMe(viewDataState.decommutedPacket);
    expect(
      cleanCurrentViewData(frozen, viewMap.decommutedPacket, newMap.decommutedPacket, oldIntervals, undefined)
    ).toEqual({ index: {}, value: {} });
  });
});
