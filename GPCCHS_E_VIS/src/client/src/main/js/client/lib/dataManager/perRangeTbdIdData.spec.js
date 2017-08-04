import cloneDeep from 'lodash/cloneDeep';
import perRangeTbdIdMap, { addEpInRangeTbdIdMap } from './perRangeTbdIdData';
import dataMapGenerator from './map';
import state from '../common/jest/stateTest';

describe('dataManager/perRangeTbdIdData', () => {
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

  const epValid3 = cloneDeep(epValid2);
  epValid3.fieldY = 'extractedValue';
  epValid3.localId = 'groundDate/extractedValue.tb1:0/0';
  epValid3.tbdId = 'Reporting.STAT_SU_NEW<ReportingParameter>:181:4';

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
  test('addEpInRangeTbdIdMap: map empty, ep valid for plot', () => {
    expect(addEpInRangeTbdIdMap({}, epValid, 'plot1')).toEqual({
      [epValid.tbdId]: {
        dataId: epValid.dataId,
        filters: [],
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
  test('addEpInRangeTbdIdMap: map empty, ep with error', () => {
    expect(addEpInRangeTbdIdMap({}, epError, 'plot1')).toEqual({});
  });
  test('addEpInRangeTbdIdMap: map not empty, other ep valid', () => {
    const map = addEpInRangeTbdIdMap({}, epValid, 'plot1');
    expect(addEpInRangeTbdIdMap(map, epValid2, 'plot2')).toEqual({
      [epValid.tbdId]: {
        dataId: epValid.dataId,
        filters: [],
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
      [epValid2.tbdId]: {
        dataId: epValid2.dataId,
        filters: [],
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
  test('addEpInRangeTbdIdMap: map not empty, other ep with error', () => {
    const map = addEpInRangeTbdIdMap({}, epValid, 'plot1');
    expect(addEpInRangeTbdIdMap(map, epError, 'plot1')).toEqual({
      [epValid.tbdId]: {
        dataId: epValid.dataId,
        filters: [],
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
  test('addEpInRemoteIdMap: map not empty, ep with same remoteId', () => {
    const map = addEpInRangeTbdIdMap({}, epValid2, 'plot1');
    expect(addEpInRangeTbdIdMap(map, epValid3, 'plot2')).toEqual({
      [epValid2.tbdId]: {
        dataId: epValid2.dataId,
        filters: [],
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
  test('perRangeTbdIdMap', () => {
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
    // };
    const dataMap = dataMapGenerator(state);
    expect(perRangeTbdIdMap(dataMap.perView)).toMatchSnapshot();
    // toEqual({
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
    //       'groundDate/extractedValue.tb1:0/0': {
    //         fieldX: 'groundDate',
    //         fieldY: 'extractedValue',
    //         offset: 0,
    //         timebarUuid: 'tb1',
    //         viewType: 'PlotView',
    //       },
    //     },
    //     views: ['plot'],
    //   },
    // });
  });
});
