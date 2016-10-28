const { should } = require('../utils/test');
const model = require('./connectedData');
const { getDataId, getRemoteId } = require('../stubs/data');
const { constants: globalConstants } = require('common');

describe('models/connectedData', () => {
  beforeEach(() => {
    model.cleanup();
  });

  describe('addRecord', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId(myDataId);
    it('last type', () => {
      const connectedDatum = model.addRecord(
        globalConstants.DATASTRUCTURE_LAST,
        myRemoteId,
        myDataId
      );
      const connectedData = model.find();
      connectedData.should.have.lengthOf(1);
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURE_LAST,
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
    it('range type', () => {
      const connectedDatum = model.addRecord(
        globalConstants.DATASTRUCTURE_RANGE,
        myRemoteId,
        myDataId
      );
      const connectedData = model.find();
      connectedData.should.have.lengthOf(1);
      connectedData[0].should.have.properties({
        type: globalConstants.DATASTRUCTURE_RANGE,
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
    it('wrong type', () => {
      (() => model.addRecord('toto', myRemoteId, myDataId)).should.throw();
      const connectedData = model.find();
      connectedData.should.have.lengthOf(0);
    });
    it('already existing', () => {
      const cd = model.addRecord(
        globalConstants.DATASTRUCTURE_RANGE,
        myRemoteId,
        myDataId
      );
      const otherCd = model.addRecord(
        globalConstants.DATASTRUCTURE_LAST,
        myRemoteId,
        myDataId
      );
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
    const myInterval = [0, 4];
    const myQueryId2 = 'queryId2';
    const myInterval2 = [2, 8];

    describe('LAST', () => {
      it('one', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [],
            requested: { [myQueryId]: myInterval },
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
      it('one and multi intervals', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId2, myInterval2, cd);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval, myInterval2],
            received: [],
            requested: { [myQueryId]: myInterval, [myQueryId2]: myInterval2 },
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
      it('multi', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        const cd2 = model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId2, myDataId2);
        const connectedDatum1 = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        const connectedDatum2 = model.addRequestedInterval(
          myRemoteId,
          myQueryId2,
          myInterval2,
          cd2
        );
        model.count().should.equal(2);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [],
            requested: { [myQueryId]: myInterval },
          },
        });
        connectedData[1].should.have.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
          remoteId: myRemoteId2,
          dataId: myDataId2,
          intervals: {
            all: [myInterval2],
            received: [],
            requested: { [myQueryId2]: myInterval2 },
          },
        });
        connectedDatum1.should.deep.equal(connectedData[0]);
        connectedDatum2.should.deep.equal(connectedData[1]);
      });
    });
    describe('RANGE', () => {
      it('one', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
        const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_RANGE,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [],
            requested: { [myQueryId]: myInterval },
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
      it('one and multi intervals', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
        const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        const connectedDatum = model.addRequestedInterval(myRemoteId, myQueryId2, myInterval2, cd);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_RANGE,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [[myInterval[0], myInterval2[1]]],
            received: [],
            requested: { [myQueryId]: myInterval, [myQueryId2]: myInterval2 },
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
      it('multi', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
        const cd2 = model.addRecord(
          globalConstants.DATASTRUCTURE_RANGE,
          myRemoteId2,
          myDataId2
        );
        const connectedDatum1 = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        const connectedDatum2 = model.addRequestedInterval(
          myRemoteId,
          myQueryId2,
          myInterval2,
          cd2
        );
        model.count().should.equal(2);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_RANGE,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [],
            requested: { [myQueryId]: myInterval },
          },
        });
        connectedData[1].should.have.properties({
          type: globalConstants.DATASTRUCTURE_RANGE,
          remoteId: myRemoteId2,
          dataId: myDataId2,
          intervals: {
            all: [myInterval2],
            received: [],
            requested: { [myQueryId2]: myInterval2 },
          },
        });
        connectedDatum1.should.deep.equal(connectedData[0]);
        connectedDatum2.should.deep.equal(connectedData[1]);
      });
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
      (() => model.setIntervalAsReceived(myRemoteId, myQueryId)).should.not.throw();
      model.count().should.equal(0);
    });

    describe('LAST', () => {
      it('not this interval', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        (() => model.setIntervalAsReceived(myRemoteId, undefined)).should.not.throw();
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [],
            requested: { [myQueryId]: myInterval },
          },
        });
      });

      it('one', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [myInterval],
            requested: {},
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
      it('multi', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        model.addRequestedInterval(myRemoteId, myQueryId2, myInterval2);
        model.setIntervalAsReceived(myRemoteId, myQueryId);
        const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId2, cd);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval, myInterval2],
            received: [myInterval, myInterval2],
            requested: {},
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
    });
    describe('RANGE', () => {
      it('not this interval', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
        model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        (() => model.setIntervalAsReceived(myRemoteId, undefined)).should.not.throw();
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_RANGE,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [],
            requested: { [myQueryId]: myInterval },
          },
        });
      });

      it('one', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
        model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_RANGE,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [myInterval],
            received: [myInterval],
            requested: {},
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
      it('multi', () => {
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
        const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        model.addRequestedInterval(myRemoteId, myQueryId2, myInterval2);
        model.setIntervalAsReceived(myRemoteId, myQueryId);
        const connectedDatum = model.setIntervalAsReceived(myRemoteId, myQueryId2, cd);
        model.count().should.equal(1);
        const connectedData = model.find();
        connectedData[0].should.have.properties({
          type: globalConstants.DATASTRUCTURE_RANGE,
          remoteId: myRemoteId,
          dataId: myDataId,
          intervals: {
            all: [[myInterval[0], myInterval2[1]]],
            received: [[myInterval[0], myInterval2[1]]],
            requested: {},
          },
        });
        connectedDatum.should.deep.equal(connectedData[0]);
      });
    });
  });

  describe('isRequested', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myRemoteId2 = getRemoteId();
    const myQueryId = 'queryId';
    const myInterval = [42, 42];

    it('no connected data', () => {
      model.isRequested(myRemoteId, myQueryId).should.equal(false);
    });
    it('no', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      model.isRequested(myRemoteId, myQueryId).should.equal(false);
      model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId2, myDataId);
      model.isRequested(myRemoteId2, myQueryId).should.equal(false);
    });
    it('no more', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      model.isRequested(myRemoteId, myQueryId).should.equal(false);
      model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId2, myDataId);
      model.addRequestedInterval(myRemoteId2, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId2, myQueryId);
      model.isRequested(myRemoteId2, myQueryId).should.equal(false);
    });
    it('yes', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.isRequested(myRemoteId, myQueryId).should.equal(true);
      model.isRequested(myRemoteId, myQueryId, cd).should.equal(true);
      model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId2, myDataId);
      const cd2 = model.addRequestedInterval(myRemoteId2, myQueryId, myInterval);
      model.isRequested(myRemoteId2, myQueryId).should.equal(true);
      model.isRequested(myRemoteId2, myQueryId, cd2).should.equal(true);
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
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(false);
    });
    it('no', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myWrongInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(false);
    });
    it('yes', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(true);
      model.isTimestampInKnownIntervals(myRemoteId, timestamp, cd).should.be.an('boolean').and.be.equal(true);
    });
    it('yes in received', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      model.setIntervalAsReceived(myRemoteId, myQueryId);
      const result = model.isTimestampInKnownIntervals(myRemoteId, timestamp);
      result.should.be.an('boolean').and.be.equal(true);
      model.isTimestampInKnownIntervals(myRemoteId, timestamp, cd).should.be.an('boolean').and.be.equal(true);
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
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal([]);
    });
    it('no', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, myWrongInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal([]);
    });
    it('only one', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal([timestamps[1]]);
      model.areTimestampsInKnownIntervals(myRemoteId, timestamps, cd).should.deep.equal([timestamps[1]]);
    });
    it('all', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const cd = model.addRequestedInterval(myRemoteId, myQueryId, myAllInterval);
      const result = model.areTimestampsInKnownIntervals(myRemoteId, timestamps);
      result.should.deep.equal(timestamps);
      model.areTimestampsInKnownIntervals(myRemoteId, timestamps, cd).should.deep.equal(timestamps);
    });
  });

  describe('retrieveMissingIntervals', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    describe('LAST', () => {
      it('no connected data', () => {
        const myInterval = [0, 10];
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
        intervals.should.have.properties([myInterval]);
      });
      it('one', () => {
        const myInterval = [0, 10];
        const myQueryId = 'id';
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        // In requested
        model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
        intervals.should.have.properties([]);
        // In requested
        model.setIntervalAsReceived(myRemoteId, myQueryId);
        const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
        intervals2.should.have.properties([]);
      });
      it('multi', () => {
        const myInterval = [0, 10];
        const myQueryId = 'myId';
        const queryId1 = 'id1';
        const queryId2 = 'id2';
        const interval1 = [5, 15];
        const interval2 = [0, 30];
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        // In requested
        model.addRequestedInterval(myRemoteId, myQueryId, myInterval);
        model.addRequestedInterval(myRemoteId, queryId1, interval1);
        model.addRequestedInterval(myRemoteId, queryId2, interval2);
        const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
        intervals.should.have.properties([]);
        // In requested
        model.setIntervalAsReceived(myRemoteId, myQueryId);
        model.setIntervalAsReceived(myRemoteId, queryId1);
        model.setIntervalAsReceived(myRemoteId, queryId2);
        const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
        intervals2.should.have.properties([]);
      });
      it('none', () => {
        const myInterval = [0, 10];
        const queryId1 = 'id1';
        const queryId2 = 'id2';
        const interval1 = [5, 15];
        const interval2 = [0, 30];
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        // In requested
        model.addRequestedInterval(myRemoteId, queryId1, interval1);
        model.addRequestedInterval(myRemoteId, queryId2, interval2);
        const intervals = model.retrieveMissingIntervals(myRemoteId, myInterval);
        intervals.should.have.properties([myInterval]);
        // In requested
        model.setIntervalAsReceived(myRemoteId, queryId1);
        model.setIntervalAsReceived(myRemoteId, queryId2);
        const intervals2 = model.retrieveMissingIntervals(myRemoteId, myInterval);
        intervals2.should.have.properties([myInterval]);
      });
    });
    describe('RANGE', () => {
      it('no connected data', () => {
        const myInterval = [0, 10];
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
  });

  describe('exists', () => {
    it('yes', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId();
      model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
      model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
      let connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      model.removeByRemoteId(myRemoteId);
      connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one by reference', () => {
      const myDataId = getDataId();
      const myRemoteId = getRemoteId();
      const cd = model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
      let connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      model.removeByRemoteId(myRemoteId, cd);
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
    describe('LAST', () => {
      it('all intervals received', () => {
        // init test
        model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
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
        const cd = model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
        model.addRequestedInterval(myRemoteId, queryId, interval);
        model.addRequestedInterval(myRemoteId, queryId2, interval2);
        model.addRequestedInterval(myRemoteId, queryId3, interval3);
        // launch test
        const queryIds = model.removeIntervals(myRemoteId, [interval, interval3], cd);
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
    describe('RANGE', () => {
      it('all intervals received', () => {
        // init test
        model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
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
        const cd = model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId, myDataId);
        model.addRequestedInterval(myRemoteId, queryId, interval);
        model.addRequestedInterval(myRemoteId, queryId2, interval2);
        model.addRequestedInterval(myRemoteId, queryId3, interval3);
        // launch test
        const queryIds = model.removeIntervals(myRemoteId, [interval, interval3], cd);
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
  });

  describe('getIntervals', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    const myQueryId = 'toto';
    const interval = [0, 10];
    it('existing', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      model.addRequestedInterval(myRemoteId, myQueryId, interval);
      model.getIntervals(myRemoteId).should.have.properties([interval]);
    });
    it('not existing', () => {
      should.not.exist(model.getIntervals(myRemoteId));
    });
  });

  describe('getDataId', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId();
    it('existing', () => {
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
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
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object')
        .that.has.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
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
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId, myDataId);
      model.addRecord(globalConstants.DATASTRUCTURE_RANGE, myRemoteId2, myDataId2);
      model.addRecord(globalConstants.DATASTRUCTURE_LAST, myRemoteId3, myDataId3);
      model.removeByRemoteId(myRemoteId3);
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].should.be.an('object')
        .that.has.properties({
          type: globalConstants.DATASTRUCTURE_LAST,
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
          type: globalConstants.DATASTRUCTURE_RANGE,
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
