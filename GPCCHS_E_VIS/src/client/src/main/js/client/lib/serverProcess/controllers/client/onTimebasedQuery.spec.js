const _isEmpty = require('lodash/isEmpty');
const _keys = require('lodash/keys');
const _pull = require('lodash/pull');
const _concat = require('lodash/concat');
const globalConstants = require('common/constants');
const dataStub = require('common/protobuf/stubs');

const { should } = require('../../utils/test');
const { get: getQueue } = require('../../models/dataQueue');
const {
  cleanup: cleanRegisteredQueries,
  getAll: getAllRegisteredQueries,
} = require('../../models/registeredQueries');
const registeredCallbacks = require('../../../utils/callbacks');
const connectedDataModel = require('../../models/connectedData');


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
    expect(_isEmpty(getAllRegisteredQueries())).toBe(true);
    expect(_isEmpty(registeredCallbacks.getAll())).toBe(true);
    expect(calls.length).toBe(0);
    expect(getQueue()).toEqual({});
    onTimebasedQuery(zmqEmulator, { queries: {} });
    expect(_isEmpty(getAllRegisteredQueries())).toBe(true);
    expect(_isEmpty(registeredCallbacks.getAll())).toBe(true);
    expect(calls.length).toBe(0);
    expect(getQueue()).toEqual({});
    onTimebasedQuery(zmqEmulator, { queries: { string: 'text' } });
    expect(_isEmpty(getAllRegisteredQueries())).toBe(true);
    expect(_isEmpty(registeredCallbacks.getAll())).toBe(true);
    expect(calls.length).toBe(0);
    expect(getQueue()).toEqual({});
  });

  describe('query', () => {
    it('range interval not missing', () => {
      // init test
      connectedDataModel.addRecord(dataId);
      connectedDataModel.addRequestedInterval(flatDataId, 'queryId', intervalRange);

      // launch test
      onTimebasedQuery(zmqEmulator, { queries: queryRange });
      // check registeredQueries
      expect(_isEmpty(getAllRegisteredQueries())).toBe(true);
      // check registeredCallbacks
      expect(_isEmpty(registeredCallbacks.getAll())).toBe(true);
      // check zmq messages
      expect(calls.length).toBe(0);
      // check connectedDataModel
      expect(connectedDataModel.count()).toBe(1);
      const connectedData = connectedDataModel.find();
      expect(connectedData[0]).have.properties({
        flatDataId,
        intervals: {
          all: [intervalRange],
          requested: { queryId: intervalRange },
          received: [],
        },
        lastQueries: {},
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
      expect(queryIds.length).toBe(1);
      const queryId = queryIds[0].queryId;
      // check registeredCallbacks
      expect(registeredCallbacks.get(queryId)).toBeDefined();
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      expect(calls.length).toBe(5);
      expect(calls[0]).have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      expect(calls[1]).have.properties(queryIdProto);
      expect(calls[2]).have.properties(dataIdProto);
      expect(calls[3]).have.properties(intervalRangeProto);
      expect(calls[4]).have.properties(queryArgumentsProto);
      // check connectedDataModel
      expect(connectedDataModel.count()).toBe(1);
      const connectedData = connectedDataModel.find();
      expect(connectedData[0]).have.properties({
        flatDataId,
        dataId,
        intervals: {
          all: [[1, 42]],
          requested: { [otherQueryId]: otherInterval, [queryId]: intervalRange },
          received: [],
        },
        lastQueries: {},
      });
    });
    it('getLast', () => {
      // init test
      connectedDataModel.addRecord(dataId);
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: queryLast });
      // check registeredQueries
      const queryIds = getAllRegisteredQueries();
      expect(queryIds.length).toBe(1);
      const queryId = queryIds[0].queryId;
      // check registeredCallbacks
      expect(registeredCallbacks.get(queryId)).toBeDefined();
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      expect(calls.length).toBe(5);
      expect(calls[0]).have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      expect(calls[1]).have.properties(queryIdProto);
      expect(calls[2]).have.properties(dataIdProto);
      expect(calls[3]).have.properties(intervalLastProto);
      expect(calls[4]).have.properties(lastQueryArgumentsProto);
      // check ws messages
      // getQueue().should.have.properties({});
      // check connectedDataModel
      expect(connectedDataModel.count()).toBe(1);
      const connectedData = connectedDataModel.find();
      expect(connectedData[0]).have.properties({
        flatDataId,
        dataId,
        intervals: {
          all: [],
          requested: { },
          received: [],
        },
        lastQueries: { [queryId]: intervalLast },
      });
    });
    it('dataId not in subscriptions (last + range)', () => {
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: query });
      // check registeredQueries
      const queryIds = getAllRegisteredQueries();
      expect(queryIds.length).toBe(2);
      const queryId0 = queryIds[0].queryId;
      const queryId1 = queryIds[1].queryId;
      // check registeredCallbacks
      expect(registeredCallbacks.get(queryId0)).toBeDefined();
      expect(registeredCallbacks.get(queryId1)).toBeDefined();
      const callbackIds = _keys(registeredCallbacks.getAll());
      expect(callbackIds.length).toBe(3);
      const subId0 = _pull(callbackIds, queryId0)[0];
      // check zmq messages
      const queryIdProto0 = dataStub.getStringProtobuf(queryId0);
      const queryIdProto1 = dataStub.getStringProtobuf(queryId1);
      const subIdProto0 = dataStub.getStringProtobuf(subId0);
      expect(calls.length).toBe(14);
      expect(calls[0]).have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
      expect(calls[1]).have.properties(subIdProto0);
      expect(calls[2]).have.properties(dataIdProto);
      expect(calls[3]).have.properties(dataStub.getAddActionProtobuf());
      expect(calls[4]).have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      expect(calls[5]).have.properties(queryIdProto0);
      expect(calls[6]).have.properties(dataIdProto);
      expect(calls[7]).have.properties(intervalLastProto);
      expect(calls[8]).have.properties(lastQueryArgumentsProto);
      expect(calls[9]).have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      expect(calls[10]).have.properties(queryIdProto1);
      expect(calls[11]).have.properties(dataIdProto);
      expect(calls[12]).have.properties(intervalRangeProto);
      expect(calls[13]).have.properties(queryArgumentsProto);
      // check ws messages
      // getQueue().should.have.properties({});
      // check connectedDataModel
      expect(connectedDataModel.count()).toBe(1);
      const connectedData = connectedDataModel.find();
      expect(connectedData[0]).have.all.properties({
        flatDataId,
        intervals: {
          all: [intervalRange],
          requested: { [queryId1]: intervalRange },
          received: [],
        },
        lastQueries: { [queryId0]: intervalLast },
      });
    });
  });
});
