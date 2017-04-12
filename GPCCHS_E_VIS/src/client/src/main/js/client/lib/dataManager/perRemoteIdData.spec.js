import cloneDeep from 'lodash/cloneDeep';
import '../common/test';
import perRemoteIdMap, { addEpInRemoteIdMap } from './perRemoteIdData';

describe('dataManager/perRemoteIdData', () => {
  const epValid = {
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
    type: 'PlotView',
  };
  const epValid2 = cloneDeep(epValid);
  epValid2.dataId.parameterName = 'STAT_SU_NEW';
  epValid2.fieldY = 'rawValue';
  epValid2.localId = 'groundDate/rawValue.tb1:0/0';
  epValid2.remoteId = 'Reporting.STAT_SU_NEW<ReportingParameter>:181:4';

  const epValid3 = cloneDeep(epValid2);
  epValid3.fieldY = 'extractedValue';
  epValid3.localId = 'groundDate/extractedValue.tb1:0/0';
  epValid3.remoteId = 'Reporting.STAT_SU_NEW<ReportingParameter>:181:4';

  const epDecommuted = {
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
    localId: 'undefined.tb1:0/0',
    timebarUuid: 'tb1',
    remoteId: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
    type: 'DynamicView',
  };
  const epError = { error: 'invalid entryPoint' };
  const epTextValid = {
    id: 'id60',
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
    type: 'TextView',
  };
  it('addEpInRemoteIdMap: map empty, ep valid for plot', () => {
    addEpInRemoteIdMap({}, epValid, 'plot1').should.eql({
      [epValid.remoteId]: {
        dataId: epValid.dataId,
        filter: epValid.filter,
        localIds: {
          [epValid.localId]: {
            fieldX: epValid.fieldX,
            fieldY: epValid.fieldY,
            offset: epValid.offset,
            timebarUuid: epValid.timebarUuid,
            viewType: 'PlotView',
          },
        },
        views: ['plot1'],
      },
    });
  });
  it('addEpInRemoteIdMap: map empty, ep valid for text', () => {
    addEpInRemoteIdMap({}, epTextValid, 'text1').should.eql({
      [epTextValid.remoteId]: {
        dataId: epTextValid.dataId,
        filter: epTextValid.filter,
        localIds: {
          [epTextValid.localId]: {
            field: epTextValid.field,
            offset: epTextValid.offset,
            timebarUuid: epTextValid.timebarUuid,
            viewType: 'TextView',
          },
        },
        views: ['text1'],
      },
    });
  });

  it('addEpInRemoteIdMap: map empty, ep with error', () => {
    addEpInRemoteIdMap({}, epError, 'plot1').should.eql({});
  });
  it('addEpInRemoteIdMap: map not empty, other ep valid', () => {
    const map = addEpInRemoteIdMap({}, epValid, 'plot1');
    addEpInRemoteIdMap(map, epValid2, 'plot2').should.eql({
      [epValid.remoteId]: {
        dataId: epValid.dataId,
        filter: epValid.filter,
        localIds: {
          [epValid.localId]: {
            fieldX: epValid.fieldX,
            fieldY: epValid.fieldY,
            offset: epValid.offset,
            timebarUuid: epValid.timebarUuid,
            viewType: 'PlotView',
          },
        },
        views: ['plot1'],
      },
      [epValid2.remoteId]: {
        dataId: epValid2.dataId,
        filter: epValid2.filter,
        localIds: {
          [epValid2.localId]: {
            fieldX: epValid2.fieldX,
            fieldY: epValid2.fieldY,
            offset: epValid2.offset,
            timebarUuid: epValid2.timebarUuid,
            viewType: 'PlotView',
          },
        },
        views: ['plot2'],
      },
    });
  });
  it('addEpInRemoteIdMap: map not empty, other ep with error', () => {
    const map = addEpInRemoteIdMap({}, epValid, 'plot1');
    addEpInRemoteIdMap(map, epError, 'plot1').should.eql({
      [epValid.remoteId]: {
        dataId: epValid.dataId,
        filter: epValid.filter,
        localIds: {
          [epValid.localId]: {
            fieldX: epValid.fieldX,
            fieldY: epValid.fieldY,
            offset: epValid.offset,
            timebarUuid: epValid.timebarUuid,
            viewType: 'PlotView',
          },
        },
        views: ['plot1'],
      },
    });
  });
  it('addEpInRemoteIdMap: map empty, DecommutedPacket ep ', () => {
    addEpInRemoteIdMap({}, epDecommuted, 'dynamic1').should.eql({
      [epDecommuted.remoteId]: {
        dataId: epDecommuted.dataId,
        filter: epDecommuted.filter,
        localIds: {
          [epDecommuted.localId]: {
            offset: epDecommuted.offset,
            timebarUuid: epDecommuted.timebarUuid,
            viewType: 'DynamicView',
          },
        },
        views: ['dynamic1'],
      },
    });
  });
  it('addEpInRemoteIdMap: map not empty, ep with same remoteId', () => {
    const map = addEpInRemoteIdMap({}, epValid2, 'plot1');
    addEpInRemoteIdMap(map, epValid3, 'plot2').should.eql({
      [epValid2.remoteId]: {
        dataId: epValid2.dataId,
        filter: epValid2.filter,
        localIds: {
          [epValid2.localId]: {
            fieldX: epValid2.fieldX,
            fieldY: epValid2.fieldY,
            offset: epValid2.offset,
            timebarUuid: epValid2.timebarUuid,
            viewType: 'PlotView',
          },
          [epValid3.localId]: {
            fieldX: epValid3.fieldX,
            fieldY: epValid3.fieldY,
            offset: epValid3.offset,
            timebarUuid: epValid3.timebarUuid,
            viewType: 'PlotView',
          },
        },
        views: ['plot1', 'plot2'],
      },
    });
  });
  it('perRemoteIdMap', () => {
    const perViewMap = {
      text: {
        type: 'TextView',
        masterSessionId: 10,
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
            type: 'TextView',
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
            type: 'TextView',
          },
          STAT_UNKNOW_DOMAIN: { error: 'invalid entry point, no domain matches' },
        },
      },
      plot: {
        type: 'PlotView',
        masterSessionId: 10,
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
            type: 'PlotView',
          },
          STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
        },
      },
    };
    perRemoteIdMap(perViewMap).should.eql({
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        filter: [],
        localIds: {
          'extractedValue.tb1:0': {
            field: 'extractedValue',
            offset: 0,
            timebarUuid: 'tb1',
            viewType: 'TextView',
          },
          'groundDate/extractedValue.tb1:0/0': {
            fieldX: 'groundDate',
            fieldY: 'extractedValue',
            offset: 0,
            timebarUuid: 'tb1',
            viewType: 'PlotView',
          },
        },
        views: ['text', 'plot'],
      },
      'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_WILDCARD_TIMELINE',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 10,
        },
        filter: [],
        localIds: {
          'extractedValue.tb1:0': {
            field: 'extractedValue',
            offset: 0,
            timebarUuid: 'tb1',
            viewType: 'TextView',
          },
        },
        views: ['text'],
      },
    });
  });
});
