import _noop from 'lodash/noop';
import { get } from 'common/configurationManager';
import {
  getCollection as getCollectionGeneric,
  displayCollection as displayCollectionGeneric,
  removeCollection as removeCollectionGeneric,
  removeAllCollections as removeAllCollectionsGeneric,
  addRecord as addRecordGeneric,
  addRecords as addRecordsGeneric,
  getOrCreateCollection as getOrCreateCollectionGeneric,
} from './lokiGeneric';

const database = require('./loki');

const isCacheDisabled = String(get('DISABLE_LOKI_CACHE')) === 'true';

const cacheId = 'obsoleteEvent';

// List of the obsoleteId indexing a lokiJs collection
const obsoleteIds = [];

/* ============================= Generic function overload ============================= */

/**
 * Get a collection indexed by the given obsoleteId
 * @param string obsoleteId
 */
const getCollection = obsoleteId => getCollectionGeneric(cacheId, obsoleteId);

const displayCollection = obsoleteId => displayCollectionGeneric(cacheId, obsoleteId);

const removeCollection = (obsoleteId) => {
  removeCollectionGeneric(cacheId, obsoleteId);
  const index = obsoleteIds.indexOf(obsoleteId);
  if (index > -1) {
    obsoleteIds.splice(index, 1);
  }
};

const addRecord = (obsoleteId, value) => {
  if (obsoleteIds.indexOf(obsoleteId) === -1) {
    obsoleteIds.push(obsoleteId);
  }
  return addRecordGeneric(cacheId, obsoleteId, value);
};

const addRecords = (obsoleteId, records) => {
  if (obsoleteIds.indexOf(obsoleteId) === -1) {
    obsoleteIds.push(obsoleteId);
  }
  return addRecordsGeneric(cacheId, obsoleteId, records);
};

const getOrCreateCollection = (obsoleteId) => {
  if (obsoleteIds.indexOf(obsoleteId) === -1) {
    obsoleteIds.push(obsoleteId);
  }
  return getOrCreateCollectionGeneric(cacheId, obsoleteId);
};

const removeAllCollections = () => {
  obsoleteIds.splice(0, obsoleteIds.length);
  return removeAllCollectionsGeneric();
};
/* ============================= Generic function overload ============================= */

const getDb = () => database;

/**
 * List all the ids present in the store
 */
const listCachedCollections = () => obsoleteIds;

const getRecordByTimestamp = (obsoleteId, timestamp) => {
  const prefixedCollectionId = `${cacheId}.${obsoleteId}`;
  return getDb().getCollection(prefixedCollectionId).find({ timestamp });
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

const getObsoleteEventRecordsByInterval = (obsoleteId, intervals) => {
  const { collection, isNew } = getOrCreateCollection(obsoleteId);
  const obsoleteEventRecords = { [obsoleteId]: {} };
  if (isNew) return obsoleteEventRecords;
  for (let i = 0; i < intervals.length; i += 1) {
    const searched = searchInterval(collection, intervals[i][0], intervals[i][1]);
    for (let j = 0; j < searched.length; j += 1) {
      const currentSearch = searched[j];
      obsoleteEventRecords[obsoleteId][currentSearch.timestamp] = currentSearch.payload;
    }
  }
  return obsoleteEventRecords;
};

export default {
  getCollection,
  addRecord: isCacheDisabled ? _noop : addRecord,
  addRecords,
  listCachedCollections,
  removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
  getRecordByTimestamp,
  getObsoleteEventRecordsByInterval,
  getDb,
};
