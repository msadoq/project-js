import { DATASTRUCTURETYPE_LAST, DATASTRUCTURETYPE_RANGE } from '../constants';
import displayQueries from './displayQueries';

describe('dataManager/displayQueries', () => {
  const remoteIdMap = {
    'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
      dataId: {
        catalog: 'TelemetryPacket',
        parameterName: 'CLCW_TM_NOMINAL',
        comObject: 'DecommutedPacket',
        domainId: 4,
        sessionId: 181,
      },
      filter: [],
      views: ['dynamic1'],
      localIds: {
        'undefined.tb1:0': {
          timebarUuid: 'tb1',
          offset: 0,
          viewType: 'DynamicView',
        },
      },
    },
    'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
      dataId: {
        catalog: 'Reporting',
        parameterName: 'STAT_SU_PID',
        comObject: 'ReportingParameter',
        domainId: 4,
        sessionId: 181,
      },
      filter: [],
      views: ['plot1', 'text1'],
      localIds: {
        'groundDate/extractedValue.tb1:0/0': {
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          timebarUuid: 'tb1',
          offset: 0,
          viewType: 'PlotView',
        },
        'extractedValue.tb1:0': {
          field: 'extractedValue',
          timebarUuid: 'tb1',
          offset: 0,
          viewType: 'TextView',
        },
      },
    },
  };

  const intervalMap = {
    'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
      'extractedValue.tb1:0': {
        expectedInterval: [1420106790818, 1420106843902],
      },
      'groundDate/extractedValue.tb1:0/0': {
        expectedInterval: [1420106790818, 1420107056239],
      },
    },
    'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
      'undefined.tb1:0': {
        expectedInterval: [1420106790818, 1420106843902],
      },
    },
  };
  const newIntervalMap = {
    'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
      'extractedValue.tb1:0': {
        expectedInterval: [1420106791818, 1420106844902],
      },
      'groundDate/extractedValue.tb1:0/0': {
        expectedInterval: [1420106791818, 1420107057239],
      },
    },
    'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
      'undefined.tb1:0': {
        expectedInterval: [1420106791818, 1420106844902],
      },
    },
  };
  const dataMap = { injectionRemoteId: remoteIdMap, injectionIntervals: intervalMap };
  const newDataMap = { perRemoteId: remoteIdMap, expectedIntervals: newIntervalMap };

  it('empty new dataMap', () => {
    expect(displayQueries(dataMap, { perRemoteId: {}, expectedIntervals: {} }, false)).toEqual({});
  });
  it('empty old dataMap', () => {
    expect(
      displayQueries({ injectionRemoteId: {}, injectionIntervals: {} }, newDataMap, false)
    ).toEqual({
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        [DATASTRUCTURETYPE_LAST]: [],
        [DATASTRUCTURETYPE_RANGE]: [[1420106791818, 1420107057239]],
      },
    });
  });
  it('play mode', () => {
    expect(displayQueries(dataMap, newDataMap, true)).toEqual({
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        [DATASTRUCTURETYPE_LAST]: [[1420106843902, 1420106844902]],
        [DATASTRUCTURETYPE_RANGE]: [[1420107056239, 1420107057239]],
      },
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
        [DATASTRUCTURETYPE_LAST]: [[1420106843902, 1420106844902]],
        [DATASTRUCTURETYPE_RANGE]: [],
      },
    });
  });
  it('pause mode', () => {
    expect(displayQueries(dataMap, newDataMap, false)).toEqual({
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        [DATASTRUCTURETYPE_LAST]: [],
        [DATASTRUCTURETYPE_RANGE]: [[1420107056239, 1420107057239]],
      },
    });
  });
});
