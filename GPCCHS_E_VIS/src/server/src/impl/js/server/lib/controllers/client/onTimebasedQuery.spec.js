// eslint-disable-next-line no-underscore-dangle
const _isEmpty = require('lodash/isEmpty');
// eslint-disable-next-line no-underscore-dangle
const _keys = require('lodash/keys');
// eslint-disable-next-line no-underscore-dangle
const _pull = require('lodash/pull');
// eslint-disable-next-line no-underscore-dangle
const _concat = require('lodash/concat');

// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
// eslint-disable-next-line import/no-extraneous-dependencies
const dataStub = require('common/stubs/data');


const { should } = require('../../utils/test');
const { addToTestQueue, getMessage, resetMessage, flushTestQueue } = require('../../utils/testWebSocket');
const flattenDataId = require('../../utils/flattenDataId');
const registeredQueries = require('../../utils/registeredQueries');
const registeredCallbacks = require('../../utils/registeredCallbacks');

const connectedDataModel = require('../../models/connectedData');
const { clearFactory, addTimebasedDataModel } = require('../../models/timebasedDataFactory');
const subscriptionsModel = require('../../models/subscriptions');

const { timebasedQuery } = require('./onTimebasedQuery');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls = _concat(calls, payload);
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

describe('controllers/client/onTimebasedQuery', () => {
  beforeEach(() => {
    registeredQueries.clear();
    registeredCallbacks.clear();
    connectedDataModel.cleanup();
    clearFactory();
    subscriptionsModel.cleanup();
    resetMessage();
    calls.length = 0;
  });

  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);
  const remoteId = dataStub.getRemoteId(dataId);
  const interval = [1, 10];
  const intervalProto = dataStub.getTimeIntervalProtobuf({
    startTime: { ms: 1 },
    endTime: { ms: 10 },
  });
  const halfIntervalProto = dataStub.getTimeIntervalProtobuf({
    startTime: { ms: 1 },
    endTime: { ms: 5 },
  });
  /* const filter1 = {
    fieldName: 'extractedValue',
    type: globalConstants.FILTERTYPE_GT,
    fieldValue: 42,
  };
  const filter2 = {
    fieldName: 'groundDate',
    type: globalConstants.FILTERTYPE_EQ,
    fieldValue: 42,
  };
  const filterProto1 = dataStub.getFilterProtobuf(filter1);
  const filterProto2 = dataStub.getFilterProtobuf(filter2); */

  const queryArguments = dataStub.getQueryArguments();
  const lastQueryArguments = Object.assign(
    {},
    queryArguments,
    { getLastType: globalConstants.GETLASTTYPE_GET_LAST }
  );
  const filters = queryArguments.filters;
  const queryArgumentsProto = dataStub.getQueryArgumentsProtobuf(queryArguments);
  const lastQueryArgumentsProto = dataStub.getQueryArgumentsProtobuf(lastQueryArguments);

  const rp = dataStub.getReportingParameter();
  const t1 = 3;
  const t2 = 5;

  const payloads = [
    { timestamp: t1, payload: rp },
    { timestamp: t2, payload: rp },
  ];

  const lastQuery = {
    [remoteId]: {
      type: globalConstants.DATASTRUCTURETYPE_LAST,
      dataId,
      intervals: [interval],
      filters,
    },
  };
  const rangeQuery = {
    [remoteId]: {
      type: globalConstants.DATASTRUCTURETYPE_RANGE,
      dataId,
      intervals: [interval],
      filters,
    },
  };

  describe('LAST', () => {
    it('interval not missing', () => {
      // init test
      subscriptionsModel.addRecord(dataId);
      connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_LAST, remoteId, dataId);
      connectedDataModel.addRequestedInterval(remoteId, 'queryId', interval);
      const timebasedDataModel = addTimebasedDataModel(remoteId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      timebasedQuery(addToTestQueue, lastQuery, zmqEmulator);
      // check registeredQueries
      _isEmpty(registeredQueries.getAll()).should.equal(true);
      // check registeredCallbacks
      _isEmpty(registeredCallbacks.getAll()).should.equal(true);
      // check zmq messages
      calls.length.should.equal(0);
      // check ws messages
      flushTestQueue();
      getMessage().should.have.properties({
        event: 'timebasedData',
        payload: {
          [remoteId]: {
            [payloads[0].timestamp]: payloads[0].payload,
            [payloads[1].timestamp]: payloads[1].payload,
          },
        },
      });
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURETYPE_LAST,
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
        filters: { [remoteId]: filters },
      });
    });

    it('interval missing', () => {
      // init test
      const otherQueryId = 'otherId';
      const otherInterval = [5, 42];
      subscriptionsModel.addRecord(dataId);
      connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_LAST, remoteId, dataId);
      connectedDataModel.addRequestedInterval(remoteId, otherQueryId, otherInterval);
      const timebasedDataModel = addTimebasedDataModel(remoteId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      timebasedQuery(addToTestQueue, lastQuery, zmqEmulator);
      // check registeredQueries
      const queryIds = _keys(registeredQueries.getAll());
      queryIds.length.should.equal(1);
      const queryId = queryIds[0];
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      calls.length.should.equal(5);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(intervalProto);
      calls[4].should.have.properties(lastQueryArgumentsProto);
      // check ws messages
      flushTestQueue();
      getMessage().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURETYPE_LAST,
        remoteId,
        intervals: {
          all: [otherInterval, interval],
          requested: { [otherQueryId]: otherInterval, [queryId]: interval },
          received: [],
        },
      });
      // check subscriptionsModel
      subscriptionsModel.count().should.equal(1);
      const subscriptions = subscriptionsModel.find();
      subscriptions[0].should.have.properties({
        flatDataId: flattenDataId(dataId),
        dataId,
        filters: { [remoteId]: filters },
      });
    });

    it('dataId not in subscriptions', () => {
      // init test
      const timebasedDataModel = addTimebasedDataModel(remoteId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      timebasedQuery(addToTestQueue, lastQuery, zmqEmulator);
      // check registeredQueries
      const queryIds = _keys(registeredQueries.getAll());
      queryIds.length.should.equal(1);
      const queryId = queryIds[0];
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      const callbackIds = _keys(registeredCallbacks.getAll());
      callbackIds.length.should.equal(2);
      const subId = _pull(callbackIds, queryId)[0];
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      const subIdProto = dataStub.getStringProtobuf(subId);
      calls.length.should.equal(9);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(intervalProto);
      calls[4].should.have.properties(lastQueryArgumentsProto);
      calls[5].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
      calls[6].should.have.properties(subIdProto);
      calls[7].should.have.properties(dataIdProto);
      calls[8].should.have.properties(dataStub.getAddActionProtobuf());
      // check ws messages
      flushTestQueue();
      getMessage().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURETYPE_LAST,
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
        filters: { [remoteId]: filters },
      });
    });
  });

  describe('RANGE', () => {
    it('no missing intervals', () => {
      // init test
      subscriptionsModel.addRecord(dataId);
      connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_RANGE, remoteId, dataId);
      connectedDataModel.addRequestedInterval(remoteId, 'queryId', interval);
      const timebasedDataModel = addTimebasedDataModel(remoteId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      timebasedQuery(addToTestQueue, rangeQuery, zmqEmulator);
      // check registeredQueries
      _isEmpty(registeredQueries.getAll()).should.equal(true);
      // check registeredCallbacks
      _isEmpty(registeredCallbacks.getAll()).should.equal(true);
      // check zmq messages
      calls.length.should.equal(0);
      // check ws messages
      flushTestQueue();
      getMessage().should.have.properties({
        event: 'timebasedData',
        payload: {
          [remoteId]: {
            [payloads[0].timestamp]: payloads[0].payload,
            [payloads[1].timestamp]: payloads[1].payload,
          },
        },
      });
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURETYPE_RANGE,
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
        filters: { [remoteId]: filters },
      });
    });

    it('all intervals missing', () => {
      // init test
      const otherQueryId = 'otherId';
      const otherInterval = [42, 99];
      subscriptionsModel.addRecord(dataId);
      connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_RANGE, remoteId, dataId);
      connectedDataModel.addRequestedInterval(remoteId, otherQueryId, otherInterval);
      const timebasedDataModel = addTimebasedDataModel(remoteId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      timebasedQuery(addToTestQueue, rangeQuery, zmqEmulator);
      // check registeredQueries
      const queryIds = _keys(registeredQueries.getAll());
      queryIds.length.should.equal(1);
      const queryId = queryIds[0];
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      calls.length.should.equal(5);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(intervalProto);
      calls[4].should.have.properties(queryArgumentsProto);
      // check ws messages
      flushTestQueue();
      getMessage().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURETYPE_RANGE,
        remoteId,
        intervals: {
          all: [interval, otherInterval],
          requested: { [queryId]: interval, [otherQueryId]: otherInterval },
          received: [],
        },
      });
      // check subscriptionsModel
      subscriptionsModel.count().should.equal(1);
      const subscriptions = subscriptionsModel.find();
      subscriptions[0].should.have.properties({
        flatDataId: flattenDataId(dataId),
        dataId,
        filters: { [remoteId]: filters },
      });
    });

    it('some missing intervals', () => {
      // init test
      subscriptionsModel.addRecord(dataId);
      connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_RANGE, remoteId, dataId);
      connectedDataModel.addRequestedInterval(remoteId, 'myQueryId', [5, 10]);
      const timebasedDataModel = addTimebasedDataModel(remoteId);
      timebasedDataModel.addRecord(payloads[1].timestamp, payloads[1].payload);
      // launch test
      timebasedQuery(addToTestQueue, rangeQuery, zmqEmulator);
      // check registeredQueries
      const queryIds = _keys(registeredQueries.getAll());
      queryIds.length.should.equal(1);
      const queryId = queryIds[0];
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      calls.length.should.equal(5);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(halfIntervalProto);
      calls[4].should.have.properties(queryArgumentsProto);
      // check ws messages
      flushTestQueue();
      getMessage().should.have.properties({
        event: 'timebasedData',
        payload: {
          [remoteId]: {
            [payloads[1].timestamp]: payloads[1].payload,
          },
        },
      });
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURETYPE_RANGE,
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
        filters: { [remoteId]: filters },
      });
    });

    it('dataId not in subscriptions', () => {
      // init test
      const timebasedDataModel = addTimebasedDataModel(remoteId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      timebasedQuery(addToTestQueue, rangeQuery, zmqEmulator);
      // check registeredQueries
      const queryIds = _keys(registeredQueries.getAll());
      queryIds.length.should.equal(1);
      const queryId = queryIds[0];
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      const callbackIds = _keys(registeredCallbacks.getAll());
      callbackIds.length.should.equal(2);
      const subId = _pull(callbackIds, queryId)[0];
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      const subIdProto = dataStub.getStringProtobuf(subId);
      calls.length.should.equal(9);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(intervalProto);
      calls[4].should.have.properties(queryArgumentsProto);
      calls[5].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
      calls[6].should.have.properties(subIdProto);
      calls[7].should.have.properties(dataIdProto);
      calls[8].should.have.properties(dataStub.getAddActionProtobuf());
      // check ws messages
      flushTestQueue();
      getMessage().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURETYPE_RANGE,
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
        filters: { [remoteId]: filters },
      });
    });
  });
});
