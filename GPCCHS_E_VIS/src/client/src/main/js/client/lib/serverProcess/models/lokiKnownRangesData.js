const logger = require('../../common/logManager')('models:timebasedData');
const database = require('./loki');

// List of the tbdId indexing a lokiJs collection
const tbdIds = [];

/**
 * Get a collection indexed by the given tbdId
 * @param string tbdId
 */
const getCollection = tbdId => ({ collection: database.getCollection(tbdId) });


const displayCollection = tbdId => database.getCollection(tbdId).find();
/**
 * Get or create the collection indexed by the given tbdId
 * @param string tbdId
 */
const getOrCreateCollection = (tbdId) => {
  if (tbdIds.indexOf(tbdId) !== -1) {
    return getCollection(tbdId);
  }
  // register tbdId
  tbdIds.push(tbdId);
  // create collection
  const collection = database.addCollection(
    tbdId,
    { unique: ['timestamp'] }
  );

  return { collection, isNew: true };
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




const getLastRecords = (tbdId, interval) => {
  const { collection, isNew } = getOrCreateCollection(tbdId);
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
const getRangesRecords = (tbdId, intervals) => {
  const { collection, isNew } = getOrCreateCollection(tbdId);
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
const removeRecords = (tbdId, lower, upper) => {
  const { collection } = getCollection(tbdId);
  deleteInterval(collection, lower, upper);
};

/**
 * List all the tbdIds present in the store
 */
const listCollections = () => tbdIds;

/**
 * Remove a collection for a given tbdId
 * @param string tbdId
 */
const removeCollection = (tbdId) => {
  const { collection } = getCollection(tbdId);
  collection.clear();
  const index = tbdIds.indexOf(tbdId);
  if (index > -1) {
    tbdIds.splice(index, 1);
  }
};

/**
 * Remove all collections present in the store
 */
const removeAllCollections = () => {
  for (let i = 0; i < tbdIds.length; i += 1) removeCollection(tbdIds[i]);
};

/**
 * Add a value (timestamp,payload) for a given collection
 * @param lokiJsCollection collection
 * @param Object value
 */
const addRecord = (tbdId, value) => {
  const timestamp = value.timestamp;
  const payload = value.payload;
  const { collection } = getOrCreateCollection(tbdId);
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
const addRecords = (tbdId, records) => {
  logger.silly(`add ${records.length} records`);
  // const { collection } = getCollection(tbdId);
  for (let i = 0; i < records.length; i += 1) {
    addRecord(tbdId, records[i]);
  }
};

const getChargeLoki = () => {
  let counter = 0;
  for (let i = 0; i < tbdIds.length; i += 1) {
    const { collection } = getCollection(tbdIds[i]);
    if (collection) counter += collection.data.length;
  }
  return counter;
};

/**
 * Remove all data per tbdIds, except those present in the list of interval to preserve
 * @param string tbdId
 * @param Array<interval> intervals
 */
const removeAllExceptIntervals = (toKeep) => {
  const tbdIdsTemp = [...tbdIds];
  for (let i = 0; i < tbdIdsTemp.length; i += 1) {
    if (toKeep[tbdIdsTemp[i]]) {
      const query = createDiffQuery(toKeep[tbdIdsTemp[i]].interval);
      const { collection } = getCollection(tbdIdsTemp[i]);
      if (collection) collection.chain().find(query).remove();
    } else {
      removeCollection(tbdIdsTemp[i]);
    }
  }
};



export default {
  getCollection,
  getLastRecords,
  getRangesRecords,
  removeRecords,
  addRecord,
  addRecords,
  listCollections,
  removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
  removeAllExceptIntervals,
  getChargeLoki,
};
