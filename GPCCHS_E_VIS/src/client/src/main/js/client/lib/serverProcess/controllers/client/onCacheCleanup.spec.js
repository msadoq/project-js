const _concat = require('lodash/concat');
const dataStub = require('common/protobuf/stubs');
const { decode } = require('common/protobuf');

const registeredCallbacks = require('../../../utils/callbacks');
const {
  addRecord: registerQuery,
  getAll: getRegisteredQueries,
  cleanup: cleanRegisteredQueries,
} = require('../../models/registeredQueries');
const {
  clearFactory,
  getTimebasedDataModel,
  getOrCreateTimebasedDataModel,
} = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');

const onCacheCleanup = require('./onCacheCleanup');

let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

/* onCacheCleanup Test
 *
 * - check connectedData model for removed intervals and/or removed remoteIds
 * - check subscriptions model for removed remoteIds and/or removed dataId
 * - check timebasedData factory for removed records and/or removed model
 * - check zmq messages for timebasedSubscription if needed
 */

describe('controllers/client/onCacheCleanup', () => {
  // Declaring test data
  const dataId1 = dataStub.getDataId({ parameterName: 'data1' });
  const dataId2 = dataStub.getDataId({ parameterName: 'data2' });
  const remoteId1 = dataStub.getRemoteId(Object.assign({}, dataId1));
  const remoteId2 = dataStub.getRemoteId(Object.assign({}, dataId2));
  const queryId11 = 'queryId11';
  const interval11 = [0, 4];
  const queryId12 = 'queryId12';
  const interval12 = [6, 10];
  const queryId21 = 'queryId21';
  const interval21 = [0, 4];
  const queryId22 = 'queryId22';
  const interval22 = [6, 10];


  const ts1 = 1;
  const ts2 = 3;
  const ts3 = 7;
  const ts4 = 9;
  const rp = dataStub.getReportingParameter();
  const tbds = [
    { timestamp: ts1, payload: rp },
    { timestamp: ts2, payload: rp },
    { timestamp: ts3, payload: rp },
    { timestamp: ts4, payload: rp },
  ];

  beforeEach(() => {
    // Clear models and singletons
    connectedDataModel.cleanup();
    clearFactory();
    cleanRegisteredQueries();
    registeredCallbacks.clear();
    // Init models and singletons
    connectedDataModel.addRecord(dataId1);
    connectedDataModel.addRecord(dataId2);
    connectedDataModel.addRequestedInterval(remoteId1, queryId11, interval11);
    connectedDataModel.addRequestedInterval(remoteId1, queryId12, interval12);
    connectedDataModel.addRequestedInterval(remoteId2, queryId21, interval21);
    connectedDataModel.addRequestedInterval(remoteId2, queryId22, interval22);
    registerQuery(queryId11, remoteId1);
    registerQuery(queryId12, remoteId1);
    registerQuery(queryId21, remoteId2);
    registerQuery(queryId22, remoteId2);
    const timebasedDataModel11 = getOrCreateTimebasedDataModel(remoteId1);
    const timebasedDataModel21 = getOrCreateTimebasedDataModel(remoteId2);

    timebasedDataModel11.addRecords(tbds);
    timebasedDataModel21.addRecords(tbds);
  });

  it('not all intervals expired', () => {
    // init test
    const dataMap = {
      perRemoteId: {
        [remoteId1]: { localIds: { localId: { } } },
        [remoteId2]: {
          localIds: {
            localId: { },
            localId2: { },
          },
        },
      },
      expectedIntervals: {
        [remoteId1]: { localId: { expectedInterval: interval12 } },
        [remoteId2]: {
          localId: { expectedInterval: interval21 },
          localId2: { expectedInterval: interval22 },
        },
      },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    expect(connectedData).toHaveLength(2);
    expect(connectedData[0]).toMatchObject(
      {
        flatDataId: remoteId1,
        dataId: dataId1,
        intervals: {
          all: [interval12],
          received: [],
          requested: { [queryId12]: interval12 },
        },
      });
    expect(connectedData[1]).toMatchObject(
      {
        flatDataId: remoteId2,
        dataId: dataId2,
        intervals: {
          all: [interval21, interval22],
          received: [],
          requested: {
            [queryId21]: interval21,
            [queryId22]: interval22,
          },
        },
      });
    // check registered queries
    const queries = getRegisteredQueries();
    expect(queries).toHaveLength(3);
    expect(queries).toMatchObject([
      { queryId: queryId12, flatDataId: remoteId1 },
      { queryId: queryId21, flatDataId: remoteId2 },
      { queryId: queryId22, flatDataId: remoteId2 },
    ]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId1);
    const tbdModel2 = getTimebasedDataModel(remoteId2);
    expect(tbdModel1.count()).toBe(2);
    expect(tbdModel2.count()).toBe(4);
    expect(tbdModel1.find()).toMatchObject([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    expect(tbdModel2.find()).toMatchObject([
      { timestamp: ts1, payload: rp },
      { timestamp: ts2, payload: rp },
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check zmq message
    expect(calls).toHaveLength(0);
    // check registered callbacks
    expect(Object.keys(registeredCallbacks.getAll())).toHaveLength(0);
  });

  it('all intervals expired', () => {
    // init test
    const dataMap = {
      perRemoteId: {
        [remoteId1]: { localIds: { localId: {} } },
        [remoteId2]: {
          localIds: {
            localId: { },
            localId2: { },
          },
        },
      },
      expectedIntervals: {
        [remoteId1]: {
          localId: { expectedInterval: interval12 },
        },
        [remoteId2]: {
          localId: { expectedInterval: interval21 },
          localId2: { expectedInterval: interval22 },
        },
      },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    expect(connectedData).toHaveLength(2);
    expect(connectedData).toMatchObject([
      {
        flatDataId: remoteId1,
        dataId: dataId1,
        intervals: {
          all: [interval12],
          received: [],
          requested: { [queryId12]: interval12 },
        },
      }, {
        flatDataId: remoteId2,
        dataId: dataId2,
        intervals: {
          all: [interval21, interval22],
          received: [],
          requested: { [queryId21]: interval21, [queryId22]: interval22 },
        },
      },
    ]);
    // check registered queries
    const queries = getRegisteredQueries();
    expect(queries).toHaveLength(3);
    expect(queries).toMatchObject([
      { queryId: queryId12, flatDataId: remoteId1 },
      { queryId: queryId21, flatDataId: remoteId2 },
      { queryId: queryId22, flatDataId: remoteId2 },
    ]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId1);
    const tbdModel2 = getTimebasedDataModel(remoteId2);
    expect(tbdModel1.count()).toBe(2);
    expect(tbdModel2.count()).toBe(4);
    expect(tbdModel1.find()).toMatchObject([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    expect(tbdModel2.find()).toMatchObject([
      { timestamp: ts1, payload: rp },
      { timestamp: ts2, payload: rp },
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check zmq message
    expect(calls).toHaveLength(0);
    // check registered callbacks
    expect(Object.keys(registeredCallbacks.getAll())).toHaveLength(0);
  });

  it('subscription no longer needed', () => {
    // init test
    const dataMap = {
      perRemoteId: { [remoteId1]: { localIds: { localId: { } } } },
      expectedIntervals: { [remoteId1]: { localId: { expectedInterval: interval12 } } },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    expect(connectedData).toHaveLength(1);
    expect(connectedData).toMatchObject([
      {
        flatDataId: remoteId1,
        dataId: dataId1,
        intervals: {
          all: [interval12],
          received: [],
          requested: { [queryId12]: interval12 },
        },
      },
    ]);
    // check registered queries
    const queries = getRegisteredQueries();
    expect(queries).toHaveLength(1);
    expect(queries).toMatchObject([{ queryId: queryId12, flatDataId: remoteId1 }]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId1);
    expect(getTimebasedDataModel(remoteId2)).toBeFalsy();
    expect(tbdModel1.count()).toBe(2);
    expect(tbdModel1.find()).toMatchObject([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check zmq message
    expect(calls).toHaveLength(4);
    expect(calls[0]).toMatchObject(dataStub.getTimebasedSubscriptionHeaderProtobuf());
    const subId = decode('dc.dataControllerUtils.String', calls[1]).string;
    expect(calls[2]).toMatchObject(dataStub.getDataIdProtobuf(dataId2));
    expect(calls[3]).toMatchObject(dataStub.getDeleteActionProtobuf());
    // check registered callbacks
    const ids = Object.keys(registeredCallbacks.getAll());
    expect(ids).toHaveLength(1);
    expect(ids[0]).toBe(subId);
  });
});
