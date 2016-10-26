const debug = require('../io/debug')('models:connectedData');
const database = require('../io/loki');
const { intervals: intervalManager } = require('common');
// const { inspect } = require('util');
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

  const interval = _get(cd, ['intervals', 'requested', queryUuid]);
  if (typeof interval === 'undefined') {
    return undefined;
  }

  cd.intervals.received =
    intervalManager.merge(cd.intervals.received, interval);
  cd.intervals.requested = _omit(cd.intervals.requested, queryUuid);
  debug.debug('set interval', interval, 'as received', cd);
  // collection.update(connectedData);
  // TODO i've commented this line for performance reasons, test non regression

  return cd;
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
  // debug.debug('insert', inspect(connectedData));
  return collection.insert(connectedData);
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

  // debug.debug('before update', inspect(connectedData));
  cd.intervals.requested[queryUuid] = interval;
  cd.intervals.all = intervalManager.merge(cd.intervals.all, interval);
  // debug.debug('update', inspect(connectedData));
  // collection.update(connectedData);
  // TODO i've commented this line for performance reasons, test non regression

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
  const allIntervals = intervalManager.merge(receivedIntervals, _values(requestedIntervals));
  cd.intervals.requested = requestedIntervals;
  cd.intervals.received = receivedIntervals;
  cd.intervals.all = allIntervals;

  // collection.update(connectedData);
  // TODO i've commented this line for performance reasons, test non regression
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

  return intervalManager.missing(allIntervals, interval);
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
