const { should } = require('./test');
const { resetQueryId, createQueryMessage } = require('./queries');
const globalConstants = require('common/constants');
const dataStub = require('common/protobuf/stubs');

const {
  clear: cleanRegisteredCallbacks,
  get: getRegisteredCallback,
} = require('../../utils/callbacks');
const {
  getByQueryId: getRegisteredQuery,
  cleanup: cleanRegisteredQueries,
 } = require('../models/registeredQueries');
const { resetTestHandlerArgs } = require('./test');

const testExecutionHandler = {
  start: () => {},
  stop: () => {},
};

describe('utils/subscriptions', () => {
  beforeEach(() => {
    resetQueryId();
    resetTestHandlerArgs();
    cleanRegisteredCallbacks();
    cleanRegisteredQueries();
  });

  it('createQueryMessage range', () => {
    const myDataId = dataStub.getDataId();
    const myDataIdProto = dataStub.getDataIdProtobuf(myDataId);
    const myRemoteId = dataStub.getRemoteId(myDataId);
    const myInterval = [0, 10];
    const queryArgumentsProto = dataStub.getQueryArgumentsProtobuf(dataStub.getQueryArguments());
    const query1 = 'query1';

    const { args, queryId } =
      createQueryMessage(myRemoteId, myDataId, myInterval, {}, testExecutionHandler);

    queryId.should.equal(query1);

    args.should.have.lengthOf(5);
    args[0].should.eql(dataStub.getTimebasedQueryHeaderProtobuf());
    args[1].should.eql(dataStub.getStringProtobuf(query1));
    args[2].should.eql(myDataIdProto);
    args[3].should.eql(dataStub.getTimeIntervalProtobuf({
      startTime: { ms: myInterval[0] },
      endTime: { ms: myInterval[1] },
    }));
    args[4].should.eql(queryArgumentsProto);

    should.exist(getRegisteredCallback(query1));
    getRegisteredQuery(query1).should.eql(myRemoteId);
  });
  it('createQueryMessage last', () => {
    const myDataId = dataStub.getDataId();
    const myDataIdProto = dataStub.getDataIdProtobuf(myDataId);
    const myRemoteId = dataStub.getRemoteId(myDataId);
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

    queryId.should.equal(query);

    args.should.have.lengthOf(5);
    args[0].should.eql(dataStub.getTimebasedQueryHeaderProtobuf());
    args[1].should.eql(dataStub.getStringProtobuf(query));
    args[2].should.eql(myDataIdProto);
    args[3].should.eql(dataStub.getTimeIntervalProtobuf({
      startTime: { ms: myInterval[0] },
      endTime: { ms: myInterval[1] },
    }));
    args[4].should.eql(lastQueryArgumentsProto);

    should.exist(getRegisteredCallback(query));
    getRegisteredQuery(query).should.eql(myRemoteId);
  });
});
