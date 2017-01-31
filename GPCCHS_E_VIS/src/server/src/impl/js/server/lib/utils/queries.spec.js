const { should } = require('../utils/test');
const { resetQueryId, createQueryMessage } = require('./queries');
const {
  clear: cleanRegisteredCallbacks,
  get: getRegisteredCallback,
} = require('common/callbacks');
const {
  cleanup: cleanRegisteredQueries,
  getByQueryId: getRegisteredQuery,
} = require('../models/registeredQueries');
const dataStub = require('common/stubs/data');
const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('./test');

const testExecutionHandler = {
  start: () => {},
  stop: () => {},
};

describe('utils/subscriptions', () => {
  beforeEach(() => {
    resetQueryId();
    resetTestHandlerArgs();
    cleanRegisteredCallbacks();
  });

  it('createQueryMessage', () => {
    const myDataId = dataStub.getDataId();
    const myDataIdProto = dataStub.getDataIdProtobuf(myDataId);
    const myRemoteId = dataStub.getRemoteId(myDataId);
    const myInterval = [0, 10];
    const myQueryArgs = dataStub.getQueryArguments();
    const myQueryArgsProto = dataStub.getQueryArgumentsProtobuf(myQueryArgs);

    const query1 = 'query1';

    const { args, queryId } =
      createQueryMessage(myRemoteId, myDataId, myInterval, myQueryArgs, testExecutionHandler);

    queryId.should.equal(query1);

    args.should.have.lengthOf(5);
    args[0].should.eql(dataStub.getTimebasedQueryHeaderProtobuf());
    args[1].should.eql(dataStub.getStringProtobuf(query1));
    args[2].should.eql(myDataIdProto);
    args[3].should.eql(dataStub.getTimeIntervalProtobuf({
      startTime: { ms: myInterval[0] },
      endTime: { ms: myInterval[1] },
    }));
    args[4].should.eql(myQueryArgsProto);

    should.exist(getRegisteredCallback(query1));
    getRegisteredQuery(query1).should.eql(myRemoteId);
  });
});
