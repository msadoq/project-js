const debug = require('../io/debug')('models:cacheJson');
const database = require('../io/loki');
const _ = require('lodash');
const { inspect } = require('util');

const collection = database.addCollection('cacheJson');

collection.getLocalId = require('./getLocalId');

collection.addRecords = (dataId, records) => {
  const localId = collection.getLocalId(dataId);
  debug.debug(`add ${records.length} records`);
  _.each(records, (record) => {
    collection.addRecord(localId, record.timestamp, record.payload);
  });
};

collection.addRecord = (dataId, timestamp, payload) => {
  const localId = (typeof dataId === 'string') ? dataId : collection.getLocalId(dataId);
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
};

collection.removeByDataId = (dataId) => {
  collection.removeWhere({
    localId: collection.getLocalId(dataId),
  });
};

collection.cleanup = () => {
  debug.debug('cacheJson cleared');
  collection.chain().find().remove();
};

module.exports = collection;
