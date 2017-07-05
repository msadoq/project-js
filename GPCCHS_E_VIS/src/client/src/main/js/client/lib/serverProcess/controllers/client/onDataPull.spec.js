const onDataPull = require('./onDataPull');
const { getStubData } = require('../../../utils/stubs');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const { get: getQueue, reset: resetQueue } = require('../../models/dataQueue');
const { getRemoteId, mockLoadStubs } = require('../../../common/jest');

mockLoadStubs();
const dataStub = getStubData();

describe('controllers/client/onDataPull', () => {
  beforeEach(() => {
    resetQueue();
  });

  const rp = dataStub.getReportingParameter();
  const t1 = 3;
  const t2 = 5;
  const dataId = dataStub.getDataId();
  const flatDataId = getRemoteId(dataId);
  const intervalRange = [1, 5];
  const intervalLast = [1, 10];

  const payloads = [
    { timestamp: t1, payload: rp },
    { timestamp: t2, payload: rp },
  ];
  const queryRange = {
    [flatDataId]: {
      dataId,
      last: [],
      range: [intervalRange],
    },
  };
  const queryLast = {
    [flatDataId]: {
      dataId,
      last: [intervalLast],
      range: [],
    },
  };
  const query = {
    [flatDataId]: {
      dataId,
      last: [intervalLast],
      range: [intervalRange],
    },
  };
  const noQuery = {
    noDataId: {
      dataId,
      last: [intervalLast],
      range: [intervalRange],
    },
  };
  const noIntervalQuery = {
    noDataId: {
      dataId,
      last: [[100, 105]],
      range: [[100, 105]],
    },
  };

  test('invalid query', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: noQuery });
    // check ws messages
    expect(getQueue()).toBeAnObject();
  });
  test('invalid interval', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: noIntervalQuery });
    expect(getQueue()).toBeAnObject();
  });
  test('query last', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: queryLast });
    expect(getQueue()).toMatchObject({
      [flatDataId]: {
        [payloads[1].timestamp]: payloads[1].payload,
      },
    });
  });
  test('query range', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: queryRange });
    expect(getQueue()).toMatchObject({
      [flatDataId]: {
        [payloads[0].timestamp]: payloads[0].payload,
        [payloads[1].timestamp]: payloads[1].payload,
      },
    });
  });
  test('query range and last', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: query });
    expect(getQueue()).toMatchObject({
      [flatDataId]: {
        [payloads[0].timestamp]: payloads[0].payload,
        [payloads[1].timestamp]: payloads[1].payload,
      },
    });
  });
});