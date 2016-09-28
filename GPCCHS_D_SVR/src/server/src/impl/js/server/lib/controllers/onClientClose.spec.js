require('../utils/test');
const { decode } = require('../protobuf');
const { cleanUpRemainingData } = require('./onClientClose');
const connectedDataModel = require('../models/connectedData');
const registeredCallbacks = require('../utils/registeredCallbacks');
const cacheJsonModel = require('../models/cacheJson');
const {
  setDomains,
  getDomains,
} = require('../utils/domains')
const {
  setTimebar,
  getTimebar,
} = require('../timebar');
const {
  getDataId,
  getReportingParameter,
  getReportingParameterProtobuf,
} = require('../stubs/data');
const _ = require('lodash');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls.push(payload);
};

describe('onWindowClose', () => {
  beforeEach(() => {
    connectedDataModel.cleanup();
    calls = [];
  });
  describe('cleanUpRemainingData', () => {
    it('one', () => {
      const myDataId = getDataId();
      const myRp = getReportingParameter();
      const proto = getReportingParameterProtobuf(myRp);

      connectedDataModel.addWindowId(myDataId, 42);
      cacheJsonModel.addRecord(myDataId, _.now(), proto);
      setTimebar({ timebar: 'timebar' });
      setDomains([1]);

      cleanUpRemainingData(zmqEmulator);

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

      const connectedData = connectedDataModel.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
      const cachedData = cacheJsonModel.find();
      cachedData.should.be.an('array')
        .that.have.lengthOf(0);
      getDomains().should.be.an('array')
        .that.has.lengthOf(0);
      getTimebar().should.be.an('object')
        .that.has.properties({});
      registeredCallbacks.getAll().should.be.an('object')
        .that.has.properties({});
    });
  });
});
