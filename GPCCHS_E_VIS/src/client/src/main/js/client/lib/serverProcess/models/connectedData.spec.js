const model = require('./connectedData');
const { getDataId, getRemoteId } = require('common/protobuf/stubs');

describe('models/connectedData', () => {
  beforeEach(() => {
    model.cleanup();
  });

  describe('addRecord', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId(myDataId);
    it('all types', () => {
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
    it('already existing', () => {
      const cd = model.addRecord(myDataId);
      const otherCd = model.addRecord(myDataId);
      const connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      expect(connectedData[0]).toMatchObject(cd);
      expect(otherCd).toMatchObject(cd);
    });
  });

  describe('addRequestedInterval', () => {
    const myDataId = getDataId({ parameterName: 'dataId' });
    const myDataId2 = getDataId({ parameterName: 'dataId2' });
    const myRemoteId = getRemoteId({ parameterName: 'dataId' });
    const myRemoteId2 = getRemoteId({ parameterName: 'dataId2' });
    const myQueryId = 'queryId';
    const myInterval = [0, 4];
    const myQueryId2 = 'queryId2';
    const myInterval2 = [2, 8];

    it('one', () => {
      model.addRecord(myDataId);
      const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
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
      expect(connectedDatum).toEqual(connectedData[0]);
    });
    it('one and multi intervals', () => {
      model.addRecord(myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId2, myInterval2, cd);
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
      expect(connectedDatum).toEqual(connectedData[0]);
    });
    it('multi', () => {
      model.addRecord(myDataId);
      const cd2 = model.addRecord(myDataId2);
      const connectedDatum1 = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const connectedDatum2 = model.addRequestedInterval(
        myRemoteId,
        myQueryId2,
        myInterval2,
        cd2
      );
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
      expect(connectedDatum1).toEqual(connectedData[0]);
      expect(connectedDatum2).toEqual(connectedData[1]);
    });
  });
  describe('lastQueries', () => {
    const myDataId = getDataId({ parameterName: 'dataId' });
    const myRemoteId = getRemoteId({ parameterName: 'dataId' });
    const myQueryId = 'queryId';
    const myQueryId2 = 'queryId2';
    const myInterval = [0, 4];

    it('add', () => {
      model.addRecord(myDataId);
      const connectedDatum = model.addLastQuery(myRemoteId, myQueryId, myInterval);
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
      expect(connectedDatum).toEqual(connectedData[0]);
      const connectedDatum2 = model.addLastQuery(myRemoteId, myQueryId2, myInterval);
      expect(model.count()).toBe(1);
      const connectedData2 = model.find();
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
      expect(connectedDatum2).toEqual(connectedData2[0]);
    });
    it('remove', () => {
      model.addRecord(myDataId);
      model.addLastQuery(myRemoteId, myQueryId, myInterval);
      model.addLastQuery(myRemoteId, myQueryId2, myInterval);
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
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [0, 4];
    const myQueryId2 = 'queryId2';
    const myInterval2 = [2, 8];

    it('none', () => {
      expect(() => model.setIntervalAsReceived(myRemoteId, myQueryId)).not.toThrowError();
      expect(model.count()).toBe(0);
    });

    it('not this interval', () => {
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
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

    it('one', () => {
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
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
    it('multi', () => {
      model.addRecord(myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.addRequestedInterval(myRemoteId, myQueryId2, myInterval2);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId2, cd);
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
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myRemoteId2 = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [42, 42];

    it('no connected data', () => {
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(false);
    });
    it('no', () => {
      model.addRecord(myDataId);
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(false);
    });
    it('no more', () => {
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(false);
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId2, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId2, myQueryId);
      expect(model.isRequested(myRemoteId2, myQueryId)).toBe(false);
    });
    it('yes', () => {
      model.addRecord(myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      expect(model.isRequested(myRemoteId, myQueryId)).toBe(true);
      expect(model.isRequested(myRemoteId, myQueryId, cd)).toBe(true);
      model.addRecord(myDataId);
      const cd2 = model.addRequestedInterval(myRemoteId2, myQueryId, myInterval);
      expect(model.isRequested(myRemoteId2, myQueryId)).toBe(true);
      expect(model.isRequested(myRemoteId2, myQueryId, cd2)).toBe(true);
    });
  });
  describe('isLastQuery', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myQueryId2 = 'queryId2';
    const myInterval = [0, 5];
    it('no', () => {
      model.addRecord(myDataId);
      expect(model.isLastQuery(myRemoteId, myQueryId)).toBe(false);
    });
    it('yes', () => {
      model.addRecord(myDataId);
      model.addLastQuery(myRemoteId, myQueryId, myInterval);
      expect(model.isLastQuery(myRemoteId, myQueryId)).toBe(true);
    });
    it('no more', () => {
      model.addRecord(myDataId);
      model.addLastQuery(myRemoteId, myQueryId, myInterval);
      model.addLastQuery(myRemoteId, myQueryId2, myInterval);
      model.removeLastQuery(myRemoteId, myQueryId);
      expect(model.isLastQuery(myRemoteId, myQueryId)).toBe(false);
      expect(model.isLastQuery(myRemoteId, myQueryId2)).toBe(true);
    });
  });
  describe('isTimestampInKnownIntervals', () => {
    const timestamp = Date.now();
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [timestamp - 1, timestamp + 1];
    const myWrongInterval = [timestamp + 1, timestamp + 2];

    it('no intervals', () => {
      model.addRecord(myDataId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(false);
    });
    it('no', () => {
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myWrongInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(false);
    });
    it('yes', () => {
      model.addRecord(myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(true);
      expect(model.isTimestampInKnownIntervals(myRemoteId, timestamp, cd)).toBe(true);
    });
    it('yes in received', () => {
      model.addRecord(myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      expect(result).toBe(true);
      expect(model.isTimestampInKnownIntervals(myRemoteId, timestamp, cd)).toBe(true);
    });
  });

  describe('areTimestampsInKnownIntervals', () => {
    const now = Date.now();
    const timestamps = [now - 2, now];
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [now - 1, now + 1];
    const myAllInterval = [now - 5, now + 5];
    const myWrongInterval = [now + 1, now + 2];

    it('no intervals', () => {
      model.addRecord(myDataId);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual([]);
    });
    it('no', () => {
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myWrongInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual([]);
    });
    it('only one', () => {
      model.addRecord(myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual([timestamps[1]]);
      expect(model.areTimestampsInKnownIntervals(myRemoteId, timestamps, cd))
        .toEqual([timestamps[1]]);
    });
    it('all', () => {
      model.addRecord(myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myAllInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      expect(result).toEqual(timestamps);
      expect(model.areTimestampsInKnownIntervals(myRemoteId, timestamps, cd)).toEqual(timestamps);
    });
  });

  describe('retrieveMissingIntervals', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    it('no connected data', () => {
      const myInterval = [0, 10];
      model.addRecord(myDataId);
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      expect(intervals).toHaveLength(1);
      expect(intervals[0]).toHaveLength(2);
      expect(intervals[0][0]).toBe(myInterval[0]);
      expect(intervals[0][1]).toBe(myInterval[1]);
    });
    it('lower', () => {
      const myInterval = [0, 2];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
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
    it('lower and inner inside interval', () => {
      const myInterval = [0, 5];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
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
    it('lower and inner outside interval', () => {
      const myInterval = [0, 7];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
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
    it('inner in/out', () => {
      const myInterval = [1, 3];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
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
    it('inner in-between', () => {
      const myInterval = [6.5, 7.5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
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
    it('inner inside interval', () => {
      const myInterval = [4.5, 5.5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
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
    it('inner out/in', () => {
      const myInterval = [3, 5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
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
    it('inner covering outside intervals', () => {
      const myInterval = [3, 7];
      const queryIds = ['1', '2', '3', '4'];
      const queryIntervals = [[0, 2], [4, 4.5], [5, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      model.addRequestedInterval(myRemoteId, queryIds[3], queryIntervals[3]);
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
    it('inner covering inside intervals', () => {
      const myInterval = [1, 5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
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
    it('inner outside interval and upper', () => {
      const myInterval = [3, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
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
    it('inner inside interval and upper', () => {
      const myInterval = [5, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
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
    it('upper', () => {
      const myInterval = [8, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
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
    it('covering', () => {
      const myInterval = [0, 10];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[1, 2], [4, 6], [8, 9]];
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
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
    it('yes', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId();
      model.addRecord(myDataId);
      expect(model.exists(myRemoteId)).toBe(true);
    });
    it('no', () => {
      const myRemoteId = getRemoteId();
      expect(model.exists(myRemoteId)).toBe(false);
    });
  });

  describe('removeByFlatDataId', () => {
    it('not existing', () => {
      const myRemoteId = getRemoteId();
      model.removeByFlatDataId(myRemoteId);
      const connectedData = model.find();
      expect(connectedData).toHaveLength(0);
    });
    it('one', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId();
      model.addRecord(myDataId);
      let connectedData = model.find();
      expect(connectedData).toHaveLength(1);
      model.removeByFlatDataId(myRemoteId);
      connectedData = model.find();
      expect(connectedData).toHaveLength(0);
    });
    it('one by reference', () => {
      const myDataId = getDataId();
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
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const queryId = 'toto';
    const queryId2 = 'toto2';
    const queryId3 = 'toto3';
    const interval = [0, 10];
    const interval2 = [10, 15];
    const interval3 = [42, 91];
    it('not existing', () => {
      expect(model.removeIntervals(myRemoteId, [interval])).toHaveLength(0);
      expect(model.count()).toBe(0);
    });
    it('all intervals received', () => {
      // init test
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryId, interval);
      model.addRequestedInterval(myRemoteId, queryId2, interval2);
      model.addRequestedInterval(myRemoteId, queryId3, interval3);
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
    it('intervals requested', () => {
      // init test
      const cd = model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, queryId, interval);
      model.addRequestedInterval(myRemoteId, queryId2, interval2);
      model.addRequestedInterval(myRemoteId, queryId3, interval3);
      // launch test
      const queryIds = model.removeIntervals(myRemoteId, [interval, interval3], cd);
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
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'toto';
    const interval = [0, 10];
    it('existing', () => {
      model.addRecord(myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, interval);
      expect(model.getIntervals(myRemoteId)).toMatchObject([interval]);
    });
    it('not existing', () => {
      expect(model.getIntervals(myRemoteId)).toBeFalsy();
    });
  });

  describe('getDataId', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    it('existing', () => {
      model.addRecord(myDataId);
      expect(model.getDataId(myRemoteId)).toBe(myDataId);
    });
    it('not existing', () => {
      expect(model.getDataId(myRemoteId)).toBeFalsy();
    });
  });

  describe('getAll', () => {
    it('none', () => {
      const connectedData = model.getAll();
      expect(connectedData).toHaveLength(0);
    });
    it('one', () => {
      const myDataId = getDataId();
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
    it('multi', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      const myDataId2 = getDataId({ parameterName: 'dataId2' });
      const myDataId3 = getDataId({ parameterName: 'dataId3' });
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
