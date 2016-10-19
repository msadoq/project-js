const debug = require('../io/debug')('models:connectedData');
const database = require('../io/loki');
const { intervals: intervalManager } = require('common');
const { inspect } = require('util');
const {
  remove: _remove,
  values: _values,
  filter: _filter,
  get: _get,
  omit: _omit,
  each: _each,
  some: _some,
  has: _has,
} = require('lodash');

const collection = database.addCollection('connectedData',
  {
    unique: 'remoteId',
  }
);

collection.getRemoteIdIndex = () => collection.constraints.unique.remoteId;

collection.getAll = () => _remove(_values(collection.getRemoteIdIndex().keyMap), undefined);

collection.areTimestampsInKnownIntervals = (remoteId, timestamps) => {
  // Return timestamps that are currently in intervals known or requested for this remoteId
  const connectedData = collection.by('remoteId', remoteId);

  if (typeof connectedData === 'undefined') {
    debug.debug('timestamps not in known intervals');
    return [];
  }

  debug.debug('check intervals for these timestamps');
  return _filter(
    timestamps,
    timestamp => intervalManager.includesTimestamp(connectedData.intervals.all, timestamp)
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
  if (intervalManager.includesTimestamp(connectedData.intervals.all, timestamp)) {
    debug.debug('timestamp in intervals');
    return true;
  }

  return false;
};

collection.setIntervalAsReceived = (remoteId, queryUuid) => {
  // Set query interval as received for this remoteId
  const connectedData = collection.by('remoteId', remoteId);

  const interval = _get(connectedData, ['intervals', 'requested', queryUuid]);
  if (typeof interval === 'undefined') {
    return undefined;
  }

  connectedData.intervals.received =
    intervalManager.merge(connectedData.intervals.received, interval);
  connectedData.intervals.requested = _omit(connectedData.intervals.requested, queryUuid);
  debug.debug('set interval', interval, 'as received', connectedData);
  collection.update(connectedData); // TODO This update operation could be not needed

  return connectedData;
};

collection.addRecord = (remoteId, dataId) => {
  let connectedData = collection.by('remoteId', remoteId);
  if (connectedData) {
    return connectedData;
  }
  connectedData = {
    remoteId,
    dataId,
    intervals: {
      all: [],
      received: [],
      requested: {},
    },
  };
  debug.debug('insert', inspect(connectedData));
  return collection.insert(connectedData);
};

collection.addRequestedInterval = (remoteId, queryUuid, interval) => {
  // Add a query interval in the list of requested intervals for this flatDataId
  // And create the flatDataId if it doesnt exist
  const connectedData = collection.by('remoteId', remoteId);

  if (!connectedData) {
    return undefined;
  }

  debug.debug('before update', inspect(connectedData));
  connectedData.intervals.requested[queryUuid] = interval;
  connectedData.intervals.all = intervalManager.merge(connectedData.intervals.all, interval);
  debug.debug('update', inspect(connectedData));
  collection.update(connectedData); // TODO This update operation could be not needed

  return connectedData;
};

collection.removeIntervals = (remoteId, intervals) => {
  const connectedData = collection.by('remoteId', remoteId);
  if (!connectedData) {
    return [];
  }
  let requestedIntervals = connectedData.intervals.requested;
  let receivedIntervals = connectedData.intervals.received;
  const queryIds = [];
  _each(intervals, (interval) => {
    _some(requestedIntervals, (value, key) => {
      if (value === interval) {
        queryIds.push(key);
        requestedIntervals = _omit(requestedIntervals, key);
        return true;
      }
      return false;
    });
    receivedIntervals = intervalManager.remove(receivedIntervals, interval);
  });
  const allIntervals = intervalManager.merge(receivedIntervals, _values(requestedIntervals));
  connectedData.intervals.requested = requestedIntervals;
  connectedData.intervals.received = receivedIntervals;
  connectedData.intervals.all = allIntervals;

  collection.update(connectedData);
  return queryIds;
};

collection.getIntervals = (remoteId) => {
  const connectedData = collection.by('remoteId', remoteId);
  if (!connectedData) {
    return undefined;
  }
  return connectedData.intervals.all;
};

collection.getDataId = (remoteId) => {
  const connectedData = collection.by('remoteId', remoteId);
  if (!connectedData) {
    return undefined;
  }
  return connectedData.dataId;
};

collection.isRequested = (remoteId, queryUuid) => {
  const connectedData = collection.by('remoteId', remoteId);

  return _has(connectedData, ['intervals', 'requested', queryUuid]);
};

collection.retrieveMissingIntervals = (remoteId, interval) => {
  // Retrieve missing intervals for this remoteId for the given interval
  const connectedData = collection.by('remoteId', remoteId);

  // No connectedData
  if (typeof connectedData === 'undefined') {
    debug.debug('no connectedData');
    return [interval];
  }

  const allIntervals = connectedData.intervals.all;

  // No known intervals
  if (allIntervals.length === 0) {
    debug.debug('no intervals');
    return [interval];
  }

  // Search missing intervals
  const missingIntervals = [];
  let lower = interval[0];
  const upper = interval[1];
  _some(allIntervals, (knownInterval, index) => {
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
      if (index === allIntervals.length - 1) {
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
      if (index === allIntervals.length - 1) {
        // Last one
        missingIntervals.push([knownInterval[1], upper]);
        return true;
      }

      // Next known interval
      lower = knownInterval[1];
      return false;
    }

    // Completely above known interval
    if (index === allIntervals.length - 1) {
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
