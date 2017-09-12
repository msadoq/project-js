import configureMockStore from 'redux-mock-store';
import _omit from 'lodash/omit';
import preparePubSub, { updateFinalPayload } from './preparePubSub';
import { isTimestampInKnownRanges } from '../../reducers/knownRanges';
import { isTimestampInLastDatamapInterval } from '../../../dataManager/mapSelector';
import lokiManager from '../../../serverProcess/models/lokiKnownRangesData';
import { getStubData } from '../../../utils/stubs';
import * as types from '../../types';
import state from '../../../common/jest/stateTest';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();
const dataStub = getStubData();

describe('store:middlewares:preparePubSub', () => {
  const mockStore = configureMockStore([preparePubSub(lokiManager)]);
  const decodedPayload = {
    extractedValue: { type: 'integer', value: 1 },
    rawValue: { type: 'integer', value: 2 } };

  beforeEach(() => {
    lokiManager.removeAllCollections();
  });
  describe('updateFinalPayload', () => {
    test('in store, tbdId in store, timestamp ok, empty finalPayloads', () => {
      const store = mockStore(state);
      const tbdId = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
      const finalPayloads = updateFinalPayload(store.getState(),
        { tbdId,
          timestamp: 320000,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        {});
      expect(finalPayloads).toEqual({ [tbdId]: { 320000: decodedPayload } });
      expect(lokiManager.listCollections()).toEqual([tbdId]);
    });
    test('in store, tbdId in store, timestamp nok, empty finalPayloads', () => {
      const store = mockStore(state);
      const finalPayloads = updateFinalPayload(store.getState(),
        { tbdId: 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1',
          timestamp: 150,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        {});
      expect(finalPayloads).toEqual({ });
      expect(lokiManager.listCollections()).toEqual([]);
      expect(lokiManager.displayCollection('Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1'))
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
        { 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': { 15: decodedPayload } });
      expect(finalPayloads)
      .toEqual({ 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': { 15: decodedPayload } });
      expect(lokiManager.listCollections()).toEqual([]);
    });
    test('in store, tbdId in store, timestamp ok, finalPayloads not empty', () => {
      const tbdId1 = 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1';
      const tbdId2 = 'Reporting.OTHER_PID<ReportingParameter>:1:1';
      const finalPayloads = updateFinalPayload(state,
        { tbdId: tbdId1,
          timestamp: 320000,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        { [tbdId1]: { 300000: decodedPayload } });
      expect(finalPayloads)
      .toEqual({ [tbdId1]: { 300000: decodedPayload, 320000: decodedPayload } });
      const finalPayloads2 = updateFinalPayload(state,
        { tbdId: tbdId1,
          timestamp: 320000,
          decodedPayload,
          isInIntervals: isTimestampInKnownRanges,
          filters: [],
          addRecord: lokiManager.addRecord },
        { [tbdId2]: { 300000: decodedPayload } });
      expect(finalPayloads2).toEqual({
        [tbdId1]: { 320000: decodedPayload },
        [tbdId2]: { 300000: decodedPayload },
      });
      expect(lokiManager.listCollections()).toEqual([tbdId1]);
    });
    test('in dataMap, tbdId not in last', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.UNKNOWN_NAME<ReportingParameter>:1:1',
          timestamp: 320000,
          decodedPayload,
          isInIntervals: isTimestampInLastDatamapInterval,
          filters: [] },
        { 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': { 320000: decodedPayload } });
      expect(finalPayloads)
      .toEqual({ 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': { 320000: decodedPayload } });
      expect(lokiManager.listCollections()).toEqual([]);
    });
    test('in dataMap, tbdId in last', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4',
          timestamp: 320000,
          decodedPayload,
          isInIntervals: isTimestampInLastDatamapInterval,
          filters: [] },
        { });
      expect(finalPayloads).toEqual({
        'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': { 320000: decodedPayload },
      });
      expect(lokiManager.listCollections()).toEqual([]);
    });
    test('in dataMap, tbdId in last but does not validate filters', () => {
      const finalPayloads = updateFinalPayload(state,
        { tbdId: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4',
          timestamp: 320000,
          decodedPayload,
          isInIntervals: isTimestampInLastDatamapInterval,
          filters: [{
            field: 'extractedValue',
            operator: '>',
            operand: '10',
          }] },
        { });
      expect(finalPayloads).toEqual({});
    });
  });
  describe('preparePubSub middleware', () => {
    const t1 = 350000;
    const t2 = 360000;

    const timestampInLast1 = 370000;
    const timestampInLast2 = 380000;

    const timestampNotInLast1 = 500000;
    const timestampNotInLast2 = 510000;

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
      parameterName: 'TMMGT_BC_VIRTCHAN3',
      comObject: 'ReportingParameter',
      sessionId: 0,
      domainId: 4,
    };
    const incomingRangeData = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        data: {
          'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4': {
            dataId,
            payloadBuffers: [timestamp1, protoRp1, timestamp2, protoRp2],
          },
        },
      },
    });

    const incomingDataNotInLast = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        data: {
          'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': {
            dataId,
            payloadBuffers: [
              timestampNotInLast1Proto,
              protoRp1,
              timestampNotInLast2Proto,
              protoRp2,
            ],
          },
        },
      },
    });

    const incomingDataOneInLast = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        data: {
          'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': {
            dataId,
            payloadBuffers: [timestampNotInLast1Proto, protoRp1, timestampInLast1Proto, protoRp2],
          },
        },
      },
    });

    const incomingDataAllInLast = () => ({
      type: types.INCOMING_PUBSUB_DATA,
      payload: {
        data: {
          'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1': {
            dataId,
            payloadBuffers: [timestampInLast1Proto, protoRp1, timestampInLast2Proto, protoRp2],
          },
        },
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
      expect(Object.keys(store.getActions()[1].payload.data))
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
      expect(Object.keys(store.getActions()[0].payload.peers))
      .toEqual([String(timestampInLast1)]);
      expect(removeDataFromPayload(store.getActions())).toMatchSnapshot();
    });
    test('All data in Last', () => {
      state.pages.page1.views = ['text1', 'mimic1'];
      const store = mockStore(state);
      store.dispatch(incomingDataAllInLast());
      expect(Object.keys(store.getActions()[0].payload.peers))
      .toEqual([String(timestampInLast1), String(timestampInLast2)]);
      expect(removeDataFromPayload(store.getActions())).toMatchSnapshot();
    });
  });
});
