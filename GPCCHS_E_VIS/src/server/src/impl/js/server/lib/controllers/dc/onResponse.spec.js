const { should, testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const dataStub = require('common/stubs/data');
const { response } = require('./onResponse');
const registeredCallbacks = require('common/callbacks');
const globalConstants = require('common/constants');

describe('controllers/dc/onResponse', () => {
  beforeEach(() => {
    registeredCallbacks.clear();
    resetTestHandlerArgs();
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
    response(testHandler, myQueryIdProto, successProto);
    getTestHandlerArgs().should.have.lengthOf(0);
    called.should.equal(true);
  });
  it('error status', () => {
    let called = false;
    registeredCallbacks.set(myQueryId, (err) => {
      err.should.be.an('error');
      err.message.should.equal(reason);
      called = true;
    });
    response(testHandler, myQueryIdProto, errorProto, reasonProto);
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(globalConstants.EVENT_ERROR);
    wsArgs[1].should.have.properties({
      type: globalConstants.ERRORTYPE_RESPONSE,
      reason,
    });
    called.should.equal(true);
  });
});
