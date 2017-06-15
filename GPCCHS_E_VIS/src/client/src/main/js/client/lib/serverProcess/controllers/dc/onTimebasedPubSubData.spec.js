const { registerProtobuf } = require('../../../common/test');

registerProtobuf();

const { getRemoteId } = require('../../../common/test');
const onTimebasedPubSubData = require('./onTimebasedPubSubData');
const {
  clearFactory,
  getTimebasedDataModel,
  getAllTimebasedDataModelRemoteIds,
} = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const dataStub = require('common/protobuf/stubs');
const { get: getQueue, reset: resetQueue } = require('../../models/dataQueue');
const {
  get: getLastPubSubTimestamp,
  reset: resetLastPubSubTimestamp,
} = require('../../models/lastPubSubTimestamp');

/* onTimebasedPubSubData Test
 *
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 *
 */

describe('controllers/utils/onTimebasedPubSubData', () => {
  beforeEach(() => {
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
  const halfInterval = [-15, 5];
  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const rp = dataStub.getReportingParameter({ onboardDate: t1 });
  const rp2 = dataStub.getReportingParameter({ onboardDate: t2 });
  const protoRp = dataStub.getReportingParameterProtobuf(rp);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);
  const deprotoRp = dataStub.getReportingParameterDeProtobuf(protoRp);

  const remoteId = getRemoteId(Object.assign({}, dataId));
  const remoteId2 = getRemoteId(Object.assign({}, dataId, { domainId: 201 }));

  test('no dataId in subscriptions', () => {
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
    expect(getAllTimebasedDataModelRemoteIds()).toHaveLength(0);
    expect(getQueue()).toBeAnObject();
    expect(getLastPubSubTimestamp()).toBeFalsy();
  });

  test('no query for this dataId', () => {
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
    expect(getAllTimebasedDataModelRemoteIds()).toHaveLength(0);
    expect(getQueue()).toBeAnObject();
    expect(getLastPubSubTimestamp()).toBeFalsy();
  });

  test('one in interval', () => {
    // init test
    connectedDataModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(remoteId, queryId, halfInterval);
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
    expect(getTimebasedDataModel(remoteId2)).toBeFalsy();
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    expect(timebasedDataModel).toBeDefined();
    expect(timebasedDataModel.count()).toBe(1);
    const tbd = timebasedDataModel.find();
    expect(tbd[0]).toMatchObject({
      timestamp: t1,
      payload: deprotoRp,
    });
    expect(getQueue()).toMatchObject({
      [remoteId]: {
        [t1]: deprotoRp,
      },
    });
    expect(getLastPubSubTimestamp()).toBe(t2);
  });
});
