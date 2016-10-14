require('../utils/test');
const { stopSubscription } = require('./onSubscriptionClose');
const subscriptionsModel = require('../models/subscriptions');
const registeredCallbacks = require('../utils/registeredCallbacks');
const dataStub = require('../stubs/data');
const _ = require('lodash');

let calls = [];
const zmqEmulator = (key, args) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  _.each(args, arg => calls.push(arg));
};

describe('controllers/onSubscriptionClose', () => {
  beforeEach(() => {
    registeredCallbacks.clear();
    subscriptionsModel.cleanup();
    calls = [];
  });
  describe('stopSubscription', () => {
    it('none', () => {
      const myDataId = dataStub.getDataId();
      stopSubscription({ dataId: myDataId, windowId: 42 }, zmqEmulator);

      calls.should.be.an('array')
        .that.has.lengthOf(0);

      const subscriptions = subscriptionsModel.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = dataStub.getDataId();

      subscriptionsModel.addRecord(myDataId);
      stopSubscription({ dataId: myDataId }, zmqEmulator);

      const cbs = _.keys(registeredCallbacks.getAll());
      cbs.should.have.lengthOf(1);
      const queryId = cbs[0];

      calls.should.be.an('array')
        .that.has.lengthOf(4);

      calls[0].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
      calls[1].should.have.properties(dataStub.getStringProtobuf(queryId));
      calls[2].should.have.properties(dataStub.getDataIdProtobuf(myDataId));
      calls[3].should.have.properties(dataStub.getDeleteActionProtobuf());

      const subscriptions = subscriptionsModel.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
    });
  });
});
