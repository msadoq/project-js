const { getRemoteId, registerProtobuf } = require('../../common/test');

registerProtobuf();

const { resetQueryId, createQueryMessage } = require('./queries');
const globalConstants = require('../../constants');
const dataStub = require('common/protobuf/stubs');

const {
  clear: cleanRegisteredCallbacks,
  get: getRegisteredCallback,
} = require('../../common/callbacks');
const {
  getByQueryId: getRegisteredQuery,
  cleanup: cleanRegisteredQueries,
 } = require('../models/registeredQueries');

const testExecutionHandler = {
  start: () => {},
  stop: () => {},
};


describe('utils/subscriptions', () => {
  beforeEach(() => {
    resetQueryId();
    cleanRegisteredCallbacks();
    cleanRegisteredQueries();
  });

  test('createQueryMessage range', () => {
    const myDataId = dataStub.getDataId();
    const myDataIdProto = dataStub.getDataIdProtobuf(myDataId);
    const myRemoteId = getRemoteId(myDataId);
    const myInterval = [0, 10];
    const queryArgumentsProto = dataStub.getQueryArgumentsProtobuf(dataStub.getQueryArguments());
    const query1 = 'query1';

    const { args, queryId } =
      createQueryMessage(myRemoteId, myDataId, myInterval, {}, testExecutionHandler);

    expect(queryId).toBe(query1);

    expect(args).toHaveLength(5);
    expect(args[0]).toEqual(dataStub.getTimebasedQueryHeaderProtobuf());
    expect(args[1]).toEqual(dataStub.getStringProtobuf(query1));
    expect(args[2]).toEqual(myDataIdProto);
    expect(args[3]).toEqual(dataStub.getTimeIntervalProtobuf({
      startTime: { ms: myInterval[0] },
      endTime: { ms: myInterval[1] },
    }));
    expect(args[4]).toEqual(queryArgumentsProto);

    expect(getRegisteredCallback(query1)).toBeDefined();
    expect(getRegisteredQuery(query1)).toEqual(myRemoteId);
  });
  test('createQueryMessage last', () => {
    const myDataId = dataStub.getDataId();
    const myDataIdProto = dataStub.getDataIdProtobuf(myDataId);
    const myRemoteId = getRemoteId(myDataId);
    const myInterval = [0, 10];
    const query = 'query1';
    const lastQueryArguments = Object.assign(
      {},
      dataStub.getQueryArguments(),
      { getLastType: globalConstants.GETLASTTYPE_GET_LAST }
    );
    const lastQueryArgumentsProto = dataStub.getQueryArgumentsProtobuf(lastQueryArguments);

    const { args, queryId } =
    createQueryMessage(myRemoteId, myDataId, myInterval, lastQueryArguments, testExecutionHandler);

    expect(queryId).toBe(query);

    expect(args).toHaveLength(5);
    expect(args[0]).toEqual(dataStub.getTimebasedQueryHeaderProtobuf());
    expect(args[1]).toEqual(dataStub.getStringProtobuf(query));
    expect(args[2]).toEqual(myDataIdProto);
    expect(args[3]).toEqual(dataStub.getTimeIntervalProtobuf({
      startTime: { ms: myInterval[0] },
      endTime: { ms: myInterval[1] },
    }));
    expect(args[4]).toEqual(lastQueryArgumentsProto);

    expect(getRegisteredCallback(query)).toBeDefined();
    expect(getRegisteredQuery(query)).toEqual(myRemoteId);
  });
});
