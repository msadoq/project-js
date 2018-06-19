// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Create loki model and its test
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : update of loki manager .
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update tests and implementation . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 23/08/2017 : Update cache clean mechanism in dev tools
// VERSION : 1.1.2 : DM : #6700 : 24/08/2017 : Clean console log . . .
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import { get } from 'common/configurationManager';

const logger = require('../../common/logManager')('models:timebasedData');
const database = require('./loki');

const isCacheDisabled = String(get('DISABLE_LOKI_CACHE')) === 'true';

// List of the tbdId indexing a lokiJs collection
const ids = [];

const getPrefixedId = (cacheId, id) => `${cacheId}.${id}`;

/**
 * Get a collection indexed by cacheId and id (like tbdId for known ranges)
 * @param string cacheId
 * @param string id
 */
const getCollection =
  (cacheId, id) => ({ collection: database.getCollection(getPrefixedId(cacheId, id)) });

const displayCollection =
  (cacheId, id) => database.getCollection(getPrefixedId(cacheId, id)).find();

/**
 * Get or create the collection indexed by the given tbdId
 * @param string tbdId
 */
const getOrCreateCollection = (cacheId, id) => {
  const prefixedId = getPrefixedId(cacheId, id);
  if (ids.indexOf(prefixedId) !== -1) {
    return getCollection(cacheId, id);
  }
  // register tbdId
  ids.push(prefixedId);
  // create collection
  const collection = database.addCollection(
    prefixedId,
    { unique: ['timestamp'] }
  );

  return { collection, isNew: true };
};

/**
 * List all the ids present in the store
 */
const listCachedCollections = () => ids;

/**
 * Remove a collection for a given tbdId
 * @param string tbdId
 */
const removeCollection = (cacheId, id) => {
  const { collection } = getCollection(cacheId, id);
  if (collection) {
    collection.clear();
  } else {
    throw new Error('the Collection you are trying to remove does not exist');
  }
  const index = ids.indexOf(getPrefixedId(cacheId, id));
  if (index > -1) {
    ids.splice(index, 1);
  }
};

/**
 * Remove all collections present in the store
 */
const removeAllCollections = () => {
  for (let i = 0; i < ids.length; i += 1) database.removeCollection(ids[i]);
  ids.splice(0, ids.length);
};

/**
 * Add a value (timestamp,payload) for a given collection
 * @param lokiJsCollection collection
 * @param Object value
 */
const addRecord = (cacheId, id, value) => {
  const timestamp = value.timestamp;
  const payload = value.payload;
  const { collection } = getOrCreateCollection(cacheId, id);
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

/**
 * Add a set of values in a collection for a given tbdId
 * @param string tbdId
 * @param Array<Object> records
 */
const addRecords = (cacheId, id, records) => {
  logger.silly(`add ${records.length} records`);
  for (let i = 0; i < records.length; i += 1) {
    addRecord(cacheId, id, records[i]);
  }
};

/* const getChargeLoki = () => {
  let counter = 0;
  for (let i = 0; i < ids.length; i += 1) {
    const { collection } = getCollection(ids[i]);
    if (collection) {
      counter += collection.data.length;
    }
  }
  return counter;
}; */

const getDb = () => database;

export default {
  getCollection,
  addRecord: isCacheDisabled ? _.noop : addRecord,
  addRecords,
  listCachedCollections,
  removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
  getDb,
  getPrefixedId,
};
