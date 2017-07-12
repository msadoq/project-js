// const { mockRegister, mockLoadStubs } = require('../../../common/jest');
//
// mockRegister();
// mockLoadStubs();
//
// const { getRemoteId } = require('../../../common/jest');
// const onTimebasedArchiveData = require('./onTimebasedArchiveData');
// const {
//   cleanup: cleanRegisteredQueries,
//   addRecord: registerQuery,
//   getByQueryId: getRegisteredQuery,
// } = require('../../models/registeredQueries');
// const connectedDataModel = require('../../models/connectedData');
// const { clearFactory, getTimebasedDataModel } = require('../../models/timebasedDataFactory');
// const { getStubData, loadStubs } = require('../../../utils/stubs');
// const { get: getQueue, reset: resetQueue } = require('../../models/dataQueue');
//
// loadStubs();
// const dataStub = getStubData();
//
// /*
//  * onTimebasedArchiveData test:
//  * - check interval is received in connectedData model
//  * - check payloads are stored in timebasedData model
//  * - check ws messages for timebasedData
//  */
//
// describe('controllers/utils/onTimebasedArchiveData', () => {
//   beforeEach(() => {
//     cleanRegisteredQueries();
//     connectedDataModel.cleanup();
//     clearFactory();
//     resetQueue();
//   });
//
//   const queryId = 'queryId';
//   const queryIdProto = dataStub.getStringProtobuf(queryId);
//   const dataId = dataStub.getDataId();
//   const dataIdProto = dataStub.getDataIdProtobuf(dataId);
//   const flatDataId = getRemoteId(dataId);
//   const rp = dataStub.getReportingParameter();
//   const protoRp = dataStub.getReportingParameterProtobuf(rp);
//   const deprotoRp = dataStub.getReportingParameterDeProtobuf(protoRp);
//   const t1 = 5;
//   const t2 = 10;
//   const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
//   const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });
//   const interval = [-15, 15];
//
//   test('unknown queryId', () => {
//     // init test
//     const isLast = dataStub.getBooleanProtobuf(false);
//     const m = connectedDataModel.addRecord(dataId);
//     connectedDataModel.addRequestedInterval(m, queryId, interval);
//     // launch test
//     onTimebasedArchiveData(
//       queryIdProto,
//       dataIdProto,
//       isLast,
//       timestamp1,
//       protoRp,
//       timestamp2,
//       protoRp
//     );
//     // check data
//     const cd = connectedDataModel.getByFlatDataId(flatDataId);
//     expect(cd).toMatchObject({
//       flatDataId,
//       intervals: {
//         all: [interval],
//         received: [],
//         requested: { [queryId]: interval },
//       },
//       lastQueries: {},
//     });
//     const timebasedDataModel = getTimebasedDataModel(flatDataId);
//     expect(timebasedDataModel).toBeFalsy();
//     expect(getQueue()).toEqual({});
//   });
//   test('works when range query', () => {
//     // init test
//     const isLast = dataStub.getBooleanProtobuf(false);
//     const m = connectedDataModel.addRecord(dataId);
//     connectedDataModel.addRequestedInterval(m, queryId, interval);
//     registerQuery(queryId, flatDataId);
//     // launch test
//     onTimebasedArchiveData(
//       queryIdProto,
//       dataIdProto,
//       isLast,
//       timestamp1,
//       protoRp,
//       timestamp2,
//       protoRp
//     );
//     // check data
//     expect(getRegisteredQuery(queryId)).toBeDefined();
//     const cd = connectedDataModel.getByFlatDataId(flatDataId);
//     expect(cd).toMatchObject({
//       flatDataId,
//       intervals: {
//         all: [interval],
//         received: [],
//         requested: { [queryId]: interval },
//       },
//       lastQueries: {},
//     });
//     const timebasedDataModel = getTimebasedDataModel(flatDataId);
//     expect(timebasedDataModel).toBeDefined();
//     expect(timebasedDataModel.count()).toBe(2);
//     const timebasedData = timebasedDataModel.find();
//     expect(timebasedData).toMatchObject([
//       {
//         timestamp: t1,
//         payload: deprotoRp,
//       }, {
//         timestamp: t2,
//         payload: deprotoRp,
//       },
//     ]);
//     expect(getQueue()).toMatchObject({
//       [flatDataId]: {
//         [t1]: deprotoRp,
//         [t2]: deprotoRp,
//       },
//     });
//   });
//
//   test('last chunk with range query', () => {
//     // init test
//     const isLast = dataStub.getBooleanProtobuf(true);
//     const m = connectedDataModel.addRecord(dataId);
//     connectedDataModel.addRequestedInterval(m, queryId, interval);
//     registerQuery(queryId, flatDataId);
//     // launch test
//     onTimebasedArchiveData(
//       queryIdProto,
//       dataIdProto,
//       isLast,
//       timestamp1,
//       protoRp,
//       timestamp2,
//       protoRp
//     );
//     // check data
//     expect(getRegisteredQuery(queryId)).toBeFalsy();
//     const cd = connectedDataModel.getByFlatDataId(flatDataId);
//     expect(cd).toMatchObject({
//       flatDataId,
//       intervals: {
//         all: [interval],
//         received: [interval],
//         requested: {},
//       },
//       lastQueries: {},
//     });
//     const timebasedDataModel = getTimebasedDataModel(flatDataId);
//     expect(timebasedDataModel).toBeDefined();
//     expect(timebasedDataModel.count()).toBe(2);
//     const timebasedData = timebasedDataModel.find();
//     expect(timebasedData).toMatchObject([
//       {
//         timestamp: t1,
//         payload: deprotoRp,
//       }, {
//         timestamp: t2,
//         payload: deprotoRp,
//       },
//     ]);
//     expect(getQueue()).toMatchObject({
//       [flatDataId]: {
//         [t1]: deprotoRp,
//         [t2]: deprotoRp,
//       },
//     });
//   });
//   test('last chunk with last query', () => {
//     // init test
//     const isLast = dataStub.getBooleanProtobuf(true);
//     const m = connectedDataModel.addRecord(dataId);
//     connectedDataModel.addLastQuery(m, queryId, interval);
//     registerQuery(queryId, flatDataId);
//     // launch test
//     onTimebasedArchiveData(
//       queryIdProto,
//       dataIdProto,
//       isLast,
//       timestamp1,
//       protoRp
//     );
//     // check data
//     expect(getRegisteredQuery(queryId)).toBeFalsy();
//     const cd = connectedDataModel.getByFlatDataId(flatDataId);
//     expect(cd).toMatchObject({
//       flatDataId,
//       intervals: {
//         all: [],
//         received: [],
//         requested: {},
//       },
//       lastQueries: { },
//     });
//     const timebasedDataModel = getTimebasedDataModel(flatDataId);
//     expect(timebasedDataModel).toBeFalsy();
//     expect(getQueue()).toMatchObject({
//       [flatDataId]: {
//         [t1]: deprotoRp,
//       },
//     });
//   });
//   test('big load', () => {
//     // init test
//     const isLast = dataStub.getBooleanProtobuf(true);
//     const queryIds = ['queryId1', 'queryId2', 'queryId3', 'queryId4', 'queryId5', 'queryId6'];
//     const intervals = [[0, 5], [0, 7], [5, 20], [12, 17], [25, 30], [42, 91]];
//     const m = connectedDataModel.addRecord(dataId);
//     connectedDataModel.addRequestedInterval(m, queryId, interval);
//     for (let i = 0; i < 6; i += 1) {
//       connectedDataModel.addRequestedInterval(flatDataId, queryIds[i], intervals[i]);
//       registerQuery(queryIds[i], flatDataId);
//     }
//     registerQuery(queryId, flatDataId);
//     // launch test
//     onTimebasedArchiveData(
//       queryIdProto,
//       dataIdProto,
//       isLast,
//       timestamp1,
//       protoRp,
//       timestamp2,
//       protoRp
//     );
//   });
// });
