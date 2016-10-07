const { should } = require('../../utils/test');
const dataStub = require('../../stubs/data');
const { response } = require('./onResponse');
const registeredCallbacks = require('../../utils/registeredCallbacks');

const TestWebSocket = require('../../stubs/testWebSocket');

const testWebsocket = new TestWebSocket();
testWebsocket.init();
const spark = testWebsocket.getSpark();

describe('onResponse', () => {
  beforeEach(() => {
    registeredCallbacks.clear();
    spark.resetMessage();
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
    response(spark, myQueryIdProto, successProto);
    spark.getMessage().should.deep.equal({});
    called.should.equal(true);
  });
  it('unknown id', () => {
    (() => response(spark, myQueryIdProto, successProto)).should.throw(Error);
    spark.getMessage().should.deep.equal({});
  });
  it('error status', () => {
    let called = false;
    registeredCallbacks.set(myQueryId, (err) => {
      err.should.be.an('error');
      err.message.should.equal(reason);
      called = true;
    });
    response(spark, myQueryIdProto, errorProto, reasonProto);
    const responseError = spark.getMessage();
    responseError.should.be.an('object')
      .that.has.properties({
        event: 'responseError',
        payload: reason,
      });
    called.should.equal(true);
  });
});
