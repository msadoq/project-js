const debug = require('../io/debug')('models:cacheJson');
const database = require('../io/loki');
const { inspect } = require('util');

const collection = database.addCollection('cacheJson');

collection.getLocalId = require('./getLocalId');

collection.addRecord = (dataId, timestamp, payload) => {
  const localId = collection.getLocalId(dataId);
  collection.insert({
    localId,
    timestamp,
    payload,
  });
  debug.debug('inserted', localId);
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
};

module.exports = collection;
