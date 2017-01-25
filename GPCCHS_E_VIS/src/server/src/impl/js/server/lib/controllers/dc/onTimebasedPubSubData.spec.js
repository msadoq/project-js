const { should } = require('../../utils/test');

const onTimebasedPubSubData = require('./onTimebasedPubSubData');
const {
  clearFactory,
  getTimebasedDataModel,
  getAllTimebasedDataModelRemoteIds,
} = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const dataStub = require('common/stubs/data');
const { get: getQueue, reset: resetQueue } = require('../../utils/dataQueue');
const { get: getLastPubSubTimestamp, reset: resetLastPubSubTimestamp } = require('../../utils/lastPubSubTimestamp');
const globalConstants = require('common/constants');

/* onTimebasedPubSubData Test
 *
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 *
 */

describe('controllers/dc/onTimebasedPubSubData', () => {
  beforeEach(() => {
    subscriptionsModel.cleanup();
    connectedDataModel.cleanup();
    clearFactory();
    resetQueue();
    resetLastPubSubTimestamp();
  });

  const queryId = 'queryId';
  const queryIdProto = dataStub.getStringProtobuf(queryId);
  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);

  const t1 = 5;
  const t2 = 10;
  const fullInterval = [-15, 15];
  const halfInterval = [-15, 5];
  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const rp = dataStub.getReportingParameter({ onboardDate: t1 });
  const rp2 = dataStub.getReportingParameter({ onboardDate: t2 });
  const protoRp = dataStub.getReportingParameterProtobuf(rp);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);
  const deprotoRp = dataStub.getReportingParameterDeProtobuf(protoRp);
  const deprotoRp2 = dataStub.getReportingParameterDeProtobuf(protoRp2);

  const fullFilter = [
    {
      fieldName: 'onboardDate',
      type: globalConstants.FILTERTYPE_GT,
      fieldValue: -15,
    }, {
      fieldName: 'onboardDate',
      type: globalConstants.FILTERTYPE_LT,
      fieldValue: 15,
    },
  ];
  const halfFilter = [
    {
      fieldName: 'onboardDate',
      type: globalConstants.FILTERTYPE_EQ,
      fieldValue: 10,
    },
  ];
  const fullRemoteId = dataStub.getRemoteId(Object.assign({}, dataId, { filters: fullFilter }));
  const halfRemoteId = dataStub.getRemoteId(Object.assign({}, dataId, { filters: halfFilter }));

  it('no dataId in subscriptions', () => {
    // init test
    // launch test
    onTimebasedPubSubData(
      queryIdProto,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    getAllTimebasedDataModelRemoteIds().should.have.lengthOf(0);
    getQueue().should.have.properties({});
    should.not.exist(getLastPubSubTimestamp());
  });

  it('no query for this dataId', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    // launch test
    onTimebasedPubSubData(
      queryIdProto,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    getAllTimebasedDataModelRemoteIds().should.have.lengthOf(0);
    getQueue().should.have.properties({});
    should.not.exist(getLastPubSubTimestamp());
  });

  it('one in interval, all in filters', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    subscriptionsModel.addFilters(dataId, { [fullRemoteId]: fullFilter });
    connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_LAST, fullRemoteId, dataId);
    connectedDataModel.addRequestedInterval(fullRemoteId, queryId, halfInterval);
    // launch test
    onTimebasedPubSubData(
      queryIdProto,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    should.not.exist(getTimebasedDataModel(halfRemoteId));
    const timebasedDataModel = getTimebasedDataModel(fullRemoteId);
    should.exist(timebasedDataModel);
    timebasedDataModel.count().should.equal(1);
    const tbd = timebasedDataModel.find();
    tbd[0].should.have.properties({
      timestamp: t1,
      payload: deprotoRp,
    });
    getQueue().should.have.properties({
      [fullRemoteId]: {
        [t1]: deprotoRp,
      },
    });
    getLastPubSubTimestamp().should.equal(t2);
  });

  it('all in interval, one in filter', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    subscriptionsModel.addFilters(dataId, { [halfRemoteId]: halfFilter });
    connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_LAST, halfRemoteId, dataId);
    connectedDataModel.addRequestedInterval(halfRemoteId, queryId, fullInterval);
    // launch test
    onTimebasedPubSubData(
      queryIdProto,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    should.not.exist(getTimebasedDataModel(fullRemoteId));
    const timebasedDataModel = getTimebasedDataModel(halfRemoteId);
    should.exist(timebasedDataModel);
    timebasedDataModel.count().should.equal(1);
    const tbd = timebasedDataModel.find();
    tbd[0].should.have.properties({
      timestamp: t2,
      payload: deprotoRp2,
    });
    getQueue().should.have.properties({
      [halfRemoteId]: {
        [t2]: deprotoRp2,
      },
    });
    getLastPubSubTimestamp().should.equal(t2);
  });
});
