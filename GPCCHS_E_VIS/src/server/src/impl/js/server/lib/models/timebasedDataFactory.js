const debug = require('../io/debug')('models:timebasedData');
const database = require('../io/loki');
const _ = require('lodash');
const { inspect } = require('util');
const constants = require('../constants');

let remoteIds = [];

const getTimebasedDataModel = remoteId => database.getCollection(`${constants.COLLECTION_TIMEBASED_DATA_PREFIX}.${remoteId}`);

const addTimebasedDataModel = (remoteId) => {
  if (_.includes(remoteIds, remoteId)) {
    return getTimebasedDataModel(remoteId);
  }
  remoteIds.push(remoteId);
  const collection = database.addCollection(`${constants.COLLECTION_TIMEBASED_DATA_PREFIX}.${remoteId}`);

  collection.addRecords = (records) => {
    debug.debug(`add ${records.length} records`);
    _.each(records, (record) => {
      collection.addRecord(record.timestamp, record.payload);
    });
  };

  collection.addRecord = (timestamp, payload) => {
    debug.debug('add record', collection.name);
    return collection.insert({
      timestamp,
      payload,
    });
  };

  collection.findByInterval = (lower, upper) => {
    const query = { $and: [] };

    if (lower) {
      query.$and.push({ timestamp: { $gte: lower } });
    }
    if (upper) {
      query.$and.push({ timestamp: { $lte: upper } });
    }

    debug.debug('searching for', inspect(query));
    return collection.find(query);
  };

  collection.cleanup = () => {
    debug.debug('timebasedData cleared');
    collection.clear();
  };

  return collection;
};

const removeTimebasedDataModel = (remoteId) => {
  remoteIds = _.without(remoteIds, remoteId);
  database.removeCollection(`${constants.COLLECTION_TIMEBASED_DATA_PREFIX}.${remoteId}`);
};

module.exports = {
  addTimebasedDataModel,
  getTimebasedDataModel,
  removeTimebasedDataModel,
  clearFactory: () => _.each(remoteIds, remoteId => removeTimebasedDataModel(remoteId)),
  getAllTimebasedDataModelRemoteIds: () => remoteIds,
};
