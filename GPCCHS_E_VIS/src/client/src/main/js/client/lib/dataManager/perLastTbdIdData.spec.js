// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action viewData_clean
// END-HISTORY
// ====================================================================

import cloneDeep from 'lodash/cloneDeep';
import perLastTbdIdMap, { addEpInLastTbdIdMap } from './perLastTbdIdData';
import dataMapGenerator from './map';
import state from '../common/jest/stateTest';

describe('dataManager/perLastTbdIdData', () => {
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
    localId: 'undefined.tb1:0/0',
    timebarUuid: 'tb1',
    tbdId: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
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
    filters: [],
    localId: 'extractedValue.tb1:0',
    timebarUuid: 'tb1',
    tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
    type: 'TextView',
  };
  const epTextValid2 = cloneDeep(epTextValid);
  epTextValid2.filters.push({ field: 'raw', operator: '=', operand: '12' });
  epTextValid2.tbdId = 'Reporting.STAT_SU_PID<ReportingParameter>:181:4:raw.=.12';

  const epTextValid3 = cloneDeep(epTextValid);
  epTextValid3.field = 'rawValue';
  epTextValid3.localId = 'rawValue.tb1:0';


  test('addEpInLastTbdIdMap: map empty, ep valid for text', () => {
    expect(addEpInLastTbdIdMap({}, epTextValid, 'text1')).toEqual({
      [epTextValid.tbdId]: {
        dataId: epTextValid.dataId,
        filters: [],
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
  test('addEpInLastTbdIdMap: map empty, ep valid for text with filters', () => {
    expect(addEpInLastTbdIdMap({}, epTextValid2, 'text1')).toEqual({
      [epTextValid2.tbdId]: {
        dataId: epTextValid2.dataId,
        filters: epTextValid2.filters,
        localIds: {
          [epTextValid2.localId]: {
            field: epTextValid2.field,
            offset: epTextValid2.offset,
            timebarUuid: epTextValid2.timebarUuid,
            viewType: 'TextView',
          },
        },
        views: ['text1'],
      },
    });
  });
  test('addEpInLastTbdIdMap: map empty, ep with error', () => {
    expect(addEpInLastTbdIdMap({}, epError, 'text1')).toEqual({});
  });
  test('addEpInLastTbdIdMap: map not empty, other ep valid', () => {
    const map = addEpInLastTbdIdMap({}, epTextValid, 'text1');
    expect(addEpInLastTbdIdMap(map, epTextValid2, 'text2')).toEqual({
      [epTextValid.tbdId]: {
        dataId: epTextValid.dataId,
        filters: [],
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
      [epTextValid2.tbdId]: {
        dataId: epTextValid2.dataId,
        filters: epTextValid2.filters,
        localIds: {
          [epTextValid2.localId]: {
            field: epTextValid2.field,
            offset: epTextValid2.offset,
            timebarUuid: epTextValid2.timebarUuid,
            viewType: 'TextView',
          },
        },
        views: ['text2'],
      },
    });
  });
  test('addEpInLastTbdIdMap: map empty, DecommutedPacket ep ', () => {
    expect(addEpInLastTbdIdMap({}, epDecommuted, 'dynamic1')).toEqual({
      [epDecommuted.tbdId]: {
        dataId: epDecommuted.dataId,
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
  test('addEpInLastTbdIdMap: map not empty, ep with same remoteId', () => {
    const map = addEpInLastTbdIdMap({}, epTextValid, 'text1');
    expect(addEpInLastTbdIdMap(map, epTextValid3, 'text2')).toEqual({
      [epTextValid.tbdId]: {
        dataId: epTextValid.dataId,
        filters: [],
        localIds: {
          [epTextValid.localId]: {
            field: epTextValid.field,
            offset: epTextValid.offset,
            timebarUuid: epTextValid.timebarUuid,
            viewType: 'TextView',
          },
          [epTextValid3.localId]: {
            field: epTextValid3.field,
            offset: epTextValid3.offset,
            timebarUuid: epTextValid3.timebarUuid,
            viewType: 'TextView',
          },
        },
        views: ['text1', 'text2'],
      },
    });
  });
  test('perLastTbdIdMap', () => {
    // const perViewMap = {
    //   text: {
    //     type: 'TextView',
    //     entryPoints: {
    //       STAT_SU_PID: {
    //         id: 'id1',
    //         dataId: {
    //           catalog: 'Reporting',
    //           parameterName: 'STAT_SU_PID',
    //           comObject: 'ReportingParameter',
    //           domainId: 4,
    //           sessionId: 181,
    //         },
    //         field: 'extractedValue',
    //         offset: 0,
    //         filters: [],
    //         localId: 'extractedValue.tb1:0',
    //         timebarUuid: 'tb1',
    //         tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
    //         type: 'TextView',
    //       },
    //       STAT_WILDCARD_TIMELINE: {
    //         id: 'id46',
    //         dataId: {
    //           catalog: 'Reporting',
    //           parameterName: 'STAT_WILDCARD_TIMELINE',
    //           comObject: 'ReportingParameter',
    //           domainId: 4,
    //           sessionId: 10,
    //         },
    //         field: 'extractedValue',
    //         offset: 0,
    //         filters: [],
    //         localId: 'extractedValue.tb1:0',
    //         timebarUuid: 'tb1',
    //         tbdId: 'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4',
    //         type: 'TextView',
    //       },
    //       STAT_UNKNOW_DOMAIN: { error: 'invalid entry point, no domain matches' },
    //     },
    //   },
    //   plot: {
    //     type: 'PlotView',
    //     masterSessionId: 10,
    //     entryPoints: {
    //       STAT_SU_PID: {
    //         id: 'id60',
    //         dataId: {
    //           catalog: 'Reporting',
    //           parameterName: 'STAT_SU_PID',
    //           comObject: 'ReportingParameter',
    //           domainId: 4,
    //           sessionId: 181,
    //         },
    //         fieldX: 'groundDate',
    //         fieldY: 'extractedValue',
    //         offset: 0,
    //         filters: [],
    //         localId: 'groundDate/extractedValue.tb1:0/0',
    //         timebarUuid: 'tb1',
    //         tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
    //         type: 'PlotView',
    //       },
    //       STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
    //     },
    //   },
    //   dynamic: {
    //     type: 'DynamicView',
    //     entryPoints: {
    //       STAT_SU_PID: {
    //         id: 'id1',
    //         dataId: {
    //           catalog: 'Reporting',
    //           parameterName: 'STAT_SU_PID',
    //           comObject: 'ReportingParameter',
    //           domainId: 4,
    //           sessionId: 181,
    //         },
    //         offset: 0,
    //         filters: [],
    //         localId: 'undefined.tb1:0',
    //         timebarUuid: 'tb1',
    //         tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
    //         type: 'DynamicView',
    //       },
    //     },
    //   },
    // };
    const dataMap = dataMapGenerator(state);
    expect(perLastTbdIdMap(dataMap.perView)).toMatchSnapshot();
    // {
    //   'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    //     dataId: {
    //       catalog: 'Reporting',
    //       parameterName: 'STAT_SU_PID',
    //       comObject: 'ReportingParameter',
    //       domainId: 4,
    //       sessionId: 181,
    //     },
    //     filters: [],
    //     localIds: {
    //       'extractedValue.tb1:0': {
    //         field: 'extractedValue',
    //         offset: 0,
    //         timebarUuid: 'tb1',
    //         viewType: 'TextView',
    //       },
    //       'undefined.tb1:0': {
    //         offset: 0,
    //         timebarUuid: 'tb1',
    //         viewType: 'DynamicView',
    //       },
    //     },
    //     views: ['text', 'dynamic'],
    //   },
    //   'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
    //     dataId: {
    //       catalog: 'Reporting',
    //       parameterName: 'STAT_WILDCARD_TIMELINE',
    //       comObject: 'ReportingParameter',
    //       domainId: 4,
    //       sessionId: 10,
    //     },
    //     filters: [],
    //     localIds: {
    //       'extractedValue.tb1:0': {
    //         field: 'extractedValue',
    //         offset: 0,
    //         timebarUuid: 'tb1',
    //         viewType: 'TextView',
    //       },
    //     },
    //     views: ['text'],
    //   },
    // });
  });
});
