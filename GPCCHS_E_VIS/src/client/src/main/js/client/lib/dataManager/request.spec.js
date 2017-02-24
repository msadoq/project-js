import _cloneDeep from 'lodash/cloneDeep';
import '../common/test';
import { missingRemoteIds } from './request';


const remoteIdMap = {
  'last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
    structureType: 'last',
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
  'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    structureType: 'range',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181,
    },
    filter: [],
    views: ['plot1'],
    localIds: {
      'groundDate/extractedValue.tb1:0/0': {
        fieldX: 'groundDate',
        fieldY: 'extractedValue',
        timebarUuid: 'tb1',
        offset: 0,
        viewType: 'PlotView',
      },
    },
  },
  'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181,
    },
    filter: [],
    views: ['text1'],
    localIds: {
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
  'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    'extractedValue.tb1:0': {
      expectedInterval: [1420106790818, 1420106843902],
    },
  },
  'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    'groundDate/extractedValue.tb1:0/0': {
      expectedInterval: [1420106790818, 1420107056239],
    },
  },
  'last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
    'undefined.tb1:0': {
      expectedInterval: [1420106790818, 1420106843902],
    },
  },
};

const dataMap = { perRemoteId: remoteIdMap, expectedIntervals: intervalMap };
const newMap = _cloneDeep(dataMap);
newMap.expectedIntervals['last@Reporting.STAT_SU_PID<ReportingParameter>:181:4']['extractedValue.tb1:0'].expectedInterval
= [1420106800818, 1420106853902];

describe('data:request', () => {
  it('missingRemoteIds from empty dataMap', () => {
    const queries = missingRemoteIds(dataMap, { perRemoteId: {}, expectedIntervals: {} });
    queries.should.eql({
      'last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
        type: 'last',
        dataId: {
          catalog: 'TelemetryPacket',
          parameterName: 'CLCW_TM_NOMINAL',
          comObject: 'DecommutedPacket',
          domainId: 4,
          sessionId: 181,
        },
        intervals: [[1420106790818, 1420106843902]],
        filters: [],
      },
      'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        type: 'range',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        filters: [],
        intervals: [[1420106790818, 1420107056239]],
      },
      'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        type: 'last',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        filters: [],
        intervals: [[1420106790818, 1420106843902]],
      },
    });
  });
  it('missingRemoteIds from empty dataMap', () => {
    const queries = missingRemoteIds(newMap, dataMap);
    queries.should.eql({
      'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        type: 'last',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        filters: [],
        intervals: [[1420106800818, 1420106853902]],
      },
    });
  });
});
