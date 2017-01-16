const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const { sessionData } = require('./onSessionsData');
const dataStub = require('common/stubs/data');
const globalConstants = require('common/constants');
const registeredCallbacks = require('common/callbacks');

describe('controllers/dc/onSessionData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });

  it('not queried', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySessions = dataStub.getSessions();
    const mySessionsProto = dataStub.getSessionsProtobuf(mySessions);
    // launch test
    sessionData(testHandler, myQueryIdProto, mySessionsProto);
    getTestHandlerArgs().should.have.lengthOf(0);
  });

  it('works', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySessions = dataStub.getSessions();
    const mySessionsProto = dataStub.getSessionsProtobuf(mySessions);
    registeredCallbacks.set(myQueryId, () => {});
    // launch test
    sessionData(testHandler, myQueryIdProto, mySessionsProto);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(3);
    wsArgs[0].should.equal(globalConstants.EVENT_SESSION_DATA);
    wsArgs[1].should.be.an('array')
      .that.have.properties(mySessions.session);
    wsArgs[2].should.equal(myQueryId);
  });
});
