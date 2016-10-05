const debug = require('../io/debug')('models:timebasedData');
const database = require('../io/loki');
const _ = require('lodash');
const { inspect } = require('util');

const collection = database.addCollection('timebasedData');

collection.addRecords = (remoteId, records) => {
  debug.debug(`add ${records.length} records`);
  _.each(records, (record) => {
    collection.addRecord(remoteId, record.timestamp, record.payload);
  });
};

collection.addRecord = (remoteId, timestamp, payload) => {
  debug.debug('add record', remoteId);
  return collection.insert({
    remoteId,
    timestamp,
    payload,
  });
};

collection.findByInterval = (remoteId, lower, upper) => {
  const query = {
    $and: [
      { remoteId },
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
};

collection.removeByremoteId = (remoteId) => {
  collection.removeWhere({
    remoteId,
  });
};

collection.cleanup = () => {
  debug.debug('timebasedData cleared');
  collection.clear();
};

module.exports = collection;
