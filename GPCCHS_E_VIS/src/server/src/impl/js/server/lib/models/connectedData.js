const debug = require('../io/debug')('models:connectedData');
const database = require('../io/loki');
const { isTimestampInIntervals, mergeIntervals } = require('../utils/intervals');
const { inspect } = require('util');
const _ = require('lodash');

const collection = database.addCollection('connectedData',
  {
    unique: 'remoteId',
  }
);

collection.getRemoteIdIndex = () => collection.constraints.unique.remoteId;

collection.getAll = () => _.remove(_.values(collection.getRemoteIdIndex().keyMap), undefined);

collection.areTimestampsInKnownIntervals = (remoteId, timestamps) => {
  // Return timestamps that are currently in intervals known or requested for this remoteId
  const connectedData = collection.by('remoteId', remoteId);

  if (typeof connectedData === 'undefined') {
    debug.debug('timestamps not in known intervals');
    return [];
  }

  debug.debug('check intervals for these timestamps');
  return _.filter(
    timestamps,
    timestamp => isTimestampInIntervals(timestamp, connectedData.intervals.all)
  );
};

collection.isTimestampInKnownIntervals = (remoteId, timestamp) => {
  // Check if timestamp is currently in intervals known or requested for this remoteId
  const connectedData = collection.by('remoteId', remoteId);

  if (typeof connectedData === 'undefined') {
    debug.debug('timestamp not in known intervals');
    return false;
  }

  debug.debug('check intervals');
  if (isTimestampInIntervals(timestamp, connectedData.intervals.all)) {
    debug.debug('timestamp in intervals');
    return true;
  }

  return false;
};

collection.setIntervalAsReceived = (remoteId, queryUuid) => {
  // Set query interval as received for this remoteId
  const connectedData = collection.by('remoteId', remoteId);

  const interval = _.get(connectedData, ['intervals', 'requested', queryUuid]);
  if (typeof interval === 'undefined') {
    return undefined;
  }

  connectedData.intervals.received = mergeIntervals(connectedData.intervals.received, interval);
  connectedData.intervals.requested = _.omit(connectedData.intervals.requested, queryUuid);
  debug.debug('set interval', interval, 'as received', connectedData);
  collection.update(connectedData); // TODO This update operation could be not needed

  return connectedData;
};

collection.addRequestedInterval = (remoteId, queryUuid, interval) => {
  // Add a query interval in the list of requested intervals for this flatDataId
  // And create the flatDataId if it doesnt exist
  let connectedData = collection.by('remoteId', remoteId);

  if (typeof connectedData === 'undefined') {
    connectedData = {
      remoteId,
      intervals: {
        all: [],
        received: [],
        requested: {},
      },
    };
    connectedData.intervals.requested[queryUuid] = interval;
    connectedData.intervals.all.push(interval);
    debug.debug('insert', inspect(connectedData));
    return collection.insert(connectedData);
  }

  debug.debug('before update', inspect(connectedData));
  connectedData.intervals.requested[queryUuid] = interval;
  connectedData.intervals.all = mergeIntervals(connectedData.intervals.all, interval);
  debug.debug('update', inspect(connectedData));
  collection.update(connectedData); // TODO This update operation could be not needed

  return connectedData;
};

collection.isRequested = (remoteId, queryUuid) => {
  const connectedData = collection.by('remoteId', remoteId);

  return _.has(connectedData, ['intervals', 'requested', queryUuid]);
};

collection.retrieveMissingIntervals = (remoteId, interval) => {
  // Retrieve missing intervals for this remoteId for the given interval
  const connectedData = collection.by('remoteId', remoteId);

  // No connectedData
  if (typeof connectedData === 'undefined') {
    debug.debug('no connectedData');
    return [interval];
  }

  const intervals = connectedData.intervals.all;

  // No known intervals
  if (intervals.length === 0) {
    debug.debug('no intervals');
    return [interval];
  }

  // Search missing intervals
  const missingIntervals = [];
  let lower = interval[0];
  const upper = interval[1];
  _.some(intervals, (knownInterval, index) => {
    if (lower < knownInterval[0]) {
      // Completety below known interval
      if (upper < knownInterval[0]) {
        missingIntervals.push([lower, upper]);
        return true;
      }

      missingIntervals.push([lower, knownInterval[0]]);

      // Below and inside known interval
      if (upper <= knownInterval[1]) {
        return true;
      }

      // Covering known interval
      if (index === intervals.length - 1) {
        // Last one
        missingIntervals.push([knownInterval[1], upper]);
        return true;
      }

      // Next known interval
      lower = knownInterval[1];
      return false;
    }

    if (lower <= knownInterval[1]) {
      // Completety inside known interval
      if (upper <= knownInterval[1]) {
        return true;
      }

      // Inside and above known interval
      if (index === intervals.length - 1) {
        // Last one
        missingIntervals.push([knownInterval[1], upper]);
        return true;
      }

      // Next known interval
      lower = knownInterval[1];
      return false;
    }

    // Completely above known interval
    if (index === intervals.length - 1) {
      // Last one
      missingIntervals.push(interval);
      return true;
    }

    // Next known interval
    return false;
  });

  return missingIntervals;
};

collection.exists = (remoteId) => {
  if (typeof collection.by('remoteId', remoteId) === 'undefined') {
    return false;
  }
  return true;
};

collection.removeByRemoteId = (remoteId) => {
  const connectedData = collection.by('remoteId', remoteId);

  if (typeof connectedData === 'undefined') {
    return;
  }

  collection.remove(connectedData);
};

collection.getByRemoteId = remoteId => collection.by('remoteId', remoteId);

collection.cleanup = () => {
  debug.debug('connectedData cleared');
  collection.clear();
  collection.getRemoteIdIndex().clear();
};

module.exports = collection;
