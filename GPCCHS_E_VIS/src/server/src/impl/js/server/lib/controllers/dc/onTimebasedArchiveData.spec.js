const { should } = require('../../utils/test');
const { sendTimebasedArchiveData } = require('./onTimebasedArchiveData');
const registeredQueries = require('../../utils/registeredQueries');
const connectedDataModel = require('../../models/connectedData');
const { clearFactory, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
// eslint-disable-next-line import/no-extraneous-dependencies
const dataStub = require('common/stubs/data');
const {
  addToTestQueue,
  getMessage,
  resetMessage,
  flushTestQueue,
} = require('../../utils/testWebSocket');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

/*
 * onTimebasedArchiveData test:
 * - check interval is received in connectedData model
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 */

describe('controllers/dc/onTimebasedArchiveData', () => {
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
    connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_LAST, remoteId, dataId);
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
    connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_LAST, remoteId, dataId);
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

    flushTestQueue();
    getMessage().should.have.properties({
      event: 'timebasedData',
      payload: {
        [remoteId]: {
          [t1]: rp,
          [t2]: rp,
        },
      },
    });
  });

  it('last chunk', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(true);
    connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_LAST, remoteId, dataId);
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
    flushTestQueue();
    getMessage().should.have.properties({
      event: 'timebasedData',
      payload: {
        [remoteId]: {
          [t1]: rp,
          [t2]: rp,
        },
      },
    });
  });
  it('big load', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(true);
    const queryIds = ['queryId1', 'queryId2', 'queryId3', 'queryId4', 'queryId5', 'queryId6'];
    const intervals = [[0, 5], [0, 7], [5, 20], [12, 17], [25, 30], [42, 91]];
    connectedDataModel.addRecord(globalConstants.DATASTRUCTURETYPE_RANGE, remoteId, dataId);
    connectedDataModel.addRequestedInterval(remoteId, queryId, interval);
    for (let i = 0; i < 6; i += 1) {
      connectedDataModel.addRequestedInterval(remoteId, queryIds[i], intervals[i]);
      registeredQueries.set(queryIds[i], remoteId);
    }
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
    /* should.not.exist(registeredQueries.get(queryId));
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
    flushTestQueue();
    getMessage().should.have.properties({
      event: 'timebasedData',
      payload: {
        [remoteId]: {
          [t1]: rp,
          [t2]: rp,
        },
      },
    });*/
  });
});
