const _isEmpty = require('lodash/isEmpty');
const _keys = require('lodash/keys');
const _pull = require('lodash/pull');
const _concat = require('lodash/concat');

const globalConstants = require('common/constants');
const dataStub = require('common/stubs/data');

const { should } = require('../../utils/test');
const { get: getQueue /* , reset: resetQueue */} = require('../../models/dataQueue');
const {
  cleanup: cleanRegisteredQueries,
  getAll: getAllRegisteredQueries,
} = require('../../models/registeredQueries');
const registeredCallbacks = require('common/callbacks');

const connectedDataModel = require('../../models/connectedData');
// const { clearFactory } = require('../../models/timebasedDataFactory');

const onTimebasedQuery = require('./onTimebasedQuery');

let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

/**
 * onTimebasedPubSubData test
 *
 * - check registerQueries for the queryId
 * - check registerQueries for the queryId
 * - check zmq messages for both timebasedQuery and timebasedSubscription if needed
 * - check connectedDataModel for requested interval
 * - check subscriptionsModel for dataId and flatDataIds
 * - check ws messages for timebasedData
 *
 */

describe('controllers/client/onTimebasedQuery', () => {
  beforeEach(() => {
    cleanRegisteredQueries();
    registeredCallbacks.clear();
    connectedDataModel.cleanup();
    // resetQueue();
    calls.length = 0;
  });

  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);
  const flatDataId = dataStub.getRemoteId(dataId);
  const intervalRange = [1, 5];
  const intervalLast = [1, 10];
  const intervalRangeProto = dataStub.getTimeIntervalProtobuf({
    startTime: { ms: 1 },
    endTime: { ms: 5 },
  });
  const intervalLastProto = dataStub.getTimeIntervalProtobuf({
    startTime: { ms: 1 },
    endTime: { ms: 10 },
  });
  const lastQueryArguments = Object.assign(
    {},
    dataStub.getQueryArguments(),
    { getLastType: globalConstants.GETLASTTYPE_GET_LAST }
  );
  const lastQueryArgumentsProto = dataStub.getQueryArgumentsProtobuf(lastQueryArguments);
  const queryArgumentsProto = dataStub.getQueryArgumentsProtobuf(dataStub.getQueryArguments());
  //
  // const rp = dataStub.getReportingParameter();
  // const t1 = 3;
  // const t2 = 5;
  //
  // const payloads = [
  //   { timestamp: t1, payload: rp },
  //   { timestamp: t2, payload: rp },
  // ];

  const queryRange = {
    [flatDataId]: {
      dataId,
      last: [],
      range: [intervalRange],
    },
  };
  const queryLast = {
    [flatDataId]: {
      dataId,
      last: [intervalLast],
      range: [],
    },
  };
  const query = {
    [flatDataId]: {
      dataId,
      last: [intervalLast],
      range: [intervalRange],
    },
  };

  it('should not crash when receiving an invalid payload', () => {
    onTimebasedQuery(zmqEmulator, {});
    _isEmpty(getAllRegisteredQueries()).should.equal(true);
    _isEmpty(registeredCallbacks.getAll()).should.equal(true);
    calls.length.should.equal(0);
    getQueue().should.eql({});
    onTimebasedQuery(zmqEmulator, { queries: {} });
    _isEmpty(getAllRegisteredQueries()).should.equal(true);
    _isEmpty(registeredCallbacks.getAll()).should.equal(true);
    calls.length.should.equal(0);
    getQueue().should.eql({});
    onTimebasedQuery(zmqEmulator, { queries: { string: 'text' } });
    _isEmpty(getAllRegisteredQueries()).should.equal(true);
    _isEmpty(registeredCallbacks.getAll()).should.equal(true);
    calls.length.should.equal(0);
    getQueue().should.eql({});
  });

  describe('query', () => {
    it('range interval not missing', () => {
      // init test
      connectedDataModel.addRecord(dataId);
      connectedDataModel.addRequestedInterval(flatDataId, 'queryId', intervalRange);
      // const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
      // timebasedDataModel.addRecords(payloads);
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: queryRange });
      // check registeredQueries
      _isEmpty(getAllRegisteredQueries()).should.equal(true);
      // check registeredCallbacks
      _isEmpty(registeredCallbacks.getAll()).should.equal(true);
      // check zmq messages
      calls.length.should.equal(0);
      // check ws messages
      // --> data pull
      // getQueue().should.have.properties({
      //   [flatDataId]: {
      //     [payloads[1].timestamp]: payloads[1].payload,
      //   },
      // });
      // Object.keys(getQueue()[flatDataId]).should.have.lengthOf(2);
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        flatDataId,
        intervals: {
          all: [intervalRange],
          requested: { queryId: intervalRange },
          received: [],
        },
      });
    });

    it('range interval missing', () => {
      // init test
      const otherQueryId = 'otherId';
      const otherInterval = [5, 42];
      connectedDataModel.addRecord(dataId);
      connectedDataModel.addRequestedInterval(flatDataId, otherQueryId, otherInterval);
      // const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
      // timebasedDataModel.addRecords(payloads);
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: queryRange });
      // check registeredQueries
      const queryIds = getAllRegisteredQueries();
      queryIds.length.should.equal(1);
      const queryId = queryIds[0].queryId;
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      calls.length.should.equal(5);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(intervalRangeProto);
      calls[4].should.have.properties(queryArgumentsProto);
      // check ws messages
      // getQueue().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        flatDataId,
        dataId,
        intervals: {
          all: [[1, 42]],
          requested: { [otherQueryId]: otherInterval, [queryId]: intervalRange },
          received: [],
        },
      });
    });
    it('getLast', () => {
      // init test
      connectedDataModel.addRecord(dataId);
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: queryLast });
      // check registeredQueries
      const queryIds = getAllRegisteredQueries();
      queryIds.length.should.equal(1);
      const queryId = queryIds[0].queryId;
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      calls.length.should.equal(5);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(intervalLastProto);
      calls[4].should.have.properties(lastQueryArgumentsProto);
      // check ws messages
      // getQueue().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        flatDataId,
        dataId,
        intervals: {
          all: [],
          requested: { },
          received: [],
        },
      });
    });
    it('dataId not in subscriptions (last + range)', () => {
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: query });
      // check registeredQueries
      const queryIds = getAllRegisteredQueries();
      queryIds.length.should.equal(2);
      const queryId0 = queryIds[0].queryId;
      const queryId1 = queryIds[1].queryId;
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId0));
      should.exist(registeredCallbacks.get(queryId1));
      const callbackIds = _keys(registeredCallbacks.getAll());
      callbackIds.length.should.equal(3);
      const subId0 = _pull(callbackIds, queryId0)[0];
      // check zmq messages
      const queryIdProto0 = dataStub.getStringProtobuf(queryId0);
      const queryIdProto1 = dataStub.getStringProtobuf(queryId1);
      const subIdProto0 = dataStub.getStringProtobuf(subId0);
      calls.length.should.equal(14);
      calls[0].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
      calls[1].should.have.properties(subIdProto0);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(dataStub.getAddActionProtobuf());
      calls[4].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[5].should.have.properties(queryIdProto0);
      calls[6].should.have.properties(dataIdProto);
      calls[7].should.have.properties(intervalLastProto);
      calls[8].should.have.properties(lastQueryArgumentsProto);
      calls[9].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[10].should.have.properties(queryIdProto1);
      calls[11].should.have.properties(dataIdProto);
      calls[12].should.have.properties(intervalRangeProto);
      calls[13].should.have.properties(queryArgumentsProto);
      // check ws messages
      // getQueue().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        flatDataId,
        intervals: {
          all: [intervalRange],
          requested: { [queryId1]: intervalRange },
          received: [],
        },
      });
    });
  });
});
