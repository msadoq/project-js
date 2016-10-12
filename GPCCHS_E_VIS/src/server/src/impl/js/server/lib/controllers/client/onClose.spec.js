require('../../utils/test');
const { decode } = require('../../protobuf');
const { close } = require('./onClose');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const timebasedDataModel = require('../../models/timebasedData');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const registeredQueries = require('../../utils/registeredQueries');
const { setDomains, getDomains } = require('../../utils/domains');
const constants = require('../../constants');
const {
  getDataId,
  getRemoteId,
  getReportingParameter,
  getReportingParameterProtobuf,
} = require('../../stubs/data');
const _ = require('lodash');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls = _.concat(calls, payload);
};

describe('onClose', () => {
  beforeEach(() => {
    subscriptionsModel.cleanup();
    calls = [];
  });
  describe('close', () => {
    it('one', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId(myDataId);
      const myRp = getReportingParameter();
      const proto = getReportingParameterProtobuf(myRp);

      subscriptionsModel.addRecord(myDataId);
      timebasedDataModel.addRecord(myRemoteId, _.now(), proto);
      connectedDataModel.addRequestedInterval(myRemoteId, 'queryId', [42, 42]);
      setDomains([1]);
      registeredCallbacks.set('toto', toto => toto === 1);
      registeredQueries.set('queryId', myRemoteId);

      close(zmqEmulator);

      calls.should.be.an('array')
        .that.has.lengthOf(4);
      calls[0].constructor.should.equal(Buffer);
      const messageType = decode('dc.dataControllerUtils.Header', calls[0]).messageType;
      messageType.should.equal(constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION);
      const queryId = decode('dc.dataControllerUtils.String', calls[1]).string;
      const dataId = decode('dc.dataControllerUtils.DataId', calls[2]);
      dataId.should.have.properties(myDataId);
      const action = decode('dc.dataControllerUtils.Action', calls[3]).action;
      action.should.equal(constants.SUBSCRIPTIONACTION_DELETE);

      const connectedData = connectedDataModel.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
      const subscriptions = subscriptionsModel.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
      const timebasedData = timebasedDataModel.find();
      timebasedData.should.be.an('array')
        .that.have.lengthOf(0);
      getDomains().should.be.an('array')
        .that.has.lengthOf(0);
      registeredCallbacks.getAll().should.be.an('object')
        .that.has.properties({});
      registeredQueries.getAll().should.be.an('object')
        .that.has.properties({});
    });
  });
});
