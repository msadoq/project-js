const { getRemoteId } = require('../../common/jest');
const model = require('./connectedData');
const { getStubData } = require('../../utils/stubs');
const { mockLoadStubs } = require('../../common/jest');

mockLoadStubs();
const dataStub = getStubData();
describe('models/connectedData', () => {
  beforeEach(() => {
    model.cleanup();
  });

  describe('addRecord', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId(myDataId);
    test('all types', () => {
      const connectedDatum = model.addRecord(myDataId);
      const connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [],
          received: [],
          requested: {},
        },
      });
      expect(connectedData[0]).toMatchObject(connectedDatum);
    });
    test('already existing', () => {
      const cd = model.addRecord(myDataId);
      const otherCd = model.addRecord(myDataId);
      const connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      expect(connectedData[0]).toMatchObject(cd);
      expect(otherCd).toMatchObject(cd);
    });
  });

  describe('addRequestedInterval', () => {
    const myDataId = dataStub.getDataId({ parameterName: 'dataId' });
    const myDataId2 = dataStub.getDataId({ parameterName: 'dataId2' });
    const myRemoteId = getRemoteId({ parameterName: 'dataId' });
    const myRemoteId2 = getRemoteId({ parameterName: 'dataId2' });
    const myQueryId = 'queryId';
    const myInterval = [0, 4];
    const myQueryId2 = 'queryId2';
    const myInterval2 = [2, 8];

    test('one', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      expect(model.count()).toBe(1);
      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [myInterval],
          received: [],
          requested: { [myQueryId]: myInterval },
        },
      });
    });
    test('one and multi intervals', () => {
      const m = model.addRecord(myDataId);
      const cd = model.addRequestedInterval(m, myQueryId, myInterval);
      model.addRequestedInterval(m, myQueryId2, myInterval2, cd);
      expect(model.count()).toBe(1);
      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [[myInterval[0], myInterval2[1]]],
          received: [],
          requested: { [myQueryId]: myInterval, [myQueryId2]: myInterval2 },
        },
      });
    });
    test('multi', () => {
      const cd1 = model.addRecord(myDataId);
      const cd2 = model.addRecord(myDataId2);
      model.addRequestedInterval(cd1, myQueryId, myInterval);
      model.addRequestedInterval(cd2, myQueryId2, myInterval2);
      expect(model.count()).toBe(2);
      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [myInterval],
          received: [],
          requested: { [myQueryId]: myInterval },
        },
      });
      expect(connectedData[1]).toMatchObject({
        flatDataId: myRemoteId2,
        dataId: myDataId2,
        intervals: {
          all: [myInterval2],
          received: [],
          requested: { [myQueryId2]: myInterval2 },
        },
      });
    });
  });
  describe('lastQueries', () => {
    const myDataId = dataStub.getDataId({ parameterName: 'dataId' });
    const myRemoteId = getRemoteId({ parameterName: 'dataId' });
    const myQueryId = 'queryId';
    const myQueryId2 = 'queryId2';
    const myInterval = [0, 4];

    test('add', () => {
      const m = model.addRecord(myDataId);
      model.addLastQuery(m, myQueryId, myInterval);
      expect(model.count()).toBe(1);
      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [],
          received: [],
          requested: { },
        },
        lastQueries: { [myQueryId]: myInterval },
      });
      model.addLastQuery(m, myQueryId2, myInterval);
      expect(model.count()).toBe(1);
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [],
          received: [],
          requested: { },
        },
        lastQueries: { [myQueryId]: myInterval, [myQueryId2]: myInterval },
      });
    });
    test('remove', () => {
      const m = model.addRecord(myDataId);
      model.addLastQuery(m, myQueryId, myInterval);
      model.addLastQuery(m, myQueryId2, myInterval);
      const connectedDatum = model.removeLastQuery(myRemoteId, myQueryId);

      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [],
          received: [],
          requested: { },
        },
        lastQueries: { [myQueryId2]: myInterval },
      });
      expect(connectedDatum).toEqual(connectedData[0]);
    });
  });
  describe('setIntervalAsReceived', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [0, 4];
    const myQueryId2 = 'queryId2';
    const myInterval2 = [2, 8];

    test('none', () => {
      expect(() => model.setIntervalAsReceived(myRemoteId, myQueryId)).not.toThrowError();
      expect(model.count()).toBe(0);
    });

    test('not this interval', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      expect(() => model.setIntervalAsReceived(myRemoteId, undefined)).not.toThrowError();
      expect(model.count()).toBe(1);
      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [myInterval],
          received: [],
          requested: { [myQueryId]: myInterval },
        },
      });
    });

    test('one', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId);
      expect(model.count()).toBe(1);
      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [myInterval],
          received: [myInterval],
          requested: {},
        },
      });
      expect(connectedDatum).toEqual(connectedData[0]);
    });
    test('multi', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      model.addRequestedInterval(m, myQueryId2, myInterval2);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId2, m);
      expect(model.count()).toBe(1);
      const connectedData = model.find();
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [[myInterval[0], myInterval2[1]]],
          received: [[myInterval[0], myInterval2[1]]],
          requested: {},
        },
      });
      expect(connectedDatum).toEqual(connectedData[0]);
    });
  });

  describe('isRequested', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    const myRemoteId2 = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [42, 42];

    test('no connected data', () => {
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(false);
    });
    test('no', () => {
      model.addRecord(myDataId);
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(false);
    });
    test('no more', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(false);
      const m1 = model.addRecord(myDataId);
      model.addRequestedInterval(m1, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId2, myQueryId);
      expect(model.isRequested(myRemoteId2, myQueryId)).toBe(false);
    });
    test('yes', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(true);
      expect(model.isRequested(myRemoteId, myQueryId, m)).toBe(true);
      const m1 = model.addRecord(myDataId);
      model.addRequestedInterval(m1, myQueryId, myInterval);
      expect(model.isRequested(myRemoteId2, myQueryId)).toBe(true);
      expect(model.isRequested(myRemoteId2, myQueryId, m1)).toBe(true);
    });
  });
  describe('isLastQuery', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myQueryId2 = 'queryId2';
    const myInterval = [0, 5];
    test('no', () => {
      model.addRecord(myDataId);
      expect(model.isLastQuery(myRemoteId, myQueryId)).toBe(false);
    });
    test('yes', () => {
      const m = model.addRecord(myDataId);
      model.addLastQuery(m, myQueryId, myInterval);
      expect(model.isLastQuery(myRemoteId, myQueryId)).toBe(true);
    });
    test('no more', () => {
      const m = model.addRecord(myDataId);
      model.addLastQuery(m, myQueryId, myInterval);
      model.addLastQuery(m, myQueryId2, myInterval);
      model.removeLastQuery(myRemoteId, myQueryId);
      expect(model.isLastQuery(myRemoteId, myQueryId)).toBe(false);
      expect(model.isLastQuery(myRemoteId, myQueryId2)).toBe(true);
    });
  });
  describe('isTimestampInKnownIntervals', () => {
    const timestamp = Date.now();
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [timestamp - 1, timestamp + 1];
    const myWrongInterval = [timestamp + 1, timestamp + 2];

    test('no intervals', () => {
      model.addRecord(myDataId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(false);
    });
    test('no', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myWrongInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(false);
    });
    test('yes', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(true);
      expect(model.isTimestampInKnownIntervals(myRemoteId, timestamp, m)).toBe(true);
    });
    test('yes in received', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(true);
      expect(model.isTimestampInKnownIntervals(myRemoteId, timestamp, m)).toBe(true);
    });
  });

  describe('areTimestampsInKnownIntervals', () => {
    const now = Date.now();
    const timestamps = [now - 2, now];
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [now - 1, now + 1];
    const myAllInterval = [now - 5, now + 5];
    const myWrongInterval = [now + 1, now + 2];

    test('no intervals', () => {
      model.addRecord(myDataId);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual([]);
    });
    test('no', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myWrongInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual([]);
    });
    test('only one', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual([timestamps[1]]);
      expect(model.areTimestampsInKnownIntervals(myRemoteId, timestamps, m))
        .toEqual([timestamps[1]]);
    });
    test('all', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, myAllInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual(timestamps);
      expect(model.areTimestampsInKnownIntervals(myRemoteId, timestamps, m)).toEqual(timestamps);
    });
  });

  describe('retrieveMissingIntervals', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    test('no connected data', () => {
      const myInterval = [0, 10];
      model.addRecord(myDataId);
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(myInterval[1]);
    });
    test('lower', () => {
      const myInterval = [0, 2];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('lower and inner inside interval', () => {
      const myInterval = [0, 5];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(queryIntervals[0][0]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('lower and inner outside interval', () => {
      const myInterval = [0, 7];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(2);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(queryIntervals[0][0]);
      expect(intervals[1]).toHaveLength(2);
      expect(intervals[1][0]).toBe(queryIntervals[0][1]);
      expect(intervals[1][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('inner in/out', () => {
      const myInterval = [1, 3];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(m, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(queryIntervals[0][1]);
      expect(intervals[0][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('inner in-between', () => {
      const myInterval = [6.5, 7.5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(m, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('inner inside interval', () => {
      const myInterval = [4.5, 5.5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(m, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(0);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('inner out/in', () => {
      const myInterval = [3, 5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(m, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(queryIntervals[1][0]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('inner covering outside intervals', () => {
      const myInterval = [3, 7];
      const queryIds = ['1', '2', '3', '4'];
      const queryIntervals = [[0, 2], [4, 4.5], [5, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(m, queryIds[2], queryIntervals[2]);
      model.addRequestedInterval(m, queryIds[3], queryIntervals[3]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(3);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(queryIntervals[1][0]);
      expect(intervals[1]).toHaveLength(2);
      expect(intervals[1][0]).toBe(queryIntervals[1][1]);
      expect(intervals[1][1]).toBe(queryIntervals[2][0]);
      expect(intervals[2]).toHaveLength(2);
      expect(intervals[2][0]).toBe(queryIntervals[2][1]);
      expect(intervals[2][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      model.setIntervalAsReceived(myRemoteId, queryIds[3]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('inner covering inside intervals', () => {
      const myInterval = [1, 5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(m, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(queryIntervals[0][1]);
      expect(intervals[0][1]).toBe(queryIntervals[1][0]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals2);
    });
    test('inner outside interval and upper', () => {
      const myInterval = [3, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(2);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(queryIntervals[1][0]);
      expect(intervals[1]).toHaveLength(2);
      expect(intervals[1][0]).toBe(queryIntervals[1][1]);
      expect(intervals[1][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals2);
    });
    test('inner inside interval and upper', () => {
      const myInterval = [5, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(queryIntervals[1][1]);
      expect(intervals[0][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('upper', () => {
      const myInterval = [8, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
    test('covering', () => {
      const myInterval = [0, 10];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[1, 2], [4, 6], [8, 9]];
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(m, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(m, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(4);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(queryIntervals[0][0]);
      expect(intervals[1]).toHaveLength(2);
      expect(intervals[1][0]).toBe(queryIntervals[0][1]);
      expect(intervals[1][1]).toBe(queryIntervals[1][0]);
      expect(intervals[2]).toHaveLength(2);
      expect(intervals[2][0]).toBe(queryIntervals[1][1]);
      expect(intervals[2][1]).toBe(queryIntervals[2][0]);
      expect(intervals[3]).toHaveLength(2);
      expect(intervals[3][0]).toBe(queryIntervals[2][1]);
      expect(intervals[3][1]).toBe(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals2).toEqual(intervals);
    });
  });

  describe('exists', () => {
    test('yes', () => {
      const myDataId = dataStub.getDataId();
      const myRemoteId = getRemoteId();
      model.addRecord(myDataId);
      expect(model.exists(myRemoteId)).toBe(true);
    });
    test('no', () => {
      const myRemoteId = getRemoteId();
      expect(model.exists(myRemoteId)).toBe(false);
    });
  });

  describe('removeByFlatDataId', () => {
    test('not existing', () => {
      const myRemoteId = getRemoteId();
      model.removeByFlatDataId(myRemoteId);
      const connectedData = model.find();
      expect(connectedData).toHaveLength(0);
    });
    test('one', () => {
      const myDataId = dataStub.getDataId();
      const myRemoteId = getRemoteId();
      model.addRecord(myDataId);
      let connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      model.removeByFlatDataId(myRemoteId);
      connectedData = model.find();
      expect(connectedData).toHaveLength(0);
    });
    test('one by reference', () => {
      const myDataId = dataStub.getDataId();
      const myRemoteId = getRemoteId();
      const cd = model.addRecord(myDataId);
      let connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      model.removeByFlatDataId(myRemoteId, cd);
      connectedData = model.find();
      expect(connectedData).toHaveLength(0);
    });
  });

  describe('removeIntervals', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    const queryId = 'toto';
    const queryId2 = 'toto2';
    const queryId3 = 'toto3';
    const interval = [0, 10];
    const interval2 = [10, 15];
    const interval3 = [42, 91];

    test('not existing', () => {
      expect(model.removeIntervals(myRemoteId, [interval])).toHaveLength(0);
      expect(model.count()).toBe(0);
    });
    test('all intervals received', () => {
      // init test
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryId, interval);
      model.addRequestedInterval(m, queryId2, interval2);
      model.addRequestedInterval(m, queryId3, interval3);
      model.setIntervalAsReceived(myRemoteId, queryId);
      model.setIntervalAsReceived(myRemoteId, queryId2);
      model.setIntervalAsReceived(myRemoteId, queryId3);
      // launch test
      expect(model.removeIntervals(myRemoteId, [interval, interval3])).toHaveLength(0);
      const connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [[10, 15]],
          received: [[10, 15]],
          requested: {},
        },
      });
    });
    test('intervals requested', () => {
      // init test
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, queryId, interval);
      model.addRequestedInterval(m, queryId2, interval2);
      model.addRequestedInterval(m, queryId3, interval3);
      // launch test
      const queryIds = model.removeIntervals(myRemoteId, [interval, interval3], m);
      expect(queryIds).toHaveLength(2);
      expect(queryIds).toMatchObject([queryId, queryId3]);
      const connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [interval2],
          received: [],
          requested: { [queryId2]: interval2 },
        },
      });
    });
  });
  describe('getIntervals', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'toto';
    const interval = [0, 10];
    test('existing', () => {
      const m = model.addRecord(myDataId);
      model.addRequestedInterval(m, myQueryId, interval);
      expect(model.getIntervals(myRemoteId)).toMatchObject([interval]);
    });
    test('not existing', () => {
      expect(model.getIntervals(myRemoteId)).toBeFalsy();
    });
  });

  describe('getDataId', () => {
    const myDataId = dataStub.getDataId();
    const myRemoteId = getRemoteId();
    test('existing', () => {
      model.addRecord(myDataId);
      expect(model.getDataId(myRemoteId)).toBe(myDataId);
    });
    test('not existing', () => {
      expect(model.getDataId(myRemoteId)).toBeFalsy();
    });
  });

  describe('getAll', () => {
    test('none', () => {
      const connectedData = model.getAll();
      expect(connectedData).toHaveLength(0);
    });
    test('one', () => {
      const myDataId = dataStub.getDataId();
      // const myRemoteId = getRemoteId({ parameterName: 'dataId' });
      const myRemoteId = getRemoteId(myDataId);
      model.addRecord(myDataId);
      const connectedData = model.getAll();
      expect(connectedData).toHaveLength(1);
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [],
          received: [],
          requested: {},
        },
      });
    });
    test('multi', () => {
      const myDataId = dataStub.getDataId({ parameterName: 'dataId' });
      const myDataId2 = dataStub.getDataId({ parameterName: 'dataId2' });
      const myDataId3 = dataStub.getDataId({ parameterName: 'dataId3' });
      const myRemoteId = getRemoteId(myDataId);
      const myRemoteId2 = getRemoteId(myDataId2);
      const myRemoteId3 = getRemoteId(myDataId3);
      model.addRecord(myDataId);
      model.addRecord(myDataId2);
      model.addRecord(myDataId3);
      model.removeByFlatDataId(myRemoteId3);
      const connectedData = model.getAll();
      expect(connectedData).toHaveLength(2);
      expect(connectedData[0]).toMatchObject({
        flatDataId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [],
          received: [],
          requested: {},
        },
      });
      expect(connectedData[1]).toMatchObject({
        flatDataId: myRemoteId2,
        dataId: myDataId2,
        intervals: {
          all: [],
          received: [],
          requested: {},
        },
      });
    });
  });
});
