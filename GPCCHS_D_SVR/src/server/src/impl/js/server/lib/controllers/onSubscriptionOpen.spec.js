require('../utils/test');
const { decode } = require('../protobuf');
const { startSubscription } = require('./onSubscriptionOpen');
const connectedDataModel = require('../models/connectedData');
const { getDataId } = require('../stubs/data');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls.push(payload);
};

describe('onSubscriptionOpen', () => {
  beforeEach(() => {
    connectedDataModel.cleanup();
    calls = [];
  });
  describe('startSubscription', () => {
    it('new', () => {
      const myDataId = getDataId();
      startSubscription({ dataId: myDataId, windowId: 42 }, zmqEmulator);

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
        .that.equal('ADD');
      payload.should.have.an.property('id');
      payload.should.have.an.property('dataId')
        .that.be.an('object');
      payload.dataId.should.have.properties(myDataId);
      const connectedData = connectedDataModel.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object')
        .that.have.properties({
          localId: connectedDataModel.getLocalId(myDataId),
          dataId: myDataId,
          intervals: {
            all: [],
            received: [],
            requested: {},
          },
          windows: [42],
        });
    });
    it('already in another window', () => {
      const myDataId = getDataId();

      connectedDataModel.addWindowId(myDataId, 91);

      startSubscription({ dataId: myDataId, windowId: 42 }, zmqEmulator);

      calls.should.be.an('array')
        .that.has.lengthOf(0);

      const connectedData = connectedDataModel.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object')
        .that.have.properties({
          localId: connectedDataModel.getLocalId(myDataId),
          dataId: myDataId,
          intervals: {
            all: [],
            received: [],
            requested: {},
          },
        });
      connectedData[0].should.have.a.property('windows')
        .that.is.an('array')
        .that.contains(42)
        .and.contains(91);
    });
  });
});
