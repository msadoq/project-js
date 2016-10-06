const { should } = require('../../utils/test');
const { getDcResponseProtobuf } = require('../../stubs/data');
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

  const ok = getDcResponseProtobuf({
    id: 'myId',
    status: 0, // OK
    reason: null,
  });
  const error = getDcResponseProtobuf({
    id: 'myId',
    status: 1, // ERROR
    reason: 'My reason',
  });

  it('works', () => {
    let called = false;
    registeredCallbacks.set('myId', (err) => {
      should.not.exist(err);
      called = true;
    });
    response(spark, ok);
    spark.getMessage().should.deep.equal({});
    called.should.equal(true);
  });
  it('unknown id', () => {
    const message = getDcResponseProtobuf(ok);
    (() => response(message)).should.throw(Error);
    spark.getMessage().should.deep.equal({});
  });
  it('error status', () => {
    let called = false;
    registeredCallbacks.set('myId', (err) => {
      err.should.be.an('error');
      err.message.should.equal('My reason');
      called = true;
    });
    response(spark, error);
    const responseError = spark.getMessage();
    responseError.should.be.an('object')
      .that.has.properties({
        event: 'responseError',
        payload: 'My reason',
      });
    called.should.equal(true);
  });
});
