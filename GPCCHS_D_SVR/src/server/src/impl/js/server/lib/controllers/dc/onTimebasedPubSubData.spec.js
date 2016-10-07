require('../../utils/test');

const { sendTimebasedPubSubData } = require('./onTimebasedPubSubData');
const timebasedDataModel = require('../../models/timebasedData');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const _ = require('lodash');
const dataStub = require('../../stubs/data');
const TestWebSocket = require('../../stubs/testWebSocket');
const constants = require('../../constants');

const testWebsocket = new TestWebSocket();
testWebsocket.init();
const spark = testWebsocket.getSpark();

/* onTimebasedPubSubData Test
 *
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 *
 */

describe('onTimebasedPubSubData', () => {
  beforeEach(() => {
    subscriptionsModel.cleanup();
    connectedDataModel.cleanup();
    timebasedDataModel.cleanup();
    spark.resetMessage();
  });

  const queryId = 'queryId';
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

  const fullFilter = [
    {
      field: 'onboardDate',
      operator: constants.FILTEROPERATOR_GT,
      value: -15,
    }, {
      field: 'onboardDate',
      operator: constants.FILTEROPERATOR_LT,
      value: 15,
    },
  ];
  const halfFilter = [
    {
      field: 'onboardDate',
      operator: constants.FILTEROPERATOR_EQ,
      value: 10,
    },
  ];
  const fullRemoteId = dataStub.getRemoteId(Object.assign({}, dataId, { filters: fullFilter }));
  const halfRemoteId = dataStub.getRemoteId(Object.assign({}, dataId, { filters: halfFilter }));

  it('no dataId in subscriptions', () => {
    // init test
    // launch test
    sendTimebasedPubSubData(
      spark,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    timebasedDataModel.count().should.equal(0);
    spark.getMessage().should.have.properties({});
  });

  it('no query for this dataId', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    // launch test
    sendTimebasedPubSubData(
      spark,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    timebasedDataModel.count().should.equal(0);
    spark.getMessage().should.have.properties({});
  });

  it('one in interval, all in filters', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    subscriptionsModel.addFilters(dataId, { [fullRemoteId]: fullFilter });
    connectedDataModel.addRequestedInterval(fullRemoteId, queryId, halfInterval);
    // launch test
    sendTimebasedPubSubData(
      spark,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    timebasedDataModel.count().should.equal(1);
    const tbd = timebasedDataModel.find();
    tbd[0].should.have.properties({
      remoteId: fullRemoteId,
      timestamp: t1,
      payload: rp,
    });
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [fullRemoteId]: [
          {
            timestamp: t1,
            payload: rp,
          },
        ],
      },
    });
  });

  it('all in interval, one in filter', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    subscriptionsModel.addFilters(dataId, { [halfRemoteId]: halfFilter });
    connectedDataModel.addRequestedInterval(halfRemoteId, queryId, fullInterval);
    // launch test
    sendTimebasedPubSubData(
      spark,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    timebasedDataModel.count().should.equal(1);
    const tbd = timebasedDataModel.find();
    tbd[0].should.have.properties({
      remoteId: halfRemoteId,
      timestamp: t2,
      payload: rp2,
    });
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [halfRemoteId]: [
          {
            timestamp: t2,
            payload: rp2,
          },
        ],
      },
    });
  });
});
