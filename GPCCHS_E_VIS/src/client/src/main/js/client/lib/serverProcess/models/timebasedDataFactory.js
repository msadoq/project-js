const logger = require('common/log')('models:timebasedData');
const globalConstants = require('../../constants');

const _each = require('lodash/each');
const _without = require('lodash/without');
const _memoize = require('lodash/memoize');

const database = require('./loki');

let remoteIds = [];

const generateCollectionName = _memoize(
  remoteId => `${globalConstants.COLLECTION_TIMEBASED_DATA_PREFIX}.${remoteId}`
);

const addRecords = (collection, records) => {
  logger.silly(`add ${records.length} records`);
  _each(records, (record) => {
    collection.addRecord(record.timestamp, record.payload);
  });
};

const addRecord = (collection, timestamp, payload) => {
  logger.silly('add record', collection.name);
  const record = collection.by('timestamp', timestamp);
  if (typeof record === 'undefined') {
    return collection.insert({
      timestamp,
      payload,
    });
  }
  record.payload = payload;
  return record;
};

const searchByInterval = (collection, lower, upper, toRemove) => {
  const query = { $and: [] };

  if (lower) {
    query.$and.push({ timestamp: { $gte: lower } });
  }
  if (upper) {
    query.$and.push({ timestamp: { $lte: upper } });
  }

  if (toRemove) {
    logger.silly('removing for', query.$and);
    return collection.chain().find(query).remove();
  }
  logger.silly('searching for', query.$and);
  return collection.find(query);
};

const cleanup = (collection) => {
  logger.debug('timebasedData cleared');
  collection.clear();
};

const getTimebasedDataModel = remoteId => database.getCollection(generateCollectionName(remoteId));

const getOrCreateTimebasedDataModel = (remoteId) => {
  if (remoteIds.indexOf(remoteId) !== -1) {
    return getTimebasedDataModel(remoteId);
  }
  // register remoteId
  remoteIds.push(remoteId);
  // create collection
  const collection = database.addCollection(
    generateCollectionName(remoteId),
    { unique: ['timestamp'] }
  );
  // attach model methods to collection
  collection.addRecords = records => addRecords(collection, records);
  collection.addRecord = (timestamp, payload) => addRecord(collection, timestamp, payload);
  collection.findByInterval = (lower, upper) => searchByInterval(collection, lower, upper, false);
  collection.removeByInterval = (lower, upper) => searchByInterval(collection, lower, upper, true);
  collection.cleanup = () => cleanup(collection);

  return collection;
};

const removeTimebasedDataModel = (remoteId) => {
  remoteIds = _without(remoteIds, remoteId);
  database.removeCollection(generateCollectionName(remoteId));
};

module.exports = {
  getTimebasedDataModel,
  getOrCreateTimebasedDataModel,
  removeTimebasedDataModel,
  clearFactory: () => _each(remoteIds, remoteId => removeTimebasedDataModel(remoteId)),
  getAllTimebasedDataModelRemoteIds: () => remoteIds,
};
