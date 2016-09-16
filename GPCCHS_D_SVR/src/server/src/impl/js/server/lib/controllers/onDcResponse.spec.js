// const debug = require('../io/debug')('controllers:onDcResponse.spec');

require('../utils/test');
const {
  getDcResponse,
  getDcResponseProtobuf,
} = require('../stubs/data');
const {
  getDcResponseCallbacks,
  cleanDcResponseCallbacks,
  registerDcResponseCallbackOnHandler,
  onDcResponse,
} = require('./onDcResponse');

const testHandler = callback => callback();

describe('onDcResponse', () => {
  beforeEach(() => {
    cleanDcResponseCallbacks();
  });

  describe('registerDcResponseCallbackOnHandler', () => {
    it('one', () => {
      const myId = 'myId';
      const myCallback = i => i === 0;
      registerDcResponseCallbackOnHandler(testHandler, myId, myCallback);
      getDcResponseCallbacks().should.be.an('object')
        .that.have.property(myId)
        .that.equal(myCallback);
    });
    it('multi', () => {
      const myId = 'myId';
      const myId2 = 'myId2';
      const myCallback = i => i === 0;
      const myCallback2 = i => i !== 0;
      registerDcResponseCallbackOnHandler(testHandler, myId, myCallback);
      registerDcResponseCallbackOnHandler(testHandler, myId2, myCallback2);
      getDcResponseCallbacks().should.be.an('object')
        .that.have.an.property(myId)
        .that.equal(myCallback);
      getDcResponseCallbacks().should.have.an.property(myId2)
        .that.equal(myCallback2);
    });
  });

  describe('onDcResponse', () => {
    let response;
    const myId = 'myId';
    const myCallback = err => {
      if (err) response.err = err;
      response.ok = true;
    };
    beforeEach(() => {
      response = {};
    });
    it('no registered callback', () => {
      const dcResponse = getDcResponse({
        id: myId,
        status: 'OK',
      });
      try {
        onDcResponse(getDcResponseProtobuf(dcResponse));
      } catch (e) {
        e.should.be.an('error');
      }
    });
    it('ok', () => {
      const dcResponse = getDcResponse({
        id: myId,
        status: 'OK',
      });
      registerDcResponseCallbackOnHandler(testHandler, myId, myCallback);
      onDcResponse(getDcResponseProtobuf(dcResponse));
      response.should.be.an('object')
        .that.have.an.property('ok')
        .that.equal(true);
    });
    it('warning', () => {
      const dcResponse = getDcResponse({
        id: myId,
        status: 'WARNING',
        reason: 'why not',
      });
      registerDcResponseCallbackOnHandler(testHandler, myId, myCallback);
      onDcResponse(getDcResponseProtobuf(dcResponse));
      response.should.be.an('object')
        .that.have.an.property('err')
        .that.be.an('error');
      response.err.message.should.equal(dcResponse.reason);
    });
    it('error', () => {
      const dcResponse = getDcResponse({
        id: myId,
        status: 'ERROR',
        reason: 'bad move',
      });
      registerDcResponseCallbackOnHandler(testHandler, myId, myCallback);
      onDcResponse(getDcResponseProtobuf(dcResponse));
      response.should.be.an('object')
        .that.have.an.property('err')
        .that.be.an('error');
      response.err.message.should.equal(dcResponse.reason);
    });
  });
});
