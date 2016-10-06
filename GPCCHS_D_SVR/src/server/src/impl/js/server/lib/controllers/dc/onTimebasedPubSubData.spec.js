require('../../utils/test');

const { sendTimebasedPubSubData } = require('./onTimebasedPubSubData');
const timebasedDataModel = require('../../models/timebasedData');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const _ = require('lodash');
const {
  getDataId,
  getRemoteId,
  getDataPayload,
  getTimestamp,
  getReportingParameter,
  getReportingParameterProtobuf
} = require('../../stubs/data');
const TestWebSocket = require('../../stubs/testWebSocket');

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
  const dataId = getDataId();
  const rp = getReportingParameter({ onboardDate: getTimestamp().ms });
  const rp2 = getReportingParameter({ onboardDate: getTimestamp().ms + 1 });
  const protoRp = getReportingParameterProtobuf(rp);
  const protoRp2 = getReportingParameterProtobuf(rp2);
  const payloads = [
    getDataPayload({ timestamp: { ms: getTimestamp().ms }, payload: protoRp }),
    getDataPayload({ timestamp: { ms: getTimestamp().ms + 1 }, payload: protoRp2 }),
  ];
  const fullInterval = [getTimestamp().ms - 10, getTimestamp().ms + 10];
  const halfInterval = [getTimestamp().ms - 10, getTimestamp().ms];
  const fullFilter = [
    {
      field: 'onboardDate',
      operator: 'OP_GT',
      value: getTimestamp().ms - 10,
    }, {
      field: 'onboardDate',
      operator: 'OP_LT',
      value: getTimestamp().ms + 10,
    },
  ];
  const halfFilter = [
    {
      field: 'onboardDate',
      operator: 'OP_EQ',
      value: getTimestamp().ms + 1,
    },
  ];
  const fullRemoteId = getRemoteId(Object.assign({}, dataId, { filters: fullFilter }));
  const halfRemoteId = getRemoteId(Object.assign({}, dataId, { filters: halfFilter }));

  it('no dataId in subscriptions', () => {
    // init test
    // launch test
    sendTimebasedPubSubData(spark, dataId, payloads);
    // check data
    timebasedDataModel.count().should.equal(0);
    spark.getMessage().should.have.properties({});
  });

  it('no query for this dataId', () => {
    // init test
    subscriptionsModel.addRecord(dataId);
    // launch test
    sendTimebasedPubSubData(spark, dataId, payloads);
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
    sendTimebasedPubSubData(spark, dataId, payloads);
    // check data
    timebasedDataModel.count().should.equal(1);
    const tbd = timebasedDataModel.find();
    tbd[0].should.have.properties({
      remoteId: fullRemoteId,
      timestamp: payloads[0].timestamp.ms,
      payload: rp,
    });
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [fullRemoteId]: [
          {
            timestamp: payloads[0].timestamp.ms,
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
    sendTimebasedPubSubData(spark, dataId, payloads);
    // check data
    timebasedDataModel.count().should.equal(1);
    const tbd = timebasedDataModel.find();
    tbd[0].should.have.properties({
      remoteId: halfRemoteId,
      timestamp: payloads[1].timestamp.ms,
      payload: rp2,
    });
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [halfRemoteId]: [
          {
            timestamp: payloads[1].timestamp.ms,
            payload: rp2,
          },
        ],
      },
    });
  });
});
