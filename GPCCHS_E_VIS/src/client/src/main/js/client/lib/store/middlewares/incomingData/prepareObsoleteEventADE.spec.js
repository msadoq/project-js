import configureMockStore from 'redux-mock-store';
import * as types from 'store/types';
import { getStubData } from 'utils/stubs';
import lokiManager from 'serverProcess/models/lokiGeneric';
import prepareObsoleteEvent from './prepareObsoleteEventADE';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();
const dataStub = getStubData();
const mockStore = configureMockStore([prepareObsoleteEvent(lokiManager)]);

describe('store:middlewares:prepareObsoleteEvent', () => {
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
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1:::': {
        flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1:::',
        filters: [],
        intervals: [[10, 20], [1420106790800, 1420106790850]],
      },
      'Reporting.STAT_SU_PID<ReportingParameter>:1:1:extracted.>.1:::': {
        flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1:::',
        filters: [],
        intervals: [[10, 20], [1420106790800, 1420106790850]],
      },
    },
    ObsoleteEvents: {
      'STAT_SU_PID:1:1:::': {
        flatDataId: 'STAT_SU_PID:1:1:::',
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
              operator: '=',
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

  const t1 = 1420106790820;
  const t2 = 1420106790830;

  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const logbookEvent1 = dataStub.getLogbookEvent();
  const logbookEvent2 = dataStub.getLogbookEvent();

  const protoLogbookEvent1 = dataStub.getLogbookEventProtobuf(logbookEvent1);
  const protoLogbookEvent2 = dataStub.getLogbookEventProtobuf(logbookEvent2);

  const incomingObsoleteEventData = () => ({
    type: types.INCOMING_OBSOLETE_EVENT,
    payload: {
      tbdId: 'STAT_SU_PID:1:1:::',
      dataId: {
        parameterName: 'STAT_SU_PID',
        sessionId: 0,
        domainId: 4,
      },
      peers: [
        timestamp1,
        dataStub.getADEPayloadProtobuf({ payload: protoLogbookEvent1, comObjectType: 'LogbookEvent', providerId: 0, instancOid: 0 }),
        timestamp2,
        dataStub.getADEPayloadProtobuf({ payload: protoLogbookEvent2, comObjectType: 'LogbookEvent', providerId: 0, instancOid: 0 }),
      ],
    },
  });

  const incomingObsoleteEventData2 = () => ({
    type: types.INCOMING_OBSOLETE_EVENT,
    payload: {
      tbdId: 'STAT_SU_PID2:1:1:::',
      dataId: {
        parameterName: 'STAT_SU_PID2',
        sessionId: 0,
        domainId: 4,
      },
      peers: [
        timestamp1,
        dataStub.getADEPayloadProtobuf({ payload: protoLogbookEvent1, comObjectType: 'LogbookEvent', providerId: 0, instancOid: 0 }),
        timestamp2,
        dataStub.getADEPayloadProtobuf({ payload: protoLogbookEvent2, comObjectType: 'LogbookEvent', providerId: 0, instancOid: 0 }),
      ],
    },
  });

  test('tbdId is in ObsoleteEvents', () => {
    const store = mockStore(store1);
    store.dispatch(incomingObsoleteEventData());
    const actions = store.getActions();
    const expectedPayload = {
      type: 'NEW_DATA',
    };
    expect(actions).not.toContainEqual(expectedPayload);
  });
  test('tbdId is not in ObsoleteEvents', () => {
    const store = mockStore(store1);
    store.dispatch(incomingObsoleteEventData2());
    const actions = store.getActions();
    const expectedPayload = {
      type: 'NEW_DATA',
    };
    expect(actions).not.toContainEqual(expectedPayload);
  });
});
