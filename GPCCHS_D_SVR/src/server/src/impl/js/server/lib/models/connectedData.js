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
  if (isTimestampInIntervals(timestamp, connectedData.intervals)) {
    debug.debug('timestamp in received intervals');
    return true;
  }

  debug.debug('check requested intervals');
  if (isTimestampInIntervals(timestamp, connectedData.requested)) {
    debug.debug('timestamp in requested intervals');
    return true;
  }

  return false;
};

collection.setIntervalAsReceived = (dataId, queryUuid) => {
  const localId = collection.getLocalId(dataId);
  // Set query interval as received for this localId
  const connectedData = collection.by('localId', localId);

  const interval = _.get(connectedData, ['requested', queryUuid]);
  if (typeof interval === 'undefined') {
    return undefined;
  }

  connectedData.intervals = mergeIntervals(connectedData.intervals, interval);
  connectedData.requested = _.omit(connectedData.requested, queryUuid);
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
      intervals: [],
      requested: {},
      windows: [],
    };
    connectedData.requested[queryUuid] = interval;
    debug.debug('insert', inspect(connectedData));
    return collection.insert(connectedData);
  }

  debug.debug('before update', inspect(connectedData));
  connectedData.requested[queryUuid] = interval;
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
  const upper = interval[1];
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

collection.addWindowId = (dataId, windowId) => {
  const localId = collection.getLocalId(dataId);
  let connectedData = collection.by('localId', localId);
  if (typeof connectedData === 'undefined') {
    connectedData = {
      localId,
      dataId,
      intervals: [],
      requested: {},
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
