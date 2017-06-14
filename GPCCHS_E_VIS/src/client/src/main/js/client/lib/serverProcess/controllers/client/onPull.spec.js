const {
  add: addToDataQueue,
  reset: resetDataQueue,
  get: getDataQueue,
} = require('../../models/dataQueue');
const onPull = require('./onPull');
const dataStub = require('common/protobuf/stubs');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');

describe('controllers/client/onPull', () => {
  beforeEach(() => {
    resetDataQueue();
  });
  test('should support empty', (done) => {
    const queries = { };
    const myQueryId = 'myQueryId';
    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        { data: {} },
      ]);
      done();
    };
    onPull(check, myQueryId, { queries });
  });
  test('should return data already in queue', (done) => {
    const myRemoteId = 'myRemoteId';
    const myQueryId = 'myQueryId';
    const myValue = 'myValue';
    const timestamp = 5;
    const queries = { };

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          data: {
            [myRemoteId]: {
              [timestamp]: myValue,
            },
          },
        },
      ]);
      expect(getDataQueue()).toEqual({});
      done();
    };

    addToDataQueue(myRemoteId, timestamp, myValue);
    onPull(check, myQueryId, { queries });
  });
  test('should return requested data', (done) => {
    const myRemoteId = 'myRemoteId';
    const myQueryId = 'myQueryId';
    const rp = dataStub.getReportingParameter();
    const t1 = 3;
    const t2 = 5;
    const t3 = 1;
    const intervalRange = [1, 4];
    const intervalLast = [3, 5];

    const payloads = [
      { timestamp: t1, payload: rp },
      { timestamp: t2, payload: rp },
      { timestamp: t3, payload: rp },
    ];

    const queries = {
      [myRemoteId]: {
        range: [intervalRange],
        last: [intervalLast],
      },
    };
    const timebasedDataModel = getOrCreateTimebasedDataModel(myRemoteId);
    timebasedDataModel.addRecords(payloads);

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          data: {
            [myRemoteId]: {
              [payloads[0].timestamp]: payloads[0].payload,
              [payloads[1].timestamp]: payloads[1].payload,
              [payloads[2].timestamp]: payloads[2].payload,
            },
          },
        },
      ]);
      expect(getDataQueue()).toEqual({});
      done();
    };

    onPull(check, myQueryId, { queries });
  });
});
