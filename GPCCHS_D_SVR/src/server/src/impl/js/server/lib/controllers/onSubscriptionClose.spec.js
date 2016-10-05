require('../utils/test');
const { decode } = require('../protobuf');
const { stopSubscription } = require('./onSubscriptionClose');
const subscriptionsModel = require('../models/subscriptions');
const { getDataId } = require('../stubs/data');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls.push(payload);
};

describe('onSubscriptionClose', () => {
  beforeEach(() => {
    subscriptionsModel.cleanup();
    calls = [];
  });
  describe('stopSubscription', () => {
    it('none', () => {
      const myDataId = getDataId();
      stopSubscription({ dataId: myDataId, windowId: 42 }, zmqEmulator);

      calls.should.be.an('array')
        .that.has.lengthOf(0);

      const subscriptions = subscriptionsModel.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = getDataId();

      subscriptionsModel.addRecord(myDataId);
      stopSubscription({ dataId: myDataId }, zmqEmulator);

      calls.should.be.an('array')
        .that.has.lengthOf(1);

      calls[0].constructor.should.equal(Buffer);
      const subscription = decode('dc.dataControllerUtils.DcClientMessage', calls[0]);
      subscription.should.be.an('object')
        .that.have.an.property('messageType')
        .that.equal('DATA_SUBSCRIBE');
      subscription.should.have.an.property('payload');
      subscription.payload.constructor.should.equal(Buffer);
      const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
      payload.should.be.an('object')
        .that.have.an.property('action')
        .that.equal('DELETE');
      payload.should.have.an.property('dataId')
        .that.be.an('object');
      payload.dataId.should.have.properties(myDataId);

      const subscriptions = subscriptionsModel.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
    });
  });
});
