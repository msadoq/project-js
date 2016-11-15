const debug = require('../io/debug')('models:timebasedData');

// eslint-disable-next-line no-underscore-dangle
const _includes = require('lodash/includes');
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

const getTimebasedDataModel = remoteId => database.getCollection(generateCollectionName(remoteId));

const addTimebasedDataModel = (remoteId) => {
  if (_includes(remoteIds, remoteId)) {
    return getTimebasedDataModel(remoteId);
  }
  remoteIds.push(remoteId);
  const collection = database.addCollection(
    generateCollectionName(remoteId),
    { unique: ['timestamp'] }
  );

  collection.addRecords = (records) => {
    debug.debug(`add ${records.length} records`);
    _each(records, (record) => {
      collection.addRecord(record.timestamp, record.payload);
    });
  };

  collection.addRecord = (timestamp, payload) => {
    debug.debug('add record', collection.name);
    const record = collection.by('timestamp', timestamp);
    if (typeof record === 'undefined') {
      return collection.insert({
        timestamp,
        payload,
      });
    }
    record.payload = payload;
    collection.update(record);
    return record;
  };

  collection.findByInterval = (lower, upper) => {
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

  collection.cleanup = () => {
    debug.debug('timebasedData cleared');
    collection.clear();
  };

  return collection;
};

const removeTimebasedDataModel = (remoteId) => {
  remoteIds = _without(remoteIds, remoteId);
  database.removeCollection(generateCollectionName(remoteId));
};

module.exports = {
  addTimebasedDataModel,
  getTimebasedDataModel,
  removeTimebasedDataModel,
  clearFactory: () => _each(remoteIds, remoteId => removeTimebasedDataModel(remoteId)),
  getAllTimebasedDataModelRemoteIds: () => remoteIds,
};
