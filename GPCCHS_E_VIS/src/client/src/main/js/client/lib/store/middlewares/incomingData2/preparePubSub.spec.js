import configureMockStore from 'redux-mock-store';
import _omit from 'lodash/omit';
import preparePubSub, { updateFinalPayload } from './preparePubSub';
import { isTimestampInKnownRanges } from '../../reducers/knownRanges';
import { isTimestampInLastDatamapInterval } from '../../../dataManager/mapSelector';
import lokiManager from '../../../serverProcess/models/lokiKnownRangesData';
import { getStubData } from '../../../utils/stubs';
import * as types from '../../types';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();
const dataStub = getStubData();

describe('store:middlewares:preparePubSub', () => {
  const mockStore = configureMockStore([preparePubSub(lokiManager)]);
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
  const decodedPayload = {
    myValue1: { type: 'integer', value: 1 },
    myValue2: { type: 'integer', value: 2 } };

  beforeEach(() => {
    lokiManager.removeAllCollections();
  });
  describe('updateFinalPayload', () => {
    test('in store, tbdId in store, timestamp ok, empty finalPayloads', () => {
      const store = mockStore(state);
      const tbdId = 'Reporting.STAT_SU_PID<ReportingParameter>:1:1';
      const finalPayloads = updateFinalPayload(store.getState(),
        { tbdId,
          timestamp: 15,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        {});
      expect(finalPayloads).toEqual({ [tbdId]: { 15: decodedPayload } });
      expect(lokiManager.listCollections()).toEqual([tbdId]);
    });
    test('in store, tbdId in store, timestamp nok, empty finalPayloads', () => {
      const store = mockStore(state);
      const finalPayloads = updateFinalPayload(store.getState(),
        { tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
          timestamp: 150,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        {});
      expect(finalPayloads).toEqual({ });
      expect(lokiManager.listCollections()).toEqual([]);
      expect(lokiManager.displayCollection('Reporting.STAT_SU_PID<ReportingParameter>:1:1'))
      .toEqual([]);
    });
    test('in store, tbdId not in store, empty finalPayloads', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.UNKNOWN_NAME<ReportingParameter>:1:1',
          timestamp: 15,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        {});
      expect(finalPayloads).toEqual({ });
      expect(lokiManager.listCollections()).toEqual([]);
    });
    test('in store, tbdId not in store, finalPayloads not empty', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.UNKNOWN_NAME<ReportingParameter>:1:1',
          timestamp: 15,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        { 'Reporting.STAT_SU_PID<ReportingParameter>:1:1': { 15: decodedPayload } });
      expect(finalPayloads)
      .toEqual({ 'Reporting.STAT_SU_PID<ReportingParameter>:1:1': { 15: decodedPayload } });
      expect(lokiManager.listCollections()).toEqual([]);
    });
    test('in store, tbdId in store, timestamp ok, finalPayloads not empty', () => {
      const tbdId1 = 'Reporting.STAT_SU_PID<ReportingParameter>:1:1';
      const tbdId2 = 'Reporting.OTHER_PID<ReportingParameter>:1:1';
      const finalPayloads = updateFinalPayload(state,
        { tbdId: tbdId1,
          timestamp: 15,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        { [tbdId1]: { 1420106790810: decodedPayload } });
      expect(finalPayloads)
      .toEqual({ [tbdId1]: { 15: decodedPayload, 1420106790810: decodedPayload } });
      const finalPayloads2 = updateFinalPayload(state,
        { tbdId: tbdId1,
          timestamp: 15,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        { [tbdId2]: { 1420106790810: decodedPayload } });
      expect(finalPayloads2).toEqual({
        [tbdId1]: { 15: decodedPayload },
        [tbdId2]: { 1420106790810: decodedPayload },
      });
      expect(lokiManager.listCollections()).toEqual([tbdId1]);
    });
    test('in dataMap, tbdId not in last', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.UNKNOWN_NAME<ReportingParameter>:1:1',
          timestamp: 15,
          decodedPayload,
          isInIntervals: isTimestampInLastDatamapInterval,
          filters: [] },
        { 'Reporting.STAT_SU_PID<ReportingParameter>:1:1': { 15: decodedPayload } });
      expect(finalPayloads)
      .toEqual({ 'Reporting.STAT_SU_PID<ReportingParameter>:1:1': { 15: decodedPayload } });
      expect(lokiManager.listCollections()).toEqual([]);
    });
    test('in dataMap, tbdId in last', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
          timestamp: 1420106790810,
          decodedPayload,
          isInIntervals: isTimestampInLastDatamapInterval,
          filters: [] },
        { });
      expect(finalPayloads).toEqual({
        'Reporting.STAT_SU_PID<ReportingParameter>:1:1': { 1420106790810: decodedPayload },
      });
      expect(lokiManager.listCollections()).toEqual([]);
    });
    test('in dataMap, tbdId in last but does not validate filters', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
          timestamp: 1420106790810,
          decodedPayload,
          isInIntervals: isTimestampInLastDatamapInterval,
          filters: [{
            field: 'myValue1',
            operator: '>',
            operand: '10',
          }] },
        { });
      expect(finalPayloads).toEqual({});
    });
  });
  describe('preparePubSub middleware', () => {
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

    const dataId = {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      sessionId: 1,
      domainId: 1,
    };
    const incomingRangeData = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        dataId,
        peers: [timestamp1, protoRp1, timestamp2, protoRp2],
      },
    });

    const incomingDataNotInLast = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        dataId,
        peers: [timestampNotInLast1Proto, protoRp1, timestampNotInLast2Proto, protoRp2],
      },
    });

    const incomingDataOneInLast = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        dataId,
        peers: [timestampNotInLast1Proto, protoRp1, timestampInLast1Proto, protoRp2],
      },
    });

    const incomingDataAllInLast = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
        dataId,
        peers: [timestampInLast1Proto, protoRp1, timestampInLast2Proto, protoRp2],
      },
    });

    const removeDataFromPayload = (actions) => {
      const tabActions = [];
      for (let i = 0; i < actions.length; i += 1) {
        tabActions.push({ ...actions[i],
          payload: _omit(actions[i].payload, ['data', 'peers']),
        });
      }
      return tabActions;
    };

    test('OTHER_ACTION', () => {
      const otherActions = { type: 'WS_OTHER_ACTION' };
      const store = mockStore(state);
      store.dispatch(otherActions);
      expect(store.getActions()).toEqual([{ type: 'WS_OTHER_ACTION' }]);
    });
    test('Range Data to add in store', () => {
      state.pages.page1.views = ['plot1'];
      const store = mockStore(state);
      store.dispatch(incomingRangeData());
      expect(Object.keys(store.getActions()[0].payload.data))
      .toEqual([String(t1), String(t2)]);
      expect(removeDataFromPayload(store.getActions())).toMatchSnapshot();
    });
    test('Not in Last', () => {
      state.pages.page1.views = ['text1', 'mimic1'];
      const store = mockStore(state);
      store.dispatch(incomingDataNotInLast());
      expect(removeDataFromPayload(store.getActions())).toMatchSnapshot();
    });
    test('One data in Last', () => {
      state.pages.page1.views = ['text1', 'mimic1'];
      const store = mockStore(state);
      store.dispatch(incomingDataOneInLast());
      expect(Object.keys(store.getActions()[0].payload.data))
      .toEqual([String(timestampInLast1)]);
      expect(removeDataFromPayload(store.getActions())).toMatchSnapshot();
    });
    test('All data in Last', () => {
      state.pages.page1.views = ['text1', 'mimic1'];
      const store = mockStore(state);
      store.dispatch(incomingDataAllInLast());
      expect(Object.keys(store.getActions()[0].payload.data))
      .toEqual([String(timestampInLast1), String(timestampInLast2)]);
      expect(removeDataFromPayload(store.getActions())).toMatchSnapshot();
    });
  });
});
