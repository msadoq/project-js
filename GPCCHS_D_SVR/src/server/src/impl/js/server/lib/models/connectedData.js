const debug = require('../io/debug')('models:connectedData');
const database = require('../io/loki');
const { isTimestampInIntervals, mergeIntervals } = require('../utils/intervals');
const { inspect } = require('util');
const _ = require('lodash');

const collection = database.addCollection('connectedData',
  {
    unique: 'localId',
  }
);

collection.getLocalIdIndex = () => collection.constraints.unique.localId;

collection.getAll = () => _.remove(_.values(collection.getLocalIdIndex().keyMap), undefined);

collection.getLocalId = require('./getLocalId');

collection.isTimestampInKnownIntervals = (dataId, timestamp) => {
  const localId = collection.getLocalId(dataId);
  // Check if timestamp is currently in intervals known or requested for this localId
  const connectedData = collection.by('localId', localId);

  if (typeof connectedData === 'undefined') {
    debug.debug('timestamp not in known intervals');
    return false;
  }

  debug.debug('check received intervals');
  if (isTimestampInIntervals(timestamp, connectedData.intervals.all)) {
    debug.debug('timestamp in intervals');
    return true;
  }

  return false;
};

collection.setIntervalAsReceived = (dataId, queryUuid) => {
  const localId = collection.getLocalId(dataId);
  // Set query interval as received for this localId
  const connectedData = collection.by('localId', localId);

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

collection.addRequestedInterval = (dataId, queryUuid, interval) => {
  const localId = collection.getLocalId(dataId);
  // Add a query interval in the list of requested intervals for this localId
  // And create the localId if it doesnt exist
  let connectedData = collection.by('localId', localId);

  if (typeof connectedData === 'undefined') {
    connectedData = {
      localId,
      dataId,
      intervals: {
        all: [],
        received: [],
        requested: {},
      },
      windows: [],
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

collection.retrieveMissingIntervals = (dataId, interval) => {
  const localId = collection.getLocalId(dataId);
  // Retrieve missing intervals for this localId for the given interval
  const connectedData = collection.by('localId', localId);

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

collection.addWindowId = (dataId, windowId) => {
  const localId = collection.getLocalId(dataId);
  let connectedData = collection.by('localId', localId);
  if (typeof connectedData === 'undefined') {
    connectedData = {
      localId,
      dataId,
      intervals: {
        all: [],
        received: [],
        requested: {},
      },
      windows: [windowId],
    };
    debug.debug('insert', inspect(connectedData));
    return collection.insert(connectedData);
  }

  debug.debug('before update', inspect(connectedData));
  connectedData.windows = [...connectedData.windows, windowId];
  debug.debug('update', inspect(connectedData));
  collection.update(connectedData); // TODO This update operation could be not needed
  return connectedData;
};

collection.removeWindowId = (dataId, windowId) => {
  const localId = collection.getLocalId(dataId);
  debug.debug(localId);
  const connectedData = collection.by('localId', localId);
  if (typeof connectedData === 'undefined') {
    return undefined;
  }
  debug.debug('before update', inspect(connectedData));
  connectedData.windows = _.without(connectedData.windows, windowId);
  debug.debug('update', inspect(connectedData));
  collection.update(connectedData); // TODO This update operation could be not needed
  return connectedData;
};

collection.retrieveByWindow = windowId => collection.find({
  windows: {
    $contains: windowId,
  },
});

collection.exists = (dataId) => {
  const localId = collection.getLocalId(dataId);
  if (typeof collection.by('localId', localId) === 'undefined') {
    return false;
  }
  return true;
};

collection.removeByDataId = (dataId) => {
  const localId = collection.getLocalId(dataId);
  const connectedData = collection.by('localId', localId);

  if (typeof connectedData === 'undefined') {
    return;
  }

  collection.remove(connectedData);
};

collection.getByDataId = (dataId) => {
  const localId = (typeof dataId === 'string') ? dataId : collection.getLocalId(dataId);
  return collection.by('localId', localId);
};

collection.cleanup = () => {
  debug.debug('connectedData cleared');
  collection.clear();
  collection.getLocalIdIndex().clear();
};

module.exports = collection;
