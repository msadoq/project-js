const { should } = require('../../utils/test');
const { sendTimebasedArchiveData } = require('./onTimebasedArchiveData');
const registeredQueries = require('../../utils/registeredQueries');
const connectedDataModel = require('../../models/connectedData');
const timebasedDataModel = require('../../models/timebasedData');
const _ = require('lodash');
const dataStub = require('../../stubs/data');
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
  const queryIdProto = dataStub.getStringProtobuf(queryId);
  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);
  const remoteId = dataStub.getRemoteId(dataId);
  const rp = dataStub.getReportingParameter();
  const protoRp = dataStub.getReportingParameterProtobuf(rp);
  const t1 = 5;
  const t2 = 10;
  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });
  const interval = [-15, 15];

  it('unknown queryId', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(false);
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    // launch test
    sendTimebasedArchiveData(
      spark,
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp
    );
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
    const isLast = dataStub.getBooleanProtobuf(false);
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    registeredQueries.set(queryId, remoteId);
    // launch test
    sendTimebasedArchiveData(
      spark,
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp
    );
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
        timestamp: t1,
        payload: rp,
      }, {
        remoteId,
        timestamp: t2,
        payload: rp,
      },
    ]);
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [remoteId]: [
          {
            timestamp: t1,
            payload: rp,
          }, {
            timestamp: t2,
            payload: rp,
          },
        ],
      },
    });
  });

  it('last chunk', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(true);
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    registeredQueries.set(queryId, remoteId);
    // launch test
    sendTimebasedArchiveData(
      spark,
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp
    );
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
        timestamp: t1,
        payload: rp,
      }, {
        remoteId,
        timestamp: t2,
        payload: rp,
      },
    ]);
    spark.getMessage().should.have.properties({
      event: 'newData',
      payload: {
        [remoteId]: [
          {
            timestamp: t1,
            payload: rp,
          }, {
            timestamp: t2,
            payload: rp,
          },
        ],
      },
    });
  });
});
