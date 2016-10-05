const { should, testHandler, testPayloads } = require('../../utils/test');
const flattenDataId = require('../../models/getLocalId');
const { timebasedQuery } = require('./onTimebasedQuery');
const connectedDataModel = require('../../models/connectedData');
const timebasedDataModel = require('../../models/timebasedData');
const subscriptionsModel = require('../../models/subscriptions');
const registeredQueries = require('../../utils/registeredQueries');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const _ = require('lodash');
const {
  getDataId,
  getRemoteId,
  getFilter,
  getReportingParameter,
  getWrappedDataQueryProtobuf,
  getWrappedDataSubscribeProtobuf,
  getDataIdWithFilter,
} = require('../../stubs/data');
const TestWebSocket = require('../../stubs/testWebSocket');

const testWebsocket = new TestWebSocket();
testWebsocket.init();
const spark = testWebsocket.getSpark();

/* onTimebasedPubSubData Test
 *
 * - check registerQueries for the queryId
 * - check registerQueries for the queryId
 * - check zmq messages for both timebasedQuery and timebasedSubscription if needed
 * - check connectedDataModel for requested interval
 * - check subscriptionsModel for dataId and remoteIds/filters
 * - check ws messages for timebasedData
 *
 */

describe('onTimebasedQuery', () => {
  beforeEach(() => {
    registeredQueries.clear();
    registeredCallbacks.clear();
    connectedDataModel.cleanup();
    timebasedDataModel.cleanup();
    subscriptionsModel.cleanup();
    spark.resetMessage();
    testPayloads.length = 0;
  });

  const dataId = getDataId();
  const remoteId = getRemoteId(dataId);
  const interval = [1, 10];
  const filter = getFilter();
  const dataIdWithFilter = getDataIdWithFilter(
    Object.assign(
      {},
      dataId,
      { filters: [{ lhs: filter.field, comp: filter.operator, rhs: `${filter.value}` }] })
  );
  const rp = getReportingParameter();
  const payloads = [
    { timestamp: 3, payload: rp },
    { timestamp: 5, payload: rp },
  ];

  const query = {
    [remoteId]: {
      dataId,
      intervals: [interval],
      filter: [filter],
    },
  };

  it('no missing intervals', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(remoteId, 'queryId', interval);
    timebasedDataModel.addRecords(remoteId, payloads);
    // launch test
    timebasedQuery(spark, query, testHandler);
    // check registeredQueries
    _.isEmpty(registeredQueries.getAll()).should.equal(true);
    // check registeredCallbacks
    _.isEmpty(registeredCallbacks.getAll()).should.equal(true);
    // check zmq messages
    testPayloads.length.should.equal(0);
    // check ws messages
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [remoteId]: [
          {
            timestamp: payloads[1].timestamp,
            payload: payloads[1].payload,
          }, {
            timestamp: payloads[0].timestamp,
            payload: payloads[0].payload,
          },
        ],
      },
    });
    // check connectedDataModel
    connectedDataModel.count().should.equal(1);
    const connectedData = connectedDataModel.find();
    connectedData[0].should.have.properties({
      remoteId,
      intervals: {
        all: [interval],
        requested: { queryId: interval },
        received: [],
      },
    });
    // check subscriptionsModel
    subscriptionsModel.count().should.equal(1);
    const subscriptions = subscriptionsModel.find();
    subscriptions[0].should.have.properties({
      flatDataId: flattenDataId(dataId),
      dataId,
      filters: {
        [remoteId]: [filter],
      },
    });
  });

  it('all intervals missing', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    timebasedDataModel.addRecords(remoteId, payloads);
    // launch test
    timebasedQuery(spark, query, (key, buffer) => {
      key.should.equal('dcPush');
      testHandler(buffer);
    });
    // check registeredQueries
    const queryIds = _.keys(registeredQueries.getAll());
    queryIds.length.should.equal(1);
    const queryId = queryIds[0];
    // check registeredCallbacks
    should.exist(registeredCallbacks.get(queryId));
    // check zmq messages
    const dataQuery = getWrappedDataQueryProtobuf({
      id: queryId,
      dataId: dataIdWithFilter,
      interval: {
        lowerTs: { ms: interval[0] },
        upperTs: { ms: interval[1] },
      },
    });
    testPayloads.length.should.equal(1);
    testPayloads[0].should.have.properties(dataQuery);
    // check ws messages
    spark.getMessage().should.have.properties({});
    // check connectedDataModel
    connectedDataModel.count().should.equal(1);
    const connectedData = connectedDataModel.find();
    connectedData[0].should.have.properties({
      remoteId,
      intervals: {
        all: [interval],
        requested: { [queryId]: interval },
        received: [],
      },
    });
    // check subscriptionsModel
    subscriptionsModel.count().should.equal(1);
    const subscriptions = subscriptionsModel.find();
    subscriptions[0].should.have.properties({
      flatDataId: flattenDataId(dataId),
      dataId,
      filters: {
        [remoteId]: [filter],
      },
    });
  });

  it('some missing intervals', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(remoteId, 'myQueryId', [5, 10]);
    timebasedDataModel.addRecord(remoteId, payloads[1].timestamp, payloads[1].payload);
    // launch test
    timebasedQuery(spark, query, (key, buffer) => {
      key.should.equal('dcPush');
      testHandler(buffer);
    });
    // check registeredQueries
    const queryIds = _.keys(registeredQueries.getAll());
    queryIds.length.should.equal(1);
    const queryId = queryIds[0];
    // check registeredCallbacks
    should.exist(registeredCallbacks.get(queryId));
    // check zmq messages
    const dataQuery = getWrappedDataQueryProtobuf({
      id: queryId,
      dataId: dataIdWithFilter,
      interval: {
        lowerTs: { ms: 1 },
        upperTs: { ms: 5 },
      },
    });
    testPayloads.length.should.equal(1);
    testPayloads[0].should.have.properties(dataQuery);
    // check ws messages
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [remoteId]: [
          {
            timestamp: payloads[1].timestamp,
            payload: payloads[1].payload,
          },
        ],
      },
    });
    // check connectedDataModel
    connectedDataModel.count().should.equal(1);
    const connectedData = connectedDataModel.find();
    connectedData[0].should.have.properties({
      remoteId,
      intervals: {
        all: [interval],
        requested: { [queryId]: [1, 5], myQueryId: [5, 10] },
        received: [],
      },
    });
    // check subscriptionsModel
    subscriptionsModel.count().should.equal(1);
    const subscriptions = subscriptionsModel.find();
    subscriptions[0].should.have.properties({
      flatDataId: flattenDataId(dataId),
      dataId,
      filters: {
        [remoteId]: [filter],
      },
    });
  });

  it('dataId not in subscriptions', () => {
    // init test
    timebasedDataModel.addRecords(remoteId, payloads);
    // launch test
    timebasedQuery(spark, query, (key, buffer) => {
      key.should.equal('dcPush');
      testHandler(buffer);
    });
    // check registeredQueries
    const queryIds = _.keys(registeredQueries.getAll());
    queryIds.length.should.equal(1);
    const queryId = queryIds[0];
    // check registeredCallbacks
    should.exist(registeredCallbacks.get(queryId));
    const callbackIds = _.keys(registeredCallbacks.getAll());
    callbackIds.length.should.equal(2);
    const subId = _.pull(callbackIds, queryId)[0];
    // check zmq messages
    const dataQuery = getWrappedDataQueryProtobuf({
      id: queryId,
      dataId: dataIdWithFilter,
      interval: {
        lowerTs: { ms: interval[0] },
        upperTs: { ms: interval[1] },
      },
    });
    const dataSubscribe = getWrappedDataSubscribeProtobuf({
      id: subId,
      dataId,
    });
    testPayloads.length.should.equal(2);
    testPayloads[0].should.have.properties(dataQuery);
    testPayloads[1].should.have.properties(dataSubscribe);
    // check ws messages
    spark.getMessage().should.have.properties({});
    // check connectedDataModel
    connectedDataModel.count().should.equal(1);
    const connectedData = connectedDataModel.find();
    connectedData[0].should.have.properties({
      remoteId,
      intervals: {
        all: [interval],
        requested: { [queryId]: interval },
        received: [],
      },
    });
    // check subscriptionsModel
    subscriptionsModel.count().should.equal(1);
    const subscriptions = subscriptionsModel.find();
    subscriptions[0].should.have.properties({
      flatDataId: flattenDataId(dataId),
      dataId,
      filters: {
        [remoteId]: [filter],
      },
    });
  });
});
