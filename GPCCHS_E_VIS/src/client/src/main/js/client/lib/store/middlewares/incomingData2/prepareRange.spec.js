import configureMockStore from 'redux-mock-store';
import * as types from '../../types';
import prepareRange from './prepareRange';
import { getStubData } from '../../../utils/stubs';
import lokiManager from '../../../serverProcess/models/lokiKnownRangesData';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();
const dataStub = getStubData();
const mockStore = configureMockStore([prepareRange(lokiManager)]);

describe('store:middlewares:prepareRange', () => {
  const store1 = {
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
        masterId: 'Session 2',
        mode: 'Normal',
      },
    },
    knownRanges: {
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1': {
        flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        filters: [],
        intervals: [[10, 20], [1420106790800, 1420106790850]],
      },
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1:extracted.>.1': {
        flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        filters: [],
        intervals: [[10, 20], [1420106790800, 1420106790850]],
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
        title: 'page Sup/Sup workspace',
        timebarUuid: 'tb1',
        views: [
          'text1',
          'plot1',
          'dynamic1',
          'mimic1',
        ],
      },
    },
    MimicViewConfiguration: {
      mimic1: {
        title: 'MimicView Sup/Sup',
        type: 'MimicView',
        entryPoints: [{
          name: 'STAT_SU_PID',
          id: 'id1',
          connectedData: {
            formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
            filter: [],
            domain: 'fr.cnes.isis.simupus',
            timeline: 'Session 1',
          },
        }],
      },
    },
    TextViewConfiguration: {
      text1: {
        title: 'TextView Sup/Sup',
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
    },
    PlotViewConfiguration: {
      plot1: {
        entryPoints: [
          {
            name: 'STAT_SU_PID',
            id: 'id60',
            connectedData: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              fieldX: 'groundDate',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
            stateColors: [
              {
                color: '#000000',
                condition: {
                  field: 'extractedValue',
                  operator: '>',
                  operand: '1',
                },
              },
            ],
          },
          {
            name: 'STAT_SU_PID2',
            id: 'id60',
            connectedData: {
              fieldX: 'groundDate',
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              filter: [{
                field: 'extractedValue',
                operator: '>',
                operand: '1',
              }],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
            stateColors: [
              {
                color: '#000000',
                condition: {
                  field: 'extractedValue',
                  operator: '>',
                  operand: '1',
                },
              },
            ],
          },
          // {
          //   name: 'STAT_PARAMETRIC',
          //   connectedData: {
          //     formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
          //     fieldX: 'groundDate',
          //     filter: [],
          //     domain: 'fr.cnes.isis',
          //     timeline: 'Session 1',
          //   },
          //   stateColors: [
          //     {
          //       color: '#000000',
          //       condition: {
          //         field: 'monitoringState',
          //         operator: '==',
          //         operand: 'waiting',
          //       },
          //     },
          //   ],
          // },
        ],
        title: 'Plotview Sup/Sup workspace',
      },
    },
    DynamicViewConfiguration: {
      dynamic1: {
        type: 'DynamicView',
        entryPoints: [{
          connectedData: {
            formula: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>',
            filter: [],
            domain: 'fr.cnes.isis.simupus',
            timeline: 'Session 1',
          },
          name: 'dynamicEP',
          id: 'id70',
          stateColors: [{
            color: '#000000',
            condition: {
              field: 'monitoringState',
              operator: '==',
              operand: 'waiting',
            },
          }],
        }],
      },
    },
    views: {
      text1: {
        type: 'TextView',
      },
      plot1: {
        type: 'PlotView',
      },
      dynamic1: {
        type: 'DynamicView',
      },
      mimic1: {
        type: 'MimicView',
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

  const store2 = {
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
    knownRanges: {
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1': {
        flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        filters: [],
        intervals: [[10, 20], [1420106790800, 1420106790850]],
      },
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1:extracted.>.1': {
        flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        filters: [],
        intervals: [[10, 20], [1420106790800, 1420106790850]],
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

  const t1 = 1420106790820;
  const t2 = 1420106790830;

  const timestampInLast1 = 1420106843802;
  const timestampInLast2 = 1420106843852;

  const timestampNotInLast1 = 1420106843952;
  const timestampNotInLast2 = 1420106843955;

  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const timestampInLast1Proto = dataStub.getTimestampProtobuf({ ms: timestampInLast1 });
  const timestampInLast2Proto = dataStub.getTimestampProtobuf({ ms: timestampInLast2 });

  const timestampNotInLast1Proto = dataStub.getTimestampProtobuf({ ms: timestampNotInLast1 });
  const timestampNotInLast2Proto = dataStub.getTimestampProtobuf({ ms: timestampNotInLast2 });

  const rp1 = dataStub.getReportingParameter();
  const rp2 = dataStub.getReportingParameter();

  const protoRp1 = dataStub.getReportingParameterProtobuf(rp1);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);

  const deprotoRp1 = dataStub.getReportingParameterDeProtobuf(protoRp1);
  const deprotoRp2 = dataStub.getReportingParameterDeProtobuf(protoRp2);

  const incomingRangeData = () => ({
    type: types.INCOMING_RANGE_DATA,
    payload: {
      tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      dataId: { comObject: 'ReportingParameter' },
      peers: [timestamp1, protoRp1, timestamp2, protoRp2],
    },
  });

  const incomingDataNotInLast = () => ({
    type: types.INCOMING_RANGE_DATA,
    payload: {
      tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      dataId: { comObject: 'ReportingParameter' },
      peers: [timestampNotInLast1Proto, protoRp1, timestampNotInLast2Proto, protoRp2],
    },
  });

  const incomingDataOneInLast = () => ({
    type: types.INCOMING_RANGE_DATA,
    payload: {
      tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      dataId: { comObject: 'ReportingParameter' },
      peers: [timestampNotInLast1Proto, protoRp1, timestampInLast1Proto, protoRp2],
    },
  });

  const incomingDataAllInLast = () => ({
    type: types.INCOMING_RANGE_DATA,
    payload: {
      tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      dataId: { comObject: 'ReportingParameter' },
      peers: [timestampInLast1Proto, protoRp1, timestampInLast2Proto, protoRp2],
    },
  });

  test('tbdId is in dataMap.expectedRange', () => {
    const store = mockStore(store1);
    store.dispatch(incomingRangeData());
    expect(lokiManager.displayCollection('Reporting.STAT_SU_PID<ReportingParameter>:1:1')).toMatchObject(
      [{
        timestamp: 1420106790820,
        payload: deprotoRp1,
      },
      {
        timestamp: 1420106790830,
        payload: deprotoRp2,
      }]);
    const actions = store.getActions();
    const data = {};
    data[t1] = deprotoRp1;
    data[t2] = deprotoRp2;
    const expectedPayload = {
      type: 'NEW_DATA',
      payload: {
        tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        data,
      },
    };
    expect(actions).toContainEqual(expectedPayload);
  });

  test('tbdId is not in dataMap.expectedRange and no timestamp is in expectedLast ', () => {
    const store = mockStore(store2);
    store.dispatch(incomingDataNotInLast());
    const actions = store.getActions();
    const expectedPayload = {
      type: 'NEW_DATA',
    };
    expect(actions).not.toContainEqual(expectedPayload);
  });

  test('tbdId is not in dataMap.expectedRange and only one timestamp is in expectedLast ', () => {
    const store = mockStore(store2);
    store.dispatch(incomingDataOneInLast());
    const actions = store.getActions();
    const data = {};
    data[timestampInLast1] = deprotoRp2;
    const expectedPayload = {
      type: 'NEW_DATA',
      payload: {
        tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        data,
      },
    };
    expect(actions).toContainEqual(expectedPayload);
  });

  test('tbdId is not in dataMap.expectedRange and all timestamp are in expectedLast ', () => {
    const store = mockStore(store2);
    store.dispatch(incomingDataAllInLast());

    const actions = store.getActions();
    const data = {};
    data[timestampInLast1] = deprotoRp1;
    data[timestampInLast2] = deprotoRp2;
    const expectedPayload = {
      type: 'NEW_DATA',
      payload: {
        tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        data,
      },
    };
    expect(actions).toContainEqual(expectedPayload);
  });
});
