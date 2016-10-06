const { should } = require('../../utils/test');
const { sendTimebasedArchiveData } = require('./onTimebasedArchiveData');
const registeredQueries = require('../../utils/registeredQueries');
const connectedDataModel = require('../../models/connectedData');
const timebasedDataModel = require('../../models/timebasedData');
const _ = require('lodash');
const {
  getDataId,
  getRemoteId,
  getDataPayload,
  getTimestamp,
  getReportingParameter,
  getReportingParameterProtobuf,
} = require('../../stubs/data');
const TestWebSocket = require('../../stubs/testWebSocket');

const testWebsocket = new TestWebSocket();
testWebsocket.init();
const spark = testWebsocket.getSpark();

/* onTimebasedArchiveData Test
 *
 * - check interval is received in connectedData model
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 *
 */

describe('onTimebasedArchiveData', () => {
  beforeEach(() => {
    registeredQueries.clear();
    connectedDataModel.cleanup();
    timebasedDataModel.cleanup();
    spark.resetMessage();
  });

  const queryId = 'queryId';
  const dataId = getDataId();
  const remoteId = getRemoteId(dataId);
  const rp = getReportingParameter();
  const protoRp = getReportingParameterProtobuf(rp);
  const payloads = [
    getDataPayload({ timestamp: { ms: getTimestamp().ms }, payload: protoRp }),
    getDataPayload({ timestamp: { ms: getTimestamp().ms + 1 }, payload: protoRp }),
  ];
  const interval = [getTimestamp().ms - 10, getTimestamp().ms + 10];

  it('unknown queryId', () => {
    // init test
    const isEndOfQuery = false;
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    // launch test
    sendTimebasedArchiveData(spark, dataId, queryId, payloads, isEndOfQuery);
    // check data
    const cd = connectedDataModel.getByRemoteId(remoteId);
    cd.should.be.an('object')
      .that.have.properties({
        remoteId,
        intervals: {
          all: [interval],
          received: [],
          requested: { [queryId]: interval },
        },
      });
    timebasedDataModel.count().should.equal(0);
    spark.getMessage().should.deep.equal({});
  });

  it('works', () => {
    // init test
    const isEndOfQuery = false;
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    registeredQueries.set(queryId, remoteId);
    // launch test
    sendTimebasedArchiveData(spark, dataId, queryId, payloads, isEndOfQuery);
    // check data
    should.exist(registeredQueries.get(queryId));
    const cd = connectedDataModel.getByRemoteId(remoteId);
    cd.should.be.an('object')
      .that.have.properties({
        remoteId,
        intervals: {
          all: [interval],
          received: [],
          requested: { [queryId]: interval },
        },
      });
    timebasedDataModel.count().should.equal(2);
    const timebasedData = timebasedDataModel.find();
    timebasedData.should.have.properties([
      {
        remoteId,
        timestamp: payloads[0].timestamp.ms,
        payload: rp,
      }, {
        remoteId,
        timestamp: payloads[1].timestamp.ms,
        payload: rp,
      },
    ]);
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [remoteId]: [
          {
            timestamp: payloads[0].timestamp.ms,
            payload: rp,
          }, {
            timestamp: payloads[1].timestamp.ms,
            payload: rp,
          },
        ],
      },
    });
  });

  it('last chunk', () => {
    // init test
    const isEndOfQuery = true;
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    registeredQueries.set(queryId, remoteId);
    // launch test
    sendTimebasedArchiveData(spark, dataId, queryId, payloads, isEndOfQuery);
    // check data
    should.not.exist(registeredQueries.get(queryId));
    const cd = connectedDataModel.getByRemoteId(remoteId);
    cd.should.be.an('object')
      .that.have.properties({
        remoteId,
        intervals: {
          all: [interval],
          received: [interval],
          requested: {},
        },
      });
    timebasedDataModel.count().should.equal(2);
    const timebasedData = timebasedDataModel.find();
    timebasedData.should.have.properties([
      {
        remoteId,
        timestamp: payloads[0].timestamp.ms,
        payload: rp,
      }, {
        remoteId,
        timestamp: payloads[1].timestamp.ms,
        payload: rp,
      },
    ]);
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [remoteId]: [
          {
            timestamp: payloads[0].timestamp.ms,
            payload: rp,
          }, {
            timestamp: payloads[1].timestamp.ms,
            payload: rp,
          },
        ],
      },
    });
  });
});
