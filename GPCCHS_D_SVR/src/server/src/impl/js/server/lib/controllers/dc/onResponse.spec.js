const { should } = require('../../utils/test');
const dataStub = require('../../stubs/data');
const { response } = require('./onResponse');
const registeredCallbacks = require('../../utils/registeredCallbacks');

const { sendToTestWs, getMessage, resetMessage } = require('../../stubs/testWebSocket');

describe('onResponse', () => {
  beforeEach(() => {
    registeredCallbacks.clear();
    resetMessage();
  });

  const myQueryId = 'myQueryId';
  const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
  const successProto = dataStub.getSuccessStatusProtobuf();
  const errorProto = dataStub.getErrorStatusProtobuf();
  const reason = 'My Reason';
  const reasonProto = dataStub.getStringProtobuf(reason);

  it('works', () => {
    let called = false;
    registeredCallbacks.set(myQueryId, (err) => {
      should.not.exist(err);
      called = true;
    });
    response(sendToTestWs, myQueryIdProto, successProto);
    getMessage().should.deep.equal({});
    called.should.equal(true);
  });
  it('unknown id', () => {
    (() => response(sendToTestWs, myQueryIdProto, successProto)).should.throw(Error);
    getMessage().should.deep.equal({});
  });
  it('error status', () => {
    let called = false;
    registeredCallbacks.set(myQueryId, (err) => {
      err.should.be.an('error');
      err.message.should.equal(reason);
      called = true;
    });
    response(sendToTestWs, myQueryIdProto, errorProto, reasonProto);
    const responseError = getMessage();
    responseError.should.be.an('object')
      .that.has.properties({
        event: 'responseError',
        payload: reason,
      });
    called.should.equal(true);
  });
});
