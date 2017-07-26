import { isDataIdInDatamapLast, isTimestampInLastInterval } from './mapSelector';
import flattenDataId from '../common/flattenDataId';
import dataMapGenerator from './map';

describe('dataManager/mapSelector', () => {
  let dataId;
  beforeEach(() => {
    dataId = {
      catalog: 'Reporting',
      parameterName: 'paramName',
      comObject: 'ReportingParameter',
      domainId: 1,
      sessionId: 1,
    };
  });

  const state = {
    timebars: {
      tb1: {
        id: 'TB1',
        visuWindow: {
          lower: 1420106790818,
          upper: 1420107056239,
          current: 1420106843902,
          defaultWidth: 900000,
        },
        playingState: 'pause',
        masterId: 'Session 1',
        mode: 'Normal',
      },
    },
    timelines: {
      tl1: {
        id: 'Session 1',
        offset: 0,
        kind: 'Session',
        sessionName: 'Session#181',
        color: null,
      },
    },
    timebarTimelines: {
      tb1: ['tl1'],
    },
    windows: {
      win1: {
        isLoaded: true,
        title: 'Sup/Sup workspace',
        focusedPage: 'page1',
        pages: [
          'page1',
        ],
      },
    },
    pages: {
      page1: {
        title: 'page',
        timebarUuid: 'tb1',
        views: [
          'text1',
          'text2',
        ],
      },
    },
    TextViewConfiguration: {
      text1: {
        title: 'TextView1',
        type: 'TextView',
        entryPoints: [
          {
            name: 'STAT_SU_PID',
            id: 'id1',
            connectedData: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
          },
        ],
      },
      text2: {
        title: 'TextView2',
        type: 'TextView',
        entryPoints: [
          {
            name: 'STAT_SU_PID',
            id: 'id1',
            connectedData: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              filter: [{
                field: 'extractedValue',
                operator: '=',
                operand: '2',
              }],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
          },
        ],
      },
    },
    views: {
      text1: {
        type: 'TextView',
      },
      text2: {
        type: 'TextView',
      },
    },
    domains: [
      {
        itemNamespace: 'Domains',
        name: 'fr.cnes.isis.simupus',
        oid: '0051525005151000565215465660515',
        domainId: 1,
        parentDomainId: 1,
      },
    ],
    sessions: [
      {
        name: 'Session#181',
        id: 1,
        timestamp: {
          ms: 1480426701831,
          ps: null,
        },
        delta: 42,
        offsetWithmachineTime: 2373665,
      },
    ],
    masterSession: {
      sessionId: 10,
    },
  };
  const dataMap = dataMapGenerator(state);

  test('isDataIdInDatamapLast: empty state', () => {
    expect(isDataIdInDatamapLast({}, dataId)).toEqual([]);
  });
  test('isDataIdInDatamapLast: unknown dataId', () => {
    expect(isDataIdInDatamapLast(state, dataId)).toEqual([]);
  });
  test('isDataIdInDatamapLast: known dataId', () => {
    dataId.parameterName = 'STAT_SU_PID';
    expect(isDataIdInDatamapLast(state, dataId)).toEqual([
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1:extractedValue.=.2',
    ]);
  });
  test('isTimestampInLastInterval: empty dataMap', () => {
    expect(isTimestampInLastInterval(dataMapGenerator({}), flattenDataId(dataId), 1420106843802)).toEqual(false);
  });
  test('isTimestampInLastInterval: unknown dataId', () => {
    expect(isTimestampInLastInterval(dataMap, flattenDataId(dataId), 1420106843802)).toEqual(false);
  });
  test('isTimestampInLastInterval: known dataId timestamp ok', () => {
    dataId.parameterName = 'STAT_SU_PID';
    expect(isTimestampInLastInterval(dataMap, flattenDataId(dataId), 1420106843802)).toEqual(true);
  });
  test('isTimestampInLastInterval: known dataId timestamp nok', () => {
    dataId.parameterName = 'STAT_SU_PID';
    expect(isTimestampInLastInterval(dataMap, flattenDataId(dataId), 1420106843952)).toEqual(false);
  });
});
