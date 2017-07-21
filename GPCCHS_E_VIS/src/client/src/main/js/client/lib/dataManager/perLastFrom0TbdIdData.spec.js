import cloneDeep from 'lodash/cloneDeep';
import perLastFrom0TbdIdMap, { addEpInLastFrom0TbdIdMap } from './perLastFrom0TbdIdData';

describe('dataManager/perLastFrom0TbdIdData', () => {
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
    filters: [],
    localId: 'groundDate/extractedValue.tb1:0/0',
    timebarUuid: 'tb1',
    tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
    type: 'PlotView',
  };
  const epValid2 = cloneDeep(epValid);
  epValid2.dataId.parameterName = 'STAT_SU_NEW';
  epValid2.fieldY = 'rawValue';
  epValid2.localId = 'groundDate/rawValue.tb1:0/0';
  epValid2.tbdId = 'Reporting.STAT_SU_NEW<ReportingParameter>:181:4';

  const epError = { error: 'invalid entryPoint' };
  const epMimicValid = {
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
    filters: [],
    localId: 'extractedValue.tb1:0',
    timebarUuid: 'tb1',
    tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
    type: 'MimicView',
  };
  const epMimicValid2 = cloneDeep(epMimicValid);
  epMimicValid2.filters.push({ field: 'raw', operator: '=', operand: '12' });
  epMimicValid2.tbdId = 'Reporting.STAT_SU_PID<ReportingParameter>:181:4:raw.=.12';

  const epMimicValid3 = cloneDeep(epMimicValid);
  epMimicValid3.field = 'rawValue';
  epMimicValid3.localId = 'rawValue.tb1:0';


  test('addEpInLastFrom0TbdIdMap: map empty, ep valid for mimic', () => {
    expect(addEpInLastFrom0TbdIdMap({}, epMimicValid, 'mimic1')).toEqual({
      [epMimicValid.tbdId]: {
        dataId: epMimicValid.dataId,
        filters: [],
        localIds: {
          [epMimicValid.localId]: {
            field: epMimicValid.field,
            offset: epMimicValid.offset,
            timebarUuid: epMimicValid.timebarUuid,
            viewType: 'MimicView',
          },
        },
        views: ['mimic1'],
      },
    });
  });
  test('addEpInLastFrom0TbdIdMap: map empty, ep valid for text with filters', () => {
    expect(addEpInLastFrom0TbdIdMap({}, epMimicValid2, 'mimic1')).toEqual({
      [epMimicValid2.tbdId]: {
        dataId: epMimicValid2.dataId,
        filters: epMimicValid2.filters,
        localIds: {
          [epMimicValid2.localId]: {
            field: epMimicValid2.field,
            offset: epMimicValid2.offset,
            timebarUuid: epMimicValid2.timebarUuid,
            viewType: 'MimicView',
          },
        },
        views: ['mimic1'],
      },
    });
  });
  test('addEpInLastTbdIdMap: map empty, ep with error', () => {
    expect(addEpInLastFrom0TbdIdMap({}, epError, 'mimic1')).toEqual({});
  });
  test('addEpInLastTbdIdMap: map not empty, other ep valid', () => {
    const map = addEpInLastFrom0TbdIdMap({}, epMimicValid, 'mimic1');
    expect(addEpInLastFrom0TbdIdMap(map, epMimicValid2, 'mimic2')).toEqual({
      [epMimicValid.tbdId]: {
        dataId: epMimicValid.dataId,
        filters: [],
        localIds: {
          [epMimicValid.localId]: {
            field: epMimicValid.field,
            offset: epMimicValid.offset,
            timebarUuid: epMimicValid.timebarUuid,
            viewType: 'MimicView',
          },
        },
        views: ['mimic1'],
      },
      [epMimicValid2.tbdId]: {
        dataId: epMimicValid2.dataId,
        filters: epMimicValid2.filters,
        localIds: {
          [epMimicValid2.localId]: {
            field: epMimicValid2.field,
            offset: epMimicValid2.offset,
            timebarUuid: epMimicValid2.timebarUuid,
            viewType: 'MimicView',
          },
        },
        views: ['mimic2'],
      },
    });
  });
  test('addEpInLastFrom0TbdIdMap: map not empty, ep with same remoteId', () => {
    const map = addEpInLastFrom0TbdIdMap({}, epMimicValid, 'mimic1');
    expect(addEpInLastFrom0TbdIdMap(map, epMimicValid3, 'mimic2')).toEqual({
      [epMimicValid.tbdId]: {
        dataId: epMimicValid.dataId,
        filters: [],
        localIds: {
          [epMimicValid.localId]: {
            field: epMimicValid.field,
            offset: epMimicValid.offset,
            timebarUuid: epMimicValid.timebarUuid,
            viewType: 'MimicView',
          },
          [epMimicValid3.localId]: {
            field: epMimicValid3.field,
            offset: epMimicValid3.offset,
            timebarUuid: epMimicValid3.timebarUuid,
            viewType: 'MimicView',
          },
        },
        views: ['mimic1', 'mimic2'],
      },
    });
  });
  test('perLastFrom0TbdIdMap', () => {
    const perViewMap = {
      mimic: {
        type: 'MimicView',
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
            filters: [],
            localId: 'extractedValue.tb1:0',
            timebarUuid: 'tb1',
            tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
            type: 'MimicView',
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
            filters: [],
            localId: 'extractedValue.tb1:0',
            timebarUuid: 'tb1',
            tbdId: 'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4',
            type: 'MimicView',
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
            filters: [],
            localId: 'groundDate/extractedValue.tb1:0/0',
            timebarUuid: 'tb1',
            tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
            type: 'PlotView',
          },
          STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
        },
      },
      dynamic: {
        type: 'DynamicView',
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
            offset: 0,
            filters: [],
            localId: 'undefined.tb1:0',
            timebarUuid: 'tb1',
            tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
            type: 'DynamicView',
          },
        },
      },
    };
    expect(perLastFrom0TbdIdMap(perViewMap)).toEqual({
      'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_SU_PID',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 181,
        },
        filters: [],
        localIds: {
          'extractedValue.tb1:0': {
            field: 'extractedValue',
            offset: 0,
            timebarUuid: 'tb1',
            viewType: 'MimicView',
          },
        },
        views: ['mimic'],
      },
      'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        dataId: {
          catalog: 'Reporting',
          parameterName: 'STAT_WILDCARD_TIMELINE',
          comObject: 'ReportingParameter',
          domainId: 4,
          sessionId: 10,
        },
        filters: [],
        localIds: {
          'extractedValue.tb1:0': {
            field: 'extractedValue',
            offset: 0,
            timebarUuid: 'tb1',
            viewType: 'MimicView',
          },
        },
        views: ['mimic'],
      },
    });
  });
});
