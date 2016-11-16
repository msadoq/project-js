const debug = require('../io/debug')('models:timebasedData');

// eslint-disable-next-line no-underscore-dangle
const _each = require('lodash/each');
// eslint-disable-next-line no-underscore-dangle
const _without = require('lodash/without');
// eslint-disable-next-line no-underscore-dangle
const _memoize = require('lodash/memoize');

const constants = require('../constants');

const database = require('../io/loki');


let remoteIds = [];

const generateCollectionName = _memoize(remoteId => `${constants.COLLECTION_TIMEBASED_DATA_PREFIX}.${remoteId}`);


const addRecords = (collection, records) => {
  debug.debug(`add ${records.length} records`);
  _each(records, (record) => {
    collection.addRecord(record.timestamp, record.payload);
  });
};

const addRecord = (collection, timestamp, payload) => {
  debug.debug('add record', collection.name);
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

const findByInterval = (collection, lower, upper) => {
  const query = { $and: [] };

  if (lower) {
    query.$and.push({ timestamp: { $gte: lower } });
  }
  if (upper) {
    query.$and.push({ timestamp: { $lte: upper } });
  }

  debug.debug('searching for', query.$and);
  return collection.find(query);
};

const cleanup = (collection) => {
  debug.debug('timebasedData cleared');
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
  collection.findByInterval = (lower, upper) => findByInterval(collection, lower, upper);
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
