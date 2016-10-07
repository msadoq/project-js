require('../utils/test');
const { startSubscription } = require('./onSubscriptionOpen');
const subscriptionsModel = require('../models/subscriptions');
const dataStub = require('../stubs/data');
const registeredCallbacks = require('../utils/registeredCallbacks');
const flattenDataId = require('../models/getLocalId');
const _ = require('lodash');

let calls = [];
const zmqEmulator = (key, args) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  _.each(args, arg => calls.push(arg));
};

describe('onSubscriptionOpen', () => {
  beforeEach(() => {
    registeredCallbacks.clear();
    subscriptionsModel.cleanup();
    calls = [];
  });
  describe('startSubscription', () => {
    it('new', () => {
      const myDataId = dataStub.getDataId();
      startSubscription({ dataId: myDataId }, zmqEmulator);

      const cbs = _.keys(registeredCallbacks.getAll());
      cbs.should.have.lengthOf(1);
      const queryId = cbs[0];

      calls.should.be.an('array')
        .that.has.lengthOf(4);

      calls[0].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
      calls[1].should.have.properties(dataStub.getStringProtobuf(queryId));
      calls[2].should.have.properties(dataStub.getDataIdProtobuf(myDataId));
      calls[3].should.have.properties(dataStub.getAddActionProtobuf());

      const subscriptions = subscriptionsModel.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(1);
      subscriptions[0].should.be.an('object')
        .that.have.properties({
          flatDataId: flattenDataId(myDataId),
          dataId: myDataId,
          filters: {},
        });
    });
  });
});
