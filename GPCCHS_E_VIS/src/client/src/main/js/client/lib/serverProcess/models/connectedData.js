// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : Fix pub/sub data time filtering issue due to bad set of connectedDataModel .intervals.all list
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Fix pub/sub data time filtering issue due to bad set of connectedDataModel .intervals.all list
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// END-HISTORY
// ====================================================================

const _remove = require('lodash/remove');
const _values = require('lodash/values');
const _filter = require('lodash/filter');
const _each = require('lodash/each');
const _some = require('lodash/some');
const _has = require('lodash/has');
const _set = require('lodash/set');
const _reduce = require('lodash/reduce');
const logger = require('../../common/logManager')('models:connectedData');
const flattenDataId = require('../../common/flattenDataId');
const intervalManager = require('../../common/intervals');

const database = require('./loki');

const createConnectedData = (dataId, filters) => ({
  flatDataId: flattenDataId(dataId, filters),
  dataId,
  filters,
  intervals: {
    all: [],
    received: [],
    requested: {},
  },
  lastQueries: {},
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
  // range
  if (intervalManager.includesTimestamp(cd.intervals.all, timestamp)) {
    logger.silly('timestamp in intervals');
    return true;
  }
  // last
  // create an array with all last query intervals
  const intervals = _reduce(cd.lastQueries, (acc, interval) => {
    (acc || []).push(interval);
    return acc;
  }, []);
  if (intervalManager.includesTimestamp(intervals, timestamp)) {
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

collection.addRecord = (dataId, filters) => { // TODO => rename addRecordIfNotExists
  let connectedData = collection.by('flatDataId', flattenDataId(dataId, filters));
  if (connectedData) {
    return connectedData;
  }
  connectedData = createConnectedData(dataId, filters);
  return collection.insert(connectedData);
};

collection.addRequestedInterval = (model, queryId, interval) => {
  _set(model, ['intervals', 'requested', queryId], interval);
  _set(model, ['intervals', 'all'], intervalManager.merge(model.intervals.all, interval));
};

collection.addLastQuery = (model, queryId, interval) => {
  _set(model, ['lastQueries', queryId], interval);
};

collection.removeLastQuery = (flatDataId, queryUuid, connectedData) => {
  // Add a query id in the list of getLast requested for this flatDataId
  // And create the flatDataId if it doesnt exist
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
    if (!cd) {
      return undefined;
    }
  }
  cd.lastQueries = _reduce(cd.lastQueries, (acc, interval, queryId) => {
    if (queryId === queryUuid) {
      return acc;
    }
    return Object.assign({}, acc, { [queryId]: interval });
  }, {});
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

collection.isLastQuery = (flatDataId, queryUuid, connectedData) => {
  let cd = connectedData;
  if (!cd) {
    cd = collection.by('flatDataId', flatDataId);
  }
  return _has(cd, ['lastQueries', queryUuid]);
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
