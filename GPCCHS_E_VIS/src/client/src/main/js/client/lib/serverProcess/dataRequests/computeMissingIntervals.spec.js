import _cloneDeep from 'lodash/cloneDeep';
import { computeMissingIntervals } from './computeMissingIntervals';

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

const forecastIntervals = {
  'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    'extractedValue.tb1:0': {
      expectedInterval: [1420106800818, 1420106853902],
    },
    'groundDate/extractedValue.tb1:0/0': {
      expectedInterval: [1420106800818, 1420107066239],
    },
  },
  'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
    'undefined.tb1:0': {
      expectedInterval: [1420106800818, 1420106853902],
    },
  },
};

const dataMap = { perRemoteId: remoteIdMap, expectedIntervals: intervalMap };
const newMap = _cloneDeep(dataMap);
newMap.expectedIntervals['Reporting.STAT_SU_PID<ReportingParameter>:181:4']['extractedValue.tb1:0'].expectedInterval
= [1420106800818, 1420106853902];

describe('data:request', () => {
  test('computeMissingIntervals from empty dataMap', () => {
    const queries = computeMissingIntervals(dataMap, { perRemoteId: {}, expectedIntervals: {} });
    expect(queries).toEqual({
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
        dataId: {
          catalog: 'TelemetryPacket',
          parameterName: 'CLCW_TM_NOMINAL',
          comObject: 'DecommutedPacket',
          domainId: 4,
          sessionId: 181,
        },
        last: [[1420106790818, 1420106843902]],
        range: [],
      },
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        last: [[1420106790818, 1420106843902]],
        range: [[1420106790818, 1420107056239]],
      },
    });
  });
  test('computeMissingIntervals from dataMap', () => {
    const queries = computeMissingIntervals(newMap, dataMap);
    expect(queries).toEqual({
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        last: [[1420106843902, 1420106853902]],
        range: [],
      },
    });
  });
  test('forecast', () => {
    const queries = computeMissingIntervals(newMap, dataMap, forecastIntervals);
    expect(queries).toEqual({
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
        dataId: {
          catalog: 'TelemetryPacket',
          parameterName: 'CLCW_TM_NOMINAL',
          comObject: 'DecommutedPacket',
          domainId: 4,
          sessionId: 181,
        },
        last: [],
        range: [[1420106800818, 1420106853902]],
      },
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        last: [],
        range: [[1420106800818, 1420107066239]],
      },
    });
  });
});
