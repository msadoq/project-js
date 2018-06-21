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
const getPrefix = id => id.split('.')[0];
const getNonPrefixedId = prefixedId => prefixedId.split('.').slice(1).join('.');

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
const listCachedCollections = (cacheId = null) => {
  if (cacheId) {
    return ids.map(id => (getPrefix(id) === cacheId ? id : null)).filter(id => id !== null);
  }
  return ids;
};

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

/**
 * Create mongoDb-like query to find data between a lower and an upper value
 * @param number lower
 * @param number upper
 */
const createIntervalQuery = (lower, upper) => {
  const query = { $and: [] };
  if (lower) {
    query.$and.push({ timestamp: { $gte: lower } });
  }
  if (upper) {
    query.$and.push({ timestamp: { $lte: upper } });
  }
  return query;
};

/**
 * Create query to get data outside the list of intervals
 * @param [interval] interval
 * @return Object query
 */
const createDiffQuery = (intervals) => {
  const query = { $or: [] };
  for (let i = 0; i < intervals.length; i += 1) {
    const $and = [];
    if (i === 0) {
      query.$or.push({ timestamp: { $lt: intervals[i][0] } });
    }
    if (i === intervals.length - 1) {
      query.$or.push({ timestamp: { $gt: intervals[i][1] } });
    } else {
      $and.push({ timestamp: { $gt: intervals[i][1] } });
      $and.push({ timestamp: { $lt: intervals[i + 1][0] } });
      query.$or.push({ $and });
    }
  }
  return query;
};

/**
 * Returns an interval of values for a given collection, and for a given range
 * @param lokiJsCollection collection
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const searchInterval = (collection, lower, upper) => {
  const query = createIntervalQuery(lower, upper);
  return collection.find(query);
};

const searchLast = (collection, lower, upper) => {
  const query = createIntervalQuery(lower, upper);
  return collection.chain()
    .find(query)
    .simplesort('timestamp', true)
    .limit(1)
    .data(); // TODO pgaucher Optimize this query ?
};

/**
 * Delete an interval of values for a given collection, and for a given range
 * @param lokiJsCollection collection
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const deleteInterval = (collection, lower, upper) => {
  const query = createIntervalQuery(lower, upper);
  collection.chain().find(query).remove();
};

/**
 * Get last record fot a given cacheId.tbdId and interval
 * @param string cacheId
 * @param string tbdId
 * @param Array interval
 */
const getLastRecords = (cacheId, tbdId, interval) => {
  const { collection, isNew } = getOrCreateCollection(cacheId, tbdId);
  const lastRecords = { [tbdId]: {} };
  if (isNew) return lastRecords;

  const searched = searchLast(collection, interval[0], interval[1]);
  if (searched.length === 0) return lastRecords;

  lastRecords[tbdId][searched[0].timestamp] = searched[0].payload;
  return lastRecords;
};

/**
 * Get all the data present in a collection for a given tbdId between a lower and an upper value
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const getRecordsByInterval = (cacheId, tbdId, intervals) => {
  const { collection, isNew } = getOrCreateCollection(cacheId, tbdId);
  const rangesRecords = { [tbdId]: {} };
  if (isNew) return rangesRecords;
  for (let i = 0; i < intervals.length; i += 1) {
    const searched = searchInterval(collection, intervals[i][0], intervals[i][1]);
    for (let j = 0; j < searched.length; j += 1) {
      const currentSearch = searched[j];
      rangesRecords[tbdId][currentSearch.timestamp] = currentSearch.payload;
    }
  }
  return rangesRecords;
};

/**
 * Remove all the data present in a collection for a given tbdId between a lower and an upper value
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const removeRecords = (cacheId, tbdId, lower, upper) => {
  const { collection } = getCollection(cacheId, tbdId);
  deleteInterval(collection, lower, upper);
};

/**
 * Remove all data per tbdIds, except those present in the list of interval to preserve
 * @param string tbdId
 * @param Array<interval> intervals
 */
const removeAllExceptIntervals = (cacheId, toKeep) => {
  const tbdIdsTemp = listCachedCollections(cacheId);
  for (let i = 0; i < tbdIdsTemp.length; i += 1) {
    if (toKeep[getNonPrefixedId(tbdIdsTemp[i])]) {
      const query = createDiffQuery(toKeep[getNonPrefixedId(tbdIdsTemp[i])].interval);
      const { collection } = getCollection(cacheId, getNonPrefixedId(tbdIdsTemp[i]));
      if (collection) collection.chain().find(query).remove();
    } else {
      removeCollection(cacheId, getNonPrefixedId(tbdIdsTemp[i]));
    }
  }
};

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
  getLastRecords,
  getRecordsByInterval,
  getPrefixedId,
  removeRecords,
  removeAllExceptIntervals,
};
