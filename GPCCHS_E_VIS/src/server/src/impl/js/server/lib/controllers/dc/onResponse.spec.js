const { should } = require('../../utils/test');
// eslint-disable-next-line import/no-extraneous-dependencies
const dataStub = require('common/stubs/data');
const { response } = require('./onResponse');
// eslint-disable-next-line import/no-extraneous-dependencies
const registeredCallbacks = require('common/callbacks/register');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
const { sendToTestWs, getMessage, resetMessage } = require('../../utils/testWebSocket');

describe('controllers/dc/onResponse', () => {
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
        event: 'error',
        payload: {
          type: globalConstants.ERRORTYPE_RESPONSE,
          reason,
        },
      });
    called.should.equal(true);
  });
});
