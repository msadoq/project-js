// eslint-disable-next-line no-underscore-dangle
const _concat = require('lodash/concat');
// eslint-disable-next-line no-underscore-dangle
const _now = require('lodash/now');

// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
// eslint-disable-next-line import/no-extraneous-dependencies
const { decode } = require('common/protobuf');
const {
  getDataId,
  getRemoteId,
  getReportingParameter,
  getReportingParameterProtobuf,
} = require('common/stubs/data'); // eslint-disable-line import/no-extraneous-dependencies

require('../../utils/test');
const registeredQueries = require('../../utils/registeredQueries');
const { add, get } = require('../../websocket/dataQueue');
const { setDomains, getDomains } = require('../../utils/domains');

const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const { clearFactory, getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');

const { close } = require('./onClose');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls = _concat(calls, payload);
};

describe('controllers/client/onClose', () => {
  beforeEach(() => {
    registeredQueries.clear();
    subscriptionsModel.cleanup();
    clearFactory();
    connectedDataModel.cleanup();
    calls = [];
    add('myRemoteId', { myKey: 'value' });
  });
  it('should cleanup HSS state', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId(myDataId);
    const myRp = getReportingParameter();
    const proto = getReportingParameterProtobuf(myRp);

    subscriptionsModel.addRecord(myDataId);
    const timebasedDataModel = getOrCreateTimebasedDataModel(myRemoteId);
    timebasedDataModel.addRecord(_now(), proto);
    connectedDataModel.addRequestedInterval(myRemoteId, 'queryId', [42, 42]);
    setDomains([1]);
    registeredQueries.set('queryId', myRemoteId);

    // call it
    close(zmqEmulator);

    get().should.eql({});

    calls.should.be.an('array')
      .that.has.lengthOf(4);
    calls[0].constructor.should.equal(Buffer);
    const messageType = decode('dc.dataControllerUtils.Header', calls[0]).messageType;
    messageType.should.equal(globalConstants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION);
    const dataId = decode('dc.dataControllerUtils.DataId', calls[2]);
    dataId.should.have.properties(myDataId);
    const action = decode('dc.dataControllerUtils.Action', calls[3]).action;
    action.should.equal(globalConstants.SUBSCRIPTIONACTION_DELETE);

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
    Object.keys(registeredQueries.getAll()).should.have.lengthOf(0);
  });
});
