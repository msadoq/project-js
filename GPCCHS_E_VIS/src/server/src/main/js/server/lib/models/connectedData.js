const _concat = require('lodash/concat');
const _remove = require('lodash/remove');
const _values = require('lodash/values');
const _filter = require('lodash/filter');
const _each = require('lodash/each');
const _some = require('lodash/some');
const _has = require('lodash/has');
const logger = require('common/log')('models:connectedData');
const globalConstants = require('common/constants');
const intervalManager = require('common/intervals');

const database = require('./loki');

const createConnectedData = (type, remoteId, dataId) => ({
  type,
  remoteId,
  dataId,
  intervals: {
    all: [],
    received: [],
    requested: {},
  },
});

const collection = database.addCollection('connectedData',
  {
    unique: 'remoteId',
  }
);

collection.getRemoteIdIndex = () => collection.constraints.unique.remoteId;

collection.getAll = () => _remove(_values(collection.getRemoteIdIndex().keyMap), undefined);

collection.areTimestampsInKnownIntervals = (remoteId, timestamps, connectedData) => {
  // Return timestamps that are currently in intervals known or requested for this remoteId
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      logger.silly('timestamps not in known intervals');
      return [];
    }
  }

  logger.silly('check intervals for these timestamps');
  return _filter(
    timestamps,
    timestamp => intervalManager.includesTimestamp(cd.intervals.all, timestamp)
  );
};

collection.isTimestampInKnownIntervals = (remoteId, timestamp, connectedData) => {
  // Check if timestamp is currently in intervals known or requested for this remoteId
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      logger.silly('timestamp not in known intervals');
      return false;
    }
  }

  logger.debug('check intervals');
  if (intervalManager.includesTimestamp(cd.intervals.all, timestamp)) {
    logger.silly('timestamp in intervals');
    return true;
  }

  return false;
};

collection.setIntervalAsReceived = (remoteId, queryUuid, connectedData) => {
  // Set query interval as received for this remoteId
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      return undefined;
    }
  }
  const interval = cd.intervals.requested[queryUuid];
  if (typeof interval === 'undefined') {
    return undefined;
  }
  switch (cd.type) {
    case globalConstants.DATASTRUCTURETYPE_LAST:
      cd.intervals.received.push(interval);
      break;
    case globalConstants.DATASTRUCTURETYPE_RANGE:
      cd.intervals.received =
        intervalManager.merge(cd.intervals.received, interval);
      break;
    default:
      throw new Error('Consuming type not valid:', cd.type);
  }
  delete cd.intervals.requested[queryUuid];
  logger.silly('set interval', interval, 'as received for', remoteId);
  return cd;
};

collection.addRecord = (type, remoteId, dataId) => {
  let connectedData = collection.by('remoteId', remoteId);
  if (connectedData) {
    return connectedData;
  }
  switch (type) {
    case globalConstants.DATASTRUCTURETYPE_LAST:
    case globalConstants.DATASTRUCTURETYPE_RANGE:
      connectedData = createConnectedData(type, remoteId, dataId);
      return collection.insert(connectedData);
    default:
      throw new Error('Consuming type not valid:', type);
  }
};

collection.addRequestedInterval = (remoteId, queryUuid, interval, connectedData) => {
  // Add a query interval in the list of requested intervals for this flatDataId
  // And create the flatDataId if it doesnt exist

  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      return undefined;
    }
  }
  switch (cd.type) {
    case globalConstants.DATASTRUCTURETYPE_LAST:
      cd.intervals.requested[queryUuid] = interval;
      cd.intervals.all.push(interval);
      break;
    case globalConstants.DATASTRUCTURETYPE_RANGE:
      cd.intervals.requested[queryUuid] = interval;
      cd.intervals.all = intervalManager.merge(cd.intervals.all, interval);
      break;
    default:
      throw new Error('Consuming type not valid:', cd.type);
  }

  return cd;
};

collection.removeIntervals = (remoteId, intervals, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      return [];
    }
  }
  const requestedIntervals = cd.intervals.requested;
  let receivedIntervals = cd.intervals.received;
  const queryIds = [];
  _each(intervals, (interval) => {
    _some(requestedIntervals, (value, key) => {
      if (value === interval) {
        queryIds.push(key);
        delete requestedIntervals[key];
        return true;
      } else if (value[0] >= interval[0] && value[1] <= interval[1]) {
        // in real time, requested intervals are included in other intervals
        // so deletion must be done for each requestedInterval
        queryIds.push(key);
        delete requestedIntervals[key];
      }
      return false;
    });
  });

  switch (cd.type) {
    case globalConstants.DATASTRUCTURETYPE_LAST:
      _each(intervals, (interval) => {
        const index = receivedIntervals.indexOf(interval);
        if (index > -1) {
          receivedIntervals = [
            ...receivedIntervals.slice(0, index),
            ...receivedIntervals.slice(index + 1),
          ];
        }
      });
      cd.intervals.all = _concat(receivedIntervals, _values(requestedIntervals));
      break;
    case globalConstants.DATASTRUCTURETYPE_RANGE:
      receivedIntervals = intervalManager.remove(receivedIntervals, intervals);
      cd.intervals.all = intervalManager.merge(receivedIntervals, _values(requestedIntervals));
      break;
    default:
      throw new Error('Consuming type not valid:', cd.type);
  }
  cd.intervals.requested = requestedIntervals;
  cd.intervals.received = receivedIntervals;
  return queryIds;
};

collection.getIntervals = (remoteId, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      return undefined;
    }
  }
  return cd.intervals.all;
};

collection.getDataId = (remoteId, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      return undefined;
    }
  }
  return cd.dataId;
};

collection.isRequested = (remoteId, queryUuid, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
  }

  return _has(cd, ['intervals', 'requested', queryUuid]);
};

collection.retrieveMissingIntervals = (remoteId, interval, connectedData) => {
  // Retrieve missing intervals for this remoteId for the given interval
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      logger.silly('no connectedData');
      return [interval];
    }
  }

  const allIntervals = cd.intervals.all;

  switch (cd.type) {
    case globalConstants.DATASTRUCTURETYPE_LAST:
      return intervalManager.notIncluded(allIntervals, interval);
    case globalConstants.DATASTRUCTURETYPE_RANGE:
      return intervalManager.missing(allIntervals, interval);
    default:
      throw new Error('Consuming type not valid:', cd.type);
  }
};

collection.exists = remoteId => typeof collection.by('remoteId', remoteId) !== 'undefined';

collection.removeByRemoteId = (remoteId, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('remoteId', remoteId);
    if (!cd) {
      return;
    }
  }

  collection.remove(cd);
};

collection.getByRemoteId = remoteId => collection.by('remoteId', remoteId);

collection.cleanup = () => {
  logger.debug('connectedData cleared');
  collection.clear();
  collection.getRemoteIdIndex().clear();
};

module.exports = collection;
