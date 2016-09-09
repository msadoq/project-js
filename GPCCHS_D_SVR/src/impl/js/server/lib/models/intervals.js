const debug = require('../io/debug')('models:intervals');
const database = require('../io/loki');
const { inspect } = require('util');

const collection = database.addCollection('intervals');

collection.getLocalId = require('./getLocalId');

collection.isTimestampInKnownIntervals = (dataId, timestamp) => {
  // TODO rperrot Check if timestamp is currently in intervals known or requested for this dataId
};

collection.setIntervalAsReceived = (dataId, queryUuid) => {
  // TODO rperrot Set query interval as received for this dataId
};

collection.addRequestedInterval = (parameterUuid, dataId, queryUuid, interval) => {
  // TODO rperrot Add a query interval in the list of requested intervals for this parameterUuid
  // And create the dataId if it doesnt exist
};

collection.retrieveMissingIntervals = (parameterUuid, interval) => {
  // TODO rperrot Retrieve missing intervals for this parameterUuid for the given interval
  // Then check if these intervals arent currently requested.
};



/*collection.addRecord = (dataId, timestamp, payload) => {
  const localId = collection.getLocalId(dataId);
  debug.debug('insert', localId);
  return collection.insert({
    localId,
    timestamp,
    payload,
  });
};

collection.findByInterval = (dataId, lower, upper) => {
  const query = {
    $and: [
      { localId: collection.getLocalId(dataId) },
    ],
  };

  if (lower) {
    query.$and.push({ timestamp: { $gte: lower } });
  }
  if (upper) {
    query.$and.push({ timestamp: { $lte: upper } });
  }

  debug.debug('searching for', inspect(query));
  return collection.find(query);
};*/

module.exports = collection;
