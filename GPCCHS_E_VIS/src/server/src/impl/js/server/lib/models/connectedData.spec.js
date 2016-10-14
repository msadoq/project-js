const { should } = require('../utils/test');
const model = require('./connectedData');
const { getDataId, getRemoteId } = require('../stubs/data');

describe('models/connectedData', () => {
  beforeEach(() => {
    model.cleanup();
  });

  describe('addRecord', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId(myDataId);
    it('one', () => {
      const connectedDatum = model.addRecord(myRemoteId, myDataId);
      const connectedData = model.find();
      connectedData.should.have.lengthOf(1);
      connectedData[0].should.have.properties({
        remoteId: myRemoteId,
        dataId: myDataId,
        intervals: {
          all: [],
          received: [],
          requested: {},
        },
      });
      connectedData[0].should.have.properties(connectedDatum);
    });
    it('already existing', () => {
      const cd = model.addRecord(myRemoteId, myDataId);
      const otherCd = model.addRecord(myRemoteId, 'WRONG');
      const connectedData = model.find();
      connectedData.should.have.lengthOf(1);
      connectedData[0].should.have.properties(cd);
      otherCd.should.have.properties(cd);
    });
  });

  describe('addRequestedInterval', () => {
    const myDataId = getDataId({ parameterName: 'dataId' });
    const myDataId2 = getDataId({ parameterName: 'dataId2' });
    const myRemoteId = getRemoteId({ parameterName: 'dataId' });
    const myRemoteId2 = getRemoteId({ parameterName: 'dataId2' });
    const myQueryId = 'queryId';
    const myInterval = [0, 2];
    const myQueryId2 = 'queryId2';
    const myInterval2 = [4, 8];

    it('one', () => {
      model.addRecord(myRemoteId, myDataId);
      const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array').and.have.lengthOf(1);
      connectedData[0].should.be.an('object');
      connectedData[0].should.have.an.property('remoteId')
        .that.equal(myRemoteId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('object');
      connectedData[0].intervals.should.have.a.property('all')
        .deep.equal([myInterval]);
      connectedData[0].intervals.should.have.a.property('received')
        .deep.equal([]);
      connectedData[0].intervals.should.have.an.property('requested')
        .that.is.an('object');
      connectedData[0].intervals.requested.should.have.an.property(myQueryId);
      connectedData[0].intervals.requested[myQueryId].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].intervals.requested[myQueryId][0].should.equal(myInterval[0]);
      connectedData[0].intervals.requested[myQueryId][1].should.equal(myInterval[1]);
      connectedDatum.should.deep.equal(connectedData[0]);
    });

    it('one and multi intervals', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId2, myInterval2);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object');
      connectedData[0].should.have.an.property('remoteId')
        .that.equal(myRemoteId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('object');
      connectedData[0].intervals.should.have.an.property('all')
        .that.deep.equal([myInterval, myInterval2]);
      connectedData[0].intervals.should.have.an.property('received')
        .that.deep.equal([]);
      connectedData[0].intervals.should.have.an.property('requested')
        .that.is.an('object');
      connectedData[0].intervals.requested.should.have.an.property(myQueryId);
      connectedData[0].intervals.requested[myQueryId].should.be.an('array').that.have.lengthOf(2);
      connectedData[0].intervals.requested[myQueryId][0].should.equal(myInterval[0]);
      connectedData[0].intervals.requested[myQueryId][1].should.equal(myInterval[1]);
      connectedData[0].intervals.requested.should.have.an.property(myQueryId2);
      connectedData[0].intervals.requested[myQueryId2].should.be.an('array').that.have.lengthOf(2);
      connectedData[0].intervals.requested[myQueryId2][0].should.equal(myInterval2[0]);
      connectedData[0].intervals.requested[myQueryId2][1].should.equal(myInterval2[1]);

      connectedDatum.should.deep.equal(connectedData[0]);
    });

    it('multi', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRecord(myRemoteId2, myDataId2);
      const connectedDatum1 = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const connectedDatum2 = model.addRequestedInterval(myRemoteId2, myQueryId2, myInterval2);
      model.count().should.equal(2);
      const connectedData = model.find();
      connectedData.should.be.an('array').and.have.lengthOf(2);
      connectedData[0].should.be.an('object');
      connectedData[0].should.have.an.property('remoteId')
        .that.equal(myRemoteId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('object');
      connectedData[0].intervals.should.have.an.property('all')
        .that.deep.equal([myInterval]);
      connectedData[0].intervals.should.have.an.property('received')
        .that.is.an('array').that.have.lengthOf(0);
      connectedData[0].intervals.should.have.an.property('requested')
        .that.be.an('object');
      connectedData[0].intervals.requested.should.have.an.property(myQueryId);
      connectedData[0].intervals.requested[myQueryId].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].intervals.requested[myQueryId][0].should.equal(myInterval[0]);
      connectedData[0].intervals.requested[myQueryId][1].should.equal(myInterval[1]);
      connectedData[1].should.be.an('object');
      connectedData[1].should.have.an.property('remoteId')
        .that.equal(myRemoteId2);
      connectedData[1].should.have.an.property('intervals')
        .that.is.an('object');
      connectedData[1].intervals.should.have.an.property('all')
        .that.deep.equal([myInterval2]);
      connectedData[1].intervals.should.have.an.property('received')
        .that.is.an('array').that.have.lengthOf(0);
      connectedData[1].intervals.should.have.an.property('requested')
        .that.be.an('object');
      connectedData[1].intervals.requested.should.have.an.property(myQueryId2);
      connectedData[1].intervals.requested[myQueryId2].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[1].intervals.requested[myQueryId2][0].should.equal(myInterval2[0]);
      connectedData[1].intervals.requested[myQueryId2][1].should.equal(myInterval2[1]);

      connectedDatum1.should.deep.equal(connectedData[0]);
      connectedDatum2.should.deep.equal(connectedData[1]);
    });
  });

  describe('setIntervalAsReceived', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [0, 2];

    it('none', () => {
      (() => model.setIntervalAsReceived(myRemoteId, myQueryId)).should.not.throw();
      model.count().should.equal(0);
    });

    it('not this interval', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      (() => model.setIntervalAsReceived(myRemoteId, undefined)).should.not.throw();
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object');
      connectedData[0].should.have.an.property('remoteId')
        .that.equal(myRemoteId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('object');
      connectedData[0].intervals.should.have.a.property('all')
        .that.deep.equal([myInterval]);
      connectedData[0].intervals.should.have.a.property('received')
        .that.is.an('array').that.have.lengthOf(0);
      connectedData[0].intervals.should.have.an.property('requested')
        .that.be.an('object');
      connectedData[0].intervals.requested.should.have.an.property(myQueryId);
      connectedData[0].intervals.requested[myQueryId].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].intervals.requested[myQueryId][0].should.equal(myInterval[0]);
      connectedData[0].intervals.requested[myQueryId][1].should.equal(myInterval[1]);
    });

    it('one', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object')
        .that.have.an.property('intervals');
      connectedData[0].intervals.should.be.an('object')
        .that.have.properties({
          all: [myInterval],
          received: [myInterval],
          requested: {},
        });
      connectedData[0].should.have.an.property('remoteId')
        .that.equal(myRemoteId);
      connectedDatum.should.deep.equal(connectedData[0]);
    });
  });

  describe('isRequested', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [42, 42];

    it('no connected data', () => {
      model.isRequested(myRemoteId, myQueryId).should.equal(false);
    });
    it('no', () => {
      model.addRecord(myRemoteId, myDataId);
      model.isRequested(myRemoteId, myQueryId).should.equal(false);
    });
    it('no more', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      model.isRequested(myRemoteId, myQueryId).should.equal(false);
    });
    it('yes', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.isRequested(myRemoteId, myQueryId).should.equal(true);
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
      model.addRecord(myRemoteId, myDataId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(false);
    });
    it('no', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myWrongInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(false);
    });
    it('yes', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(true);
    });
    it('yes in received', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(true);
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
      model.addRecord(myRemoteId, myDataId);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal([]);
    });
    it('no', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myWrongInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal([]);
    });
    it('only one', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal([timestamps[1]]);
    });
    it('all', () => {
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myAllInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal(timestamps);
    });
  });

  describe('retrieveMissingIntervals', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();

    it('no connected data', () => {
      const myInterval = [0, 10];
      model.addRecord(myRemoteId, myDataId);
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
    });
    it('lower', () => {
      const myInterval = [0, 2];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('lower and inner inside interval', () => {
      const myInterval = [0, 5];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(queryIntervals[0][0]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('lower and inner outside interval', () => {
      const myInterval = [0, 7];
      const queryIds = ['1', '2'];
      const queryIntervals = [[4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(2);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(queryIntervals[0][0]);
      intervals[1].should.be.an('array').that.has.lengthOf(2);
      intervals[1][0].should.equal(queryIntervals[0][1]);
      intervals[1][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('inner in/out', () => {
      const myInterval = [1, 3];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(queryIntervals[0][1]);
      intervals[0][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('inner in-between', () => {
      const myInterval = [6.5, 7.5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('inner inside interval', () => {
      const myInterval = [4.5, 5.5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(0);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('inner out/in', () => {
      const myInterval = [3, 5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array')
        .that.has.lengthOf(1);
      intervals[0].should.be.an('array')
        .that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(queryIntervals[1][0]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('inner covering outside intervals', () => {
      const myInterval = [3, 7];
      const queryIds = ['1', '2', '3', '4'];
      const queryIntervals = [[0, 2], [4, 4.5], [5, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      model.addRequestedInterval(myRemoteId, queryIds[3], queryIntervals[3]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array')
        .that.has.lengthOf(3);
      intervals[0].should.be.an('array')
        .that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(queryIntervals[1][0]);
      intervals[1].should.be.an('array')
        .that.has.lengthOf(2);
      intervals[1][0].should.equal(queryIntervals[1][1]);
      intervals[1][1].should.equal(queryIntervals[2][0]);
      intervals[2].should.be.an('array')
        .that.has.lengthOf(2);
      intervals[2][0].should.equal(queryIntervals[2][1]);
      intervals[2][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      model.setIntervalAsReceived(myRemoteId, queryIds[3]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('inner covering inside intervals', () => {
      const myInterval = [1, 5];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[0, 2], [4, 6], [8, 10]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(queryIntervals[0][1]);
      intervals[0][1].should.equal(queryIntervals[1][0]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals2);
    });
    it('inner outside interval and upper', () => {
      const myInterval = [3, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(2);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(queryIntervals[1][0]);
      intervals[1].should.be.an('array').that.has.lengthOf(2);
      intervals[1][0].should.equal(queryIntervals[1][1]);
      intervals[1][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals2);
    });
    it('inner inside interval and upper', () => {
      const myInterval = [5, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(queryIntervals[1][1]);
      intervals[0][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('upper', () => {
      const myInterval = [8, 10];
      const queryIds = ['1', '2'];
      const queryIntervals = [[0, 2], [4, 6]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
    it('covering', () => {
      const myInterval = [0, 10];
      const queryIds = ['1', '2', '3'];
      const queryIntervals = [[1, 2], [4, 6], [8, 9]];
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryIds[0], queryIntervals[0]);
      model.addRequestedInterval(myRemoteId, queryIds[1], queryIntervals[1]);
      model.addRequestedInterval(myRemoteId, queryIds[2], queryIntervals[2]);
      // In requested
      const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals.should.be.an('array').that.has.lengthOf(4);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(queryIntervals[0][0]);
      intervals[1].should.be.an('array').that.has.lengthOf(2);
      intervals[1][0].should.equal(queryIntervals[0][1]);
      intervals[1][1].should.equal(queryIntervals[1][0]);
      intervals[2].should.be.an('array').that.has.lengthOf(2);
      intervals[2][0].should.equal(queryIntervals[1][1]);
      intervals[2][1].should.equal(queryIntervals[2][0]);
      intervals[3].should.be.an('array').that.has.lengthOf(2);
      intervals[3][0].should.equal(queryIntervals[2][1]);
      intervals[3][1].should.equal(myInterval[1]);
      // In received
      model.setIntervalAsReceived(myRemoteId, queryIds[0]);
      model.setIntervalAsReceived(myRemoteId, queryIds[1]);
      model.setIntervalAsReceived(myRemoteId, queryIds[2]);
      const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
      intervals2.should.deep.equal(intervals);
    });
  });

  describe('exists', () => {
    it('yes', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId();
      model.addRecord(myRemoteId, myDataId);
      model.exists(myRemoteId)
        .should.be.an('boolean')
        .that.equal(true);
    });
    it('no', () => {
      const myRemoteId = getRemoteId();
      model.exists(myRemoteId)
        .should.be.an('boolean')
        .that.equal(false);
    });
  });

  describe('removeByRemoteId', () => {
    it('not existing', () => {
      const myRemoteId = getRemoteId();
      model.removeByRemoteId(myRemoteId);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId();
      model.addRecord(myRemoteId, myDataId);
      let connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      model.removeByRemoteId(myRemoteId);
      connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
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
      model.removeIntervals(myRemoteId, [interval]).should.have.lengthOf(0);
      model.count().should.equal(0);
    });
    it('all intervals received', () => {
      // init test
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryId, interval);
      model.addRequestedInterval(myRemoteId, queryId2, interval2);
      model.addRequestedInterval(myRemoteId, queryId3, interval3);
      model.setIntervalAsReceived(myRemoteId, queryId);
      model.setIntervalAsReceived(myRemoteId, queryId2);
      model.setIntervalAsReceived(myRemoteId, queryId3);
      // launch test
      model.removeIntervals(myRemoteId, [interval, interval3]).should.have.lengthOf(0);
      const connectedData = model.find();
      connectedData.should.have.lengthOf(1);
      connectedData[0].should.have.properties({
        remoteId: myRemoteId,
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
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, queryId, interval);
      model.addRequestedInterval(myRemoteId, queryId2, interval2);
      model.addRequestedInterval(myRemoteId, queryId3, interval3);
      // launch test
      const queryIds = model.removeIntervals(myRemoteId, [interval, interval3]);
      queryIds.should.have.lengthOf(2);
      queryIds.should.have.properties([queryId, queryId3]);
      const connectedData = model.find();
      connectedData.should.have.lengthOf(1);
      connectedData[0].should.have.properties({
        remoteId: myRemoteId,
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
      model.addRecord(myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, interval);
      model.getIntervals(myRemoteId).should.have.properties([interval]);
    });
    it('not existing', () => {
      model.getIntervals(myRemoteId).should.have.lengthOf(0);
    });
  });

  describe('getDataId', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    it('existing', () => {
      model.addRecord(myRemoteId, myDataId);
      model.getDataId(myRemoteId).should.equal(myDataId);
    });
    it('not existing', () => {
      should.not.exist(model.getDataId(myRemoteId));
    });
  });

  describe('getAll', () => {
    it('none', () => {
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId({ parameterName: 'dataId' });
      model.addRecord(myRemoteId, myDataId);
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object')
        .that.has.properties({
          remoteId: myRemoteId,
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
      const myRemoteId = getRemoteId({ parameterName: 'dataId' });
      const myRemoteId2 = getRemoteId({ parameterName: 'dataId2' });
      const myRemoteId3 = getRemoteId({ parameterName: 'dataId3' });
      model.addRecord(myRemoteId, myDataId);
      model.addRecord(myRemoteId2, myDataId2);
      model.addRecord(myRemoteId3, myDataId3);
      model.removeByRemoteId(myRemoteId3);
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].should.be.an('object')
        .that.has.properties({
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [],
            received: [],
            requested: {},
          },
        });
      connectedData[1].should.be.an('object')
        .that.has.properties({
          remoteId: myRemoteId2,
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
