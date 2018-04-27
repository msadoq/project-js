// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// END-HISTORY
// ====================================================================

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
    tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4:::',
    type: 'PlotView',
  };
  const epValid2 = cloneDeep(epValid);
  epValid2.dataId.parameterName = 'STAT_SU_NEW';
  epValid2.fieldY = 'rawValue';
  epValid2.localId = 'groundDate/rawValue.tb1:0/0';
  epValid2.tbdId = 'Reporting.STAT_SU_NEW<ReportingParameter>:181:4:::';

  const epValid3 = cloneDeep(epValid2);
  epValid3.fieldY = 'extractedValue';
  epValid3.localId = 'groundDate/extractedValue.tb1:0/0';
  epValid3.tbdId = 'Reporting.STAT_SU_NEW<ReportingParameter>:181:4:::';

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
    tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4:::',
    type: 'TextView',
  };
  const epTextValid2 = cloneDeep(epTextValid);
  epTextValid2.filters.push({ field: 'raw', operator: '=', operand: '12' });
  epTextValid2.tbdId = 'Reporting.STAT_SU_PID<ReportingParameter>:181:4::raw.=.12:';
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
    const dataMap = dataMapGenerator(state);
    expect(perRangeTbdIdMap(dataMap.perView)).toMatchSnapshot();
  });
});
