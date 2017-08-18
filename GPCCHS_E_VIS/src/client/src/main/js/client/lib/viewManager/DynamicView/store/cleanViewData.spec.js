import _cloneDeep from 'lodash/cloneDeep';
import cleanCurrentViewData from './cleanViewData';
import { freezeMe } from '../../../common/jest';

describe('viewManager/DynamicView/store/cleanViewData', () => {
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
      dynamic: {
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
            tbdId: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
            type: 'DynamicView',
            stateColors: [{
              color: '#000000',
              condition: {
                field: 'monitoringState',
                operator: '==',
                operand: 'waiting',
              },
            }],
          },
        },
      },
    };
    viewDataState = {
      dynamic: {
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
    const frozen = freezeMe(viewDataState.dynamic);
    expect(
      cleanCurrentViewData(frozen, viewMap.dynamic, viewMap.dynamic, oldIntervals, oldIntervals)
    ).toBe(frozen);
  });
  test('interval update dynamic: keep', () => {
    const newMap = _cloneDeep(viewMap);
    const newIntervals = _cloneDeep(oldIntervals);
    newIntervals['TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4']['undefined.tb1:0'].expectedInterval
      = [12, 17];
    const frozen = freezeMe(viewDataState.dynamic);
    expect(
      cleanCurrentViewData(frozen, viewMap.dynamic, newMap.dynamic, oldIntervals, newIntervals)
    ).toBe(frozen);
  });
  test('interval update dynamic: remove', () => {
    const newMap = _cloneDeep(viewMap);
    const newIntervals = _cloneDeep(oldIntervals);
    newIntervals['TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4']['undefined.tb1:0'].expectedInterval
      = [3, 8];
    const frozen = freezeMe(viewDataState.dynamic);
    expect(
      cleanCurrentViewData(frozen, viewMap.dynamic, newMap.dynamic, oldIntervals, newIntervals)
    ).toEqual({});
  });
  test('interval error dynamic: remove', () => {
    const newMap = _cloneDeep(viewMap);
    const frozen = freezeMe(viewDataState.dynamic);
    expect(
      cleanCurrentViewData(frozen, viewMap.dynamic, newMap.dynamic, oldIntervals, undefined)
    ).toEqual({ index: {}, value: {} });
  });
});
