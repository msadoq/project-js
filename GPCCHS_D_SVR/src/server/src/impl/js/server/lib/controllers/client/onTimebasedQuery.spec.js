const { should } = require('../../utils/test');
const flattenDataId = require('../../models/getLocalId');
const { timebasedQuery } = require('./onTimebasedQuery');
const connectedDataModel = require('../../models/connectedData');
const timebasedDataModel = require('../../models/timebasedData');
const subscriptionsModel = require('../../models/subscriptions');
const registeredQueries = require('../../utils/registeredQueries');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const _ = require('lodash');
const dataStub = require('../../stubs/data');
const constants = require('../../constants');
const { addToTestQueue, getMessage, resetMessage } = require('../../stubs/testWebSocket');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls = _.concat(calls, payload);
};

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
    resetMessage();
    calls.length = 0;
  });

  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);
  const remoteId = dataStub.getRemoteId(dataId);
  const interval = [1, 10];
  const intervalProto = dataStub.getTimeIntervalProtobuf({
    lowerTs: { ms: 1 },
    upperTs: { ms: 10 },
  });
  const halfIntervalProto = dataStub.getTimeIntervalProtobuf({
    lowerTs: { ms: 1 },
    upperTs: { ms: 5 },
  });
  const filter1 = {
    field: 'extractedValue',
    operator: constants.FILTEROPERATOR_GT,
    value: 42,
  };
  const filter2 = {
    field: 'groundDate',
    operator: constants.FILTEROPERATOR_EQ,
    value: 42,
  };
  const filterProto1 = dataStub.getFilterProtobuf(filter1);
  const filterProto2 = dataStub.getFilterProtobuf(filter2);

  // const dataIdWithFilter = getDataIdWithFilter(
  //   Object.assign(
  //     {},
  //     dataId,
  //     { filters: [{ lhs: filter.field, comp: filter.operator, rhs: `${filter.value}` }] })
  // );
  const rp = dataStub.getReportingParameter();
  const t1 = 3;
  const t2 = 5;

  const payloads = [
    { timestamp: t1, payload: rp },
    { timestamp: t2, payload: rp },
  ];

  const query = {
    [remoteId]: {
      dataId,
      intervals: [interval],
      filter: [filter1, filter2],
    },
  };

  it('no missing intervals', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(remoteId, 'queryId', interval);
    timebasedDataModel.addRecords(remoteId, payloads);
    // launch test
    timebasedQuery(addToTestQueue, query, zmqEmulator);
    // check registeredQueries
    _.isEmpty(registeredQueries.getAll()).should.equal(true);
    // check registeredCallbacks
    _.isEmpty(registeredCallbacks.getAll()).should.equal(true);
    // check zmq messages
    calls.length.should.equal(0);
    // check ws messages
    getMessage().should.have.properties({
      event: 'timebasedData',
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
        [remoteId]: [filter1, filter2],
      },
    });
  });

  it('all intervals missing', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    timebasedDataModel.addRecords(remoteId, payloads);
    // launch test
    timebasedQuery(addToTestQueue, query, zmqEmulator);
    // check registeredQueries
    const queryIds = _.keys(registeredQueries.getAll());
    queryIds.length.should.equal(1);
    const queryId = queryIds[0];
    // check registeredCallbacks
    should.exist(registeredCallbacks.get(queryId));
    // check zmq messages
    const queryIdProto = dataStub.getStringProtobuf(queryId);
    calls.length.should.equal(6);
    calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
    calls[1].should.have.properties(queryIdProto);
    calls[2].should.have.properties(dataIdProto);
    calls[3].should.have.properties(intervalProto);
    calls[4].should.have.properties(filterProto1);
    calls[5].should.have.properties(filterProto2);
    // check ws messages
    getMessage().should.have.properties({});
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
        [remoteId]: [filter1, filter2],
      },
    });
  });

  it('some missing intervals', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(remoteId, 'myQueryId', [5, 10]);
    timebasedDataModel.addRecord(remoteId, payloads[1].timestamp, payloads[1].payload);
    // launch test
    timebasedQuery(addToTestQueue, query, zmqEmulator);
    // check registeredQueries
    const queryIds = _.keys(registeredQueries.getAll());
    queryIds.length.should.equal(1);
    const queryId = queryIds[0];
    // check registeredCallbacks
    should.exist(registeredCallbacks.get(queryId));
    // check zmq messages
    const queryIdProto = dataStub.getStringProtobuf(queryId);
    calls.length.should.equal(6);
    calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
    calls[1].should.have.properties(queryIdProto);
    calls[2].should.have.properties(dataIdProto);
    calls[3].should.have.properties(halfIntervalProto);
    calls[4].should.have.properties(filterProto1);
    calls[5].should.have.properties(filterProto2);
    // check ws messages
    getMessage().should.have.properties({
      event: 'timebasedData',
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
        [remoteId]: [filter1, filter2],
      },
    });
  });

  it('dataId not in subscriptions', () => {
    // init test
    timebasedDataModel.addRecords(remoteId, payloads);
    // launch test
    timebasedQuery(addToTestQueue, query, zmqEmulator);
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
    const queryIdProto = dataStub.getStringProtobuf(queryId);
    const subIdProto = dataStub.getStringProtobuf(subId);
    calls.length.should.equal(10);
    calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
    calls[1].should.have.properties(queryIdProto);
    calls[2].should.have.properties(dataIdProto);
    calls[3].should.have.properties(intervalProto);
    calls[4].should.have.properties(filterProto1);
    calls[5].should.have.properties(filterProto2);
    calls[6].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
    calls[7].should.have.properties(subIdProto);
    calls[8].should.have.properties(dataIdProto);
    calls[9].should.have.properties(dataStub.getAddActionProtobuf());
    // check ws messages
    getMessage().should.have.properties({});
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
        [remoteId]: [filter1, filter2],
      },
    });
  });
});
