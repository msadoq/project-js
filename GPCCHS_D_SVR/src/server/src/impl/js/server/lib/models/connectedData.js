const debug = require('../io/debug')('models:connectedData');
const database = require('../io/loki');
const { isTimestampInInterval, mergeIntervals } = require('../utils/intervals');
const { inspect } = require('util');
const _ = require('lodash');

const collection = database.addCollection(
  'connectedData',
  {
    unique: [
      'dataId',
    ],
  }
);

collection.getLocalId = require('./getLocalId');

collection.isTimestampInKnownIntervals = (dataId, timestamp) => {
  // Check if timestamp is currently in intervals known or requested for this dataId
  const connectedData = collection.by('dataId', dataId);
  if (connectedData !== undefined) {
    _.map(connectedData.intervals, (interval) => {
      debug.debug('known interval', inspect(interval));
      if (isTimestampInInterval(timestamp, interval)) {
        return true;
      }
    });
    _.map(connectedData.requested, (interval) => {
      debug.debug('known requested interval', inspect(interval));
      if (isTimestampInInterval(timestamp, interval)) {
        return true;
      }
    });
  }
  return false;
};



collection.setIntervalAsReceived = (dataId, queryUuid) => {
  // Set query interval as received for this dataId
  let connectedData = collection.by('dataId', dataId);
  connectedData.intervals = mergeIntervals(connectedData.intervals, connectedData.requested[queryUuid]);
  connectedData.requested = _.omit(connectedData.requested, queryUuid);
  debug.debug('interval received', connectedData);
  collection.update(connectedData); // TODO This update operation could be not needed
  // TODO Is it needed to deal with a no longer present interval ?
};

collection.addRequestedInterval = (dataId, queryUuid, interval) => {
  // Add a query interval in the list of requested intervals for this dataId
  // And create the dataId if it doesnt exist
  let connectedData = collection.by('dataId', dataId);
  if (connectedData === undefined) {

    connectedData = {
      dataId,
      intervals: [],
      requested: {},
    };
    connectedData.requested[queryUuid] = interval;
    debug.debug('insert', inspect(connectedData));
    collection.insert(connectedData);
  } else {
    debug.debug('before update', inspect(connectedData));
    connectedData.requested[queryUuid] = interval;
    debug.debug('update', inspect(connectedData));
    collection.update(connectedData); // TODO This update operation could be not needed
  }
};

collection.retrieveMissingIntervals = (dataId, interval) => {
  // Retrieve missing intervals for this dataId for the given interval
  const connectedData = collection.by('dataId', dataId);

  // No connectedData
  if (connectedData === undefined) {
    debug.debug('no connectedData');
    return [interval];
  }

  // Merge known intervals and requested intervals in a local variable
  let intervals = connectedData.intervals;
  _.map(connectedData.requested, (value) => {
    intervals = mergeIntervals(intervals, value);
  });

  // No known intervals
  if (intervals.length === 0) {
    debug.debug('no intervals');
    return [];
  }

  // Search missing intervals
  const missingIntervals = [];
  let lower = interval[0];
  let upper = interval[1];
  _.some(intervals, (knownInterval) => {
    if (knownInterval[0] > lower) {
      if (knownInterval[0] > upper) {
        debug.debug('last missing interval (below upper)');
        missingIntervals.push([lower, upper]);
        lower = knownInterval[0];
        return true;
      }

      if (knownInterval[1] > upper) {
        debug.debug('last missing interval');
        missingIntervals.push([lower, knownInterval[0]]);
        lower = knownInterval[1];
        return true;
      }

      debug.debug('another missing interval');
      missingIntervals.push([lower, knownInterval[0]]);
      lower = knownInterval[1];
      return false;

    }

    if (knownInterval[1] > upper) {
      debug.debug('no more interval');
      return true;
    }

    if (knownInterval[1] < lower) {
      debug.debug('check another interval (upside lower)');
      return false;
    }

    debug.debug('check another interval');
    lower = knownInterval[1];
    return false;
  });

  if (lower < upper) {
    debug.debug('final interval');
    missingIntervals.push([lower, upper]);
  }

  return missingIntervals;
};

module.exports = collection;
