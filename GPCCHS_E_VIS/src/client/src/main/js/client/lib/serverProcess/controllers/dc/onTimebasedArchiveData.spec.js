const { should } = require('../../utils/test');
const onTimebasedArchiveData = require('./onTimebasedArchiveData');
const {
  cleanup: cleanRegisteredQueries,
  addRecord: registerQuery,
  getByQueryId: getRegisteredQuery,
} = require('../../models/registeredQueries');
const connectedDataModel = require('../../models/connectedData');
const { clearFactory, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const dataStub = require('common/protobuf/stubs');
const { get: getQueue, reset: resetQueue } = require('../../models/dataQueue');

/*
 * onTimebasedArchiveData test:
 * - check interval is received in connectedData model
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 */

describe('controllers/utils/onTimebasedArchiveData', () => {
  beforeEach(() => {
    cleanRegisteredQueries();
    connectedDataModel.cleanup();
    clearFactory();
    resetQueue();
  });

  const queryId = 'queryId';
  const queryIdProto = dataStub.getStringProtobuf(queryId);
  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);
  const flatDataId = dataStub.getRemoteId(dataId);
  const rp = dataStub.getReportingParameter();
  const protoRp = dataStub.getReportingParameterProtobuf(rp);
  const deprotoRp = dataStub.getReportingParameterDeProtobuf(protoRp);
  const t1 = 5;
  const t2 = 10;
  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });
  const interval = [-15, 15];

  it('unknown queryId', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(false);
    connectedDataModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(flatDataId, queryId, interval);
    // launch test
    onTimebasedArchiveData(
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp
    );
    // check data
    const cd = connectedDataModel.getByFlatDataId(flatDataId);
    cd.should.be.an('object')
      .that.have.properties({
        flatDataId,
        intervals: {
          all: [interval],
          received: [],
          requested: { [queryId]: interval },
        },
        lastQueries: {},
      });
    const timebasedDataModel = getTimebasedDataModel(flatDataId);
    should.not.exist(timebasedDataModel);
    getQueue().should.deep.equal({});
  });
  it('works when range query', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(false);
    connectedDataModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(flatDataId, queryId, interval);
    registerQuery(queryId, flatDataId);
    // launch test
    onTimebasedArchiveData(
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp
    );
    // check data
    should.exist(getRegisteredQuery(queryId));
    const cd = connectedDataModel.getByFlatDataId(flatDataId);
    cd.should.be.an('object')
      .that.have.properties({
        flatDataId,
        intervals: {
          all: [interval],
          received: [],
          requested: { [queryId]: interval },
        },
        lastQueries: {},
      });
    const timebasedDataModel = getTimebasedDataModel(flatDataId);
    should.exist(timebasedDataModel);
    timebasedDataModel.count().should.equal(2);
    const timebasedData = timebasedDataModel.find();
    timebasedData.should.have.properties([
      {
        timestamp: t1,
        payload: deprotoRp,
      }, {
        timestamp: t2,
        payload: deprotoRp,
      },
    ]);
    getQueue().should.have.properties({
      [flatDataId]: {
        [t1]: deprotoRp,
        [t2]: deprotoRp,
      },
    });
  });

  it('last chunk with range query', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(true);
    connectedDataModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(flatDataId, queryId, interval);
    registerQuery(queryId, flatDataId);
    // launch test
    onTimebasedArchiveData(
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp
    );
    // check data
    should.not.exist(getRegisteredQuery(queryId));
    const cd = connectedDataModel.getByFlatDataId(flatDataId);
    cd.should.be.an('object')
      .that.have.properties({
        flatDataId,
        intervals: {
          all: [interval],
          received: [interval],
          requested: {},
        },
        lastQueries: {},
      });
    const timebasedDataModel = getTimebasedDataModel(flatDataId);
    should.exist(timebasedDataModel);
    timebasedDataModel.count().should.equal(2);
    const timebasedData = timebasedDataModel.find();
    timebasedData.should.have.properties([
      {
        timestamp: t1,
        payload: deprotoRp,
      }, {
        timestamp: t2,
        payload: deprotoRp,
      },
    ]);
    getQueue().should.have.properties({
      [flatDataId]: {
        [t1]: deprotoRp,
        [t2]: deprotoRp,
      },
    });
  });
  it('last chunk with last query', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(true);
    connectedDataModel.addRecord(dataId);
    connectedDataModel.addLastQuery(flatDataId, queryId, interval);
    registerQuery(queryId, flatDataId);
    // launch test
    onTimebasedArchiveData(
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp
    );
    // check data
    should.not.exist(getRegisteredQuery(queryId));
    const cd = connectedDataModel.getByFlatDataId(flatDataId);
    cd.should.be.an('object')
      .that.have.properties({
        flatDataId,
        intervals: {
          all: [],
          received: [],
          requested: {},
        },
        lastQueries: { },
      });
    const timebasedDataModel = getTimebasedDataModel(flatDataId);
    should.not.exist(timebasedDataModel);
    getQueue().should.have.properties({
      [flatDataId]: {
        [t1]: deprotoRp,
      },
    });
  });
  it('big load', () => {
    // init test
    const isLast = dataStub.getBooleanProtobuf(true);
    const queryIds = ['queryId1', 'queryId2', 'queryId3', 'queryId4', 'queryId5', 'queryId6'];
    const intervals = [[0, 5], [0, 7], [5, 20], [12, 17], [25, 30], [42, 91]];
    connectedDataModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(flatDataId, queryId, interval);
    for (let i = 0; i < 6; i += 1) {
      connectedDataModel.addRequestedInterval(flatDataId, queryIds[i], intervals[i]);
      registerQuery(queryIds[i], flatDataId);
    }
    registerQuery(queryId, flatDataId);
    // launch test
    onTimebasedArchiveData(
      queryIdProto,
      dataIdProto,
      isLast,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp
    );
  });
});
