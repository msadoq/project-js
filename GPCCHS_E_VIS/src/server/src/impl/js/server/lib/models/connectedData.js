const debug = require('../io/debug')('models:connectedData');

// eslint-disable-next-line no-underscore-dangle
const _concat = require('lodash/concat');
// eslint-disable-next-line no-underscore-dangle
const _remove = require('lodash/remove');
// eslint-disable-next-line no-underscore-dangle
const _values = require('lodash/values');
// eslint-disable-next-line no-underscore-dangle
const _filter = require('lodash/filter');
// eslint-disable-next-line no-underscore-dangle
const _omit = require('lodash/omit');
// eslint-disable-next-line no-underscore-dangle
const _each = require('lodash/each');
// eslint-disable-next-line no-underscore-dangle
const _some = require('lodash/some');
// eslint-disable-next-line no-underscore-dangle
const _has = require('lodash/has');

// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
// eslint-disable-next-line import/no-extraneous-dependencies
const intervalManager = require('common/intervals');

const database = require('../io/loki');



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
      debug.debug('timestamps not in known intervals');
      return [];
    }
  }

  debug.debug('check intervals for these timestamps');
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
      debug.debug('timestamp not in known intervals');
      return false;
    }
  }

  debug.debug('check intervals');
  if (intervalManager.includesTimestamp(cd.intervals.all, timestamp)) {
    debug.debug('timestamp in intervals');
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
      cd.intervals.received = [...cd.intervals.received, interval];
      break;
    case globalConstants.DATASTRUCTURETYPE_RANGE:
      cd.intervals.received =
        intervalManager.merge(cd.intervals.received, interval);
      break;
    default:
      throw new Error('Consuming type not valid:', cd.type);
  }
  delete cd.intervals.requested[queryUuid];
  debug.debug('set interval', interval, 'as received for', remoteId);
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
      cd.intervals.all = [...cd.intervals.all, interval];
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
  let requestedIntervals = cd.intervals.requested;
  let receivedIntervals = cd.intervals.received;
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
  switch (cd.type) {
    case globalConstants.DATASTRUCTURETYPE_LAST:
      cd.intervals.all = _concat(receivedIntervals, _values(requestedIntervals));
      break;
    case globalConstants.DATASTRUCTURETYPE_RANGE:
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
      debug.debug('no connectedData');
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

collection.exists = (remoteId) => {
  if (typeof collection.by('remoteId', remoteId) === 'undefined') {
    return false;
  }
  return true;
};

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
  debug.debug('connectedData cleared');
  collection.clear();
  collection.getRemoteIdIndex().clear();
};

module.exports = collection;
