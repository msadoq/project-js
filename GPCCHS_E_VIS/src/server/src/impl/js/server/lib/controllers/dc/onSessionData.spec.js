require('../../utils/test');
const { sessionData } = require('./onSessionData');
// eslint-disable-next-line import/no-extraneous-dependencies
const dataStub = require('common/stubs/data');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
const { sendToTestWs, getMessage, resetMessage } = require('../../utils/testWebSocket');
const registeredCallbacks = require('../../utils/registeredCallbacks');

describe('controllers/dc/onSessionData', () => {
  beforeEach(() => {
    resetMessage();
  });

  it('not queried', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySession = dataStub.getSession({ name: 'Session#666' });
    const mySessionProto = dataStub.getSessionProtobuf(mySession);
    // launch test
    sessionData(sendToTestWs, myQueryIdProto, mySessionProto);
    getMessage().should.deep.equal({});
  });

  it('works', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySessions = dataStub.getSessions();
    const mySessionsProto = dataStub.getSessionsProtobuf(mySessions);
    registeredCallbacks.set(myQueryId, () => {});
    // launch test
    sessionData(sendToTestWs, myQueryIdProto, mySessionsProto);
    // check data
    const domains = getMessage();
    domains.should.be.an('object');
    domains.should.have.an.property('event')
      .that.equal(globalConstants.EVENT_SESSION_DATA);
    domains.should.have.an.property('payload')
      .that.is.an('array')
      .that.have.properties(mySessions.session);
  });
});
