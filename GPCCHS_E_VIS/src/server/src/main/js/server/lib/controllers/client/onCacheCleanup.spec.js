const _concat = require('lodash/concat');
const dataStub = require('common/stubs/data');
const { decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

const { should } = require('../../utils/test');
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
const subscriptionsModel = require('../../models/subscriptions');

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
  const remoteId11 = dataStub.getRemoteId(Object.assign({}, dataId1));
  const remoteId21 = dataStub.getRemoteId(Object.assign({}, dataId2));
  const remoteId22 = dataStub.getRemoteId(Object.assign({}, dataId2));
  const queryId111 = 'queryId111';
  const interval111 = [0, 4];
  const queryId112 = 'queryId112';
  const interval112 = [6, 10];
  const queryId211 = 'queryId211';
  const interval211 = [0, 4];
  const queryId212 = 'queryId212';
  const interval212 = [6, 10];
  const queryId221 = 'queryId221';
  const interval221 = [0, 4];
  const queryId222 = 'queryId222';
  const interval222 = [6, 10];

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
    subscriptionsModel.cleanup();
    clearFactory();
    cleanRegisteredQueries();
    registeredCallbacks.clear();
    // Init models and singletons
    connectedDataModel.addRecord(remoteId11, dataId1);
    connectedDataModel.addRecord(remoteId21, dataId2);
    connectedDataModel.addRecord(remoteId22, dataId2);
    connectedDataModel.addRequestedInterval(remoteId11, queryId111, interval111);
    connectedDataModel.addRequestedInterval(remoteId11, queryId112, interval112);
    connectedDataModel.addRequestedInterval(remoteId21, queryId211, interval211);
    connectedDataModel.addRequestedInterval(remoteId21, queryId212, interval212);
    connectedDataModel.addRequestedInterval(remoteId22, queryId221, interval221);
    connectedDataModel.addRequestedInterval(remoteId22, queryId222, interval222);
    registerQuery(queryId111, remoteId11);
    registerQuery(queryId112, remoteId11);
    registerQuery(queryId211, remoteId21);
    registerQuery(queryId212, remoteId21);
    registerQuery(queryId221, remoteId22);
    registerQuery(queryId222, remoteId22);
    subscriptionsModel.addRecord(dataId1);
    subscriptionsModel.addRecord(dataId2);
    const timebasedDataModel11 = getOrCreateTimebasedDataModel(remoteId11);
    const timebasedDataModel21 = getOrCreateTimebasedDataModel(remoteId21);
    const timebasedDataModel22 = getOrCreateTimebasedDataModel(remoteId22);

    timebasedDataModel11.addRecords(tbds);
    timebasedDataModel21.addRecords(tbds);
    timebasedDataModel22.addRecords(tbds);
  });

  it('not all intervals expired', () => {
    // init test
    const dataMap = {
      [remoteId11]: { localIds: { localId: { expectedInterval: interval112 } } },
      [remoteId21]: { localIds: { localId: { expectedInterval: interval211 } } },
      [remoteId22]: {
        localIds: {
          localId: { expectedInterval: interval221 },
          localId2: { expectedInterval: interval222 },
        },
      },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    connectedData.should.have.lengthOf(2);
    connectedData[0].should.have.properties(
      {
        remoteId: remoteId11,
        dataId: dataId1,
        intervals: {
          all: [interval112],
          received: [],
          requested: { [queryId112]: interval112 },
        },
      });
    connectedData[1].should.have.properties(
      {
        remoteId: remoteId21,
        dataId: dataId2,
        intervals: {
          all: [interval211, interval222],
          received: [],
          requested: {
            [queryId211]: interval211,
            [queryId221]: interval221,
            [queryId222]: interval222,
          },
        },
      });
    // check registered queries
    const queries = getRegisteredQueries();
    queries.should.have.lengthOf(5);
    queries.should.have.properties([
      { queryId: queryId112, remoteId: remoteId11 },
      { queryId: queryId211, remoteId: remoteId21 },
      { queryId: queryId212, remoteId: remoteId21 },
      { queryId: queryId221, remoteId: remoteId22 },
      { queryId: queryId222, remoteId: remoteId22 },
    ]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId11);
    const tbdModel2 = getTimebasedDataModel(remoteId21);
    const tbdModel3 = getTimebasedDataModel(remoteId22);
    tbdModel1.count().should.equal(2);
    tbdModel2.count().should.equal(4);
    tbdModel3.count().should.equal(4);
    tbdModel1.find().should.have.properties([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    tbdModel2.find().should.have.properties([
      { timestamp: ts1, payload: rp },
      { timestamp: ts2, payload: rp },
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    tbdModel3.find().should.have.properties([
      { timestamp: ts1, payload: rp },
      { timestamp: ts2, payload: rp },
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check subscriptions model
    subscriptionsModel.count().should.equal(2);
    subscriptionsModel.find().should.have.properties([
      {
        dataId: dataId1,
      }, {
        dataId: dataId2,
      },
    ]);
    // check zmq message
    calls.should.have.lengthOf(0);
    // check registered callbacks
    Object.keys(registeredCallbacks.getAll()).should.have.lengthOf(0);
  });

  it('all intervals expired', () => {
    // init test
    const dataMap = {
      [remoteId11]: { localIds: { localId: { expectedInterval: interval112 } } },
      [remoteId22]: {
        localIds: {
          localId: { expectedInterval: interval221 },
          localId2: { expectedInterval: interval222 },
        },
      },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    connectedData.should.have.lengthOf(2);
    connectedData.should.have.properties([
      {
        remoteId: remoteId11,
        dataId: dataId1,
        intervals: {
          all: [interval112],
          received: [],
          requested: { [queryId112]: interval112 },
        },
      }, {
        remoteId: remoteId22,
        dataId: dataId2,
        intervals: {
          all: [interval221, interval222],
          received: [],
          requested: { [queryId221]: interval221, [queryId222]: interval222 },
        },
      },
    ]);
    // check registered queries
    const queries = getRegisteredQueries();
    queries.should.have.lengthOf(5);
    queries.should.have.properties([
      { queryId: queryId112, remoteId: remoteId11 },
      { queryId: queryId211, remoteId: remoteId21 },
      { queryId: queryId212, remoteId: remoteId21 },
      { queryId: queryId221, remoteId: remoteId22 },
      { queryId: queryId222, remoteId: remoteId22 },
    ]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId11);
    const tbdModel2 = getTimebasedDataModel(remoteId21);
    const tbdModel3 = getTimebasedDataModel(remoteId22);
    tbdModel1.count().should.equal(2);
    tbdModel2.count().should.equal(4);
    tbdModel3.count().should.equal(4);
    tbdModel1.find().should.have.properties([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    tbdModel3.find().should.have.properties([
      { timestamp: ts1, payload: rp },
      { timestamp: ts2, payload: rp },
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check subscriptions model
    subscriptionsModel.count().should.equal(2);
    subscriptionsModel.find().should.have.properties([
      {
        dataId: dataId1,
      }, {
        dataId: dataId2,
      },
    ]);
    // check zmq message
    calls.should.have.lengthOf(0);
    // check registered callbacks
    Object.keys(registeredCallbacks.getAll()).should.have.lengthOf(0);
  });

  it('subscription no longer needed', () => {
    // init test
    const dataMap = {
      [remoteId11]: { localIds: { localId: { expectedInterval: interval112 } } },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    connectedData.should.have.lengthOf(1);
    connectedData.should.have.properties([
      {
        remoteId: remoteId11,
        dataId: dataId1,
        intervals: {
          all: [interval112],
          received: [],
          requested: { [queryId112]: interval112 },
        },
      },
    ]);
    // check registered queries
    const queries = getRegisteredQueries();
    queries.should.have.lengthOf(1);
    queries.should.have.properties([{ queryId: queryId112, remoteId: remoteId11 }]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId11);
    should.not.exist(getTimebasedDataModel(remoteId21));
    should.not.exist(getTimebasedDataModel(remoteId22));
    tbdModel1.count().should.equal(2);
    tbdModel1.find().should.have.properties([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check subscriptions model
    subscriptionsModel.count().should.equal(1);
    subscriptionsModel.find().should.have.properties([{ dataId: dataId1 }]);
    // check zmq message
    calls.should.have.lengthOf(4);
    calls[0].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
    const subId = decode('dc.dataControllerUtils.String', calls[1]).string;
    calls[2].should.have.properties(dataStub.getDataIdProtobuf(dataId2));
    calls[3].should.have.properties(dataStub.getDeleteActionProtobuf());
    // check registered callbacks
    const ids = Object.keys(registeredCallbacks.getAll());
    ids.should.have.lengthOf(1);
    ids[0].should.equal(subId);
  });
});
