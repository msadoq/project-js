const _remove = require('lodash/remove');
const _values = require('lodash/values');
const _filter = require('lodash/filter');
const _each = require('lodash/each');
const _some = require('lodash/some');
const _has = require('lodash/has');
const logger = require('common/log')('models:connectedData');
const intervalManager = require('common/intervals');
const flattenDataId = require('common/utils/flattenDataId');

const database = require('./loki');

const createConnectedData = dataId => ({
  flatDataId: flattenDataId(dataId),
  dataId,
  intervals: {
    all: [],
    received: [],
    requested: {},
  },
});

const collection = database.addCollection('connectedData',
  {
    unique: 'flatDataId',
  }
);

collection.getFlatDataIdIndex = () => collection.constraints.unique.flatDataId;

collection.getAll = () => _remove(_values(collection.getFlatDataIdIndex().keyMap), undefined);

collection.areTimestampsInKnownIntervals = (flatDataId, timestamps, connectedData) => {
  // Return timestamps that are currently in intervals known or requested for this flatDataId
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
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

collection.isTimestampInKnownIntervals = (flatDataId, timestamp, connectedData) => {
  // Check if timestamp is currently in intervals known or requested for this flatDataId
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
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

collection.setIntervalAsReceived = (flatDataId, queryUuid, connectedData) => {
  // Set query interval as received for this flatDataId
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
    if (!cd) {
      return undefined;
    }
  }
  const interval = cd.intervals.requested[queryUuid];
  if (typeof interval === 'undefined') {
    return undefined;
  }
  cd.intervals.received = intervalManager.merge(cd.intervals.received, interval);
  delete cd.intervals.requested[queryUuid];
  logger.silly('set interval', interval, 'as received for', flatDataId);
  return cd;
};

collection.addRecord = (dataId) => {
  let connectedData = collection.by('flatDataId', flattenDataId(dataId));
  if (connectedData) {
    return connectedData;
  }
  connectedData = createConnectedData(dataId);
  return collection.insert(connectedData);
};

collection.addRequestedInterval = (flatDataId, queryUuid, interval, connectedData) => {
  // Add a query interval in the list of requested intervals for this flatDataId
  // And create the flatDataId if it doesnt exist

  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
    if (!cd) {
      return undefined;
    }
  }
  cd.intervals.requested[queryUuid] = interval;
  cd.intervals.all = intervalManager.merge(cd.intervals.all, interval);
  return cd;
};

collection.removeIntervals = (flatDataId, intervals, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
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

  receivedIntervals = intervalManager.remove(receivedIntervals, intervals);
  cd.intervals.all = intervalManager.merge(receivedIntervals, _values(requestedIntervals));
  cd.intervals.requested = requestedIntervals;
  cd.intervals.received = receivedIntervals;
  return queryIds;
};

collection.getIntervals = (flatDataId, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
    if (!cd) {
      return undefined;
    }
  }
  return cd.intervals.all;
};

collection.getDataId = (flatDataId, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
    if (!cd) {
      return undefined;
    }
  }
  return cd.dataId;
};

collection.isRequested = (flatDataId, queryUuid, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
  }

  return _has(cd, ['intervals', 'requested', queryUuid]);
};

collection.retrieveMissingIntervals = (flatDataId, interval, connectedData) => {
  // Retrieve missing intervals for this flatDataId for the given interval
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
    if (!cd) {
      logger.silly('no connectedData');
      return [interval];
    }
  }
  return intervalManager.missing(cd.intervals.all, interval);
};

collection.exists = flatDataId => typeof collection.by('flatDataId', flatDataId) !== 'undefined';

collection.removeByFlatDataId = (flatDataId, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
    if (!cd) {
      return;
    }
  }

  collection.remove(cd);
};

collection.getByFlatDataId = flatDataId => collection.by('flatDataId', flatDataId);

collection.cleanup = () => {
  logger.debug('connectedData cleared');
  collection.clear();
  collection.getFlatDataIdIndex().clear();
};

module.exports = collection;
