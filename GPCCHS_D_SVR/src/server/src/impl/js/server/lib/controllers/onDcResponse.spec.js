const { should } = require('../utils/test');
const { getDcResponseProtobuf } = require('../stubs/data');
const onDcResponse = require('./onDcResponse');
const registeredCallbacks = require('../utils/registeredCallbacks');

describe('onDcResponse', () => {
  beforeEach(() => {
    registeredCallbacks.clear();
  });

  const ok = getDcResponseProtobuf({
    id: 'myId',
    status: 0, // 'OK',
    reason: null,
  });
  const warn = getDcResponseProtobuf({
    id: 'myId',
    status: 2, // 'WARNING',
    reason: 'My reason',
  });
  const error = getDcResponseProtobuf({
    id: 'myId',
    status: 1, // 'ERROR',
    reason: 'My reason',
  });

  it('works', () => {
    let called = false;
    registeredCallbacks.set('myId', (err) => {
      should.not.exist(err);
      called = true;
    });
    onDcResponse(ok);
    called.should.equal(true);
  });
  it('unknown id', () => {
    const message = getDcResponseProtobuf(ok);
    (() => onDcResponse(message)).should.throw(Error);
  });
  it('warning status', () => {
    let called = false;
    registeredCallbacks.set('myId', (err) => {
      err.should.be.an('error');
      err.message.should.equal('My reason');
      called = true;
    });
    onDcResponse(warn);
    called.should.equal(true);
  });
  it('error status', () => {
    let called = false;
    registeredCallbacks.set('myId', (err) => {
      err.should.be.an('error');
      err.message.should.equal('My reason');
      called = true;
    });
    onDcResponse(error);
    called.should.equal(true);
  });
});
