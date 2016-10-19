const { should } = require('../../utils/test');
const { sendTimebasedArchiveData } = require('./onTimebasedArchiveData');
const registeredQueries = require('../../utils/registeredQueries');
const connectedDataModel = require('../../models/connectedData');
const { clearFactory, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const dataStub = require('../../stubs/data');
const { addToTestQueue, getMessage, resetMessage } = require('../../stubs/testWebSocket');

/* onTimebasedArchiveData Test
 *
 * - check interval is received in connectedData model
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 *
 */

describe('controllers/onTimebasedArchiveData', () => {
  beforeEach(() => {
    registeredQueries.clear();
    connectedDataModel.cleanup();
    clearFactory();
    resetMessage();
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
    connectedDataModel.addRecord(remoteId, dataId);
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    // launch test
    sendTimebasedArchiveData(
      addToTestQueue,
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
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    should.not.exist(timebasedDataModel);
    getMessage().should.deep.equal({});
  });

  it('works', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(false);
    connectedDataModel.addRecord(remoteId, dataId);
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    registeredQueries.set(queryId, remoteId);
    // launch test
    sendTimebasedArchiveData(
      addToTestQueue,
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
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    should.exist(timebasedDataModel);
    timebasedDataModel.count().should.equal(2);
    const timebasedData = timebasedDataModel.find();
    timebasedData.should.have.properties([
      {
        timestamp: t1,
        payload: rp,
      }, {
        timestamp: t2,
        payload: rp,
      },
    ]);
    getMessage().should.have.properties({
      event: 'timebasedData',
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
    connectedDataModel.addRecord(remoteId, dataId);
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    registeredQueries.set(queryId, remoteId);
    // launch test
    sendTimebasedArchiveData(
      addToTestQueue,
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
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    should.exist(timebasedDataModel);
    timebasedDataModel.count().should.equal(2);
    const timebasedData = timebasedDataModel.find();
    timebasedData.should.have.properties([
      {
        timestamp: t1,
        payload: rp,
      }, {
        timestamp: t2,
        payload: rp,
      },
    ]);
    getMessage().should.have.properties({
      event: 'timebasedData',
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
