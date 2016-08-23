const debug = require('../io/debug')('models:cacheJson');
const database = require('../io/loki');
const { resolveCacheFilters } = require('../dataCache/filterApi');
const { inspect } = require('util');

const collection = database.addCollection('cacheJson');

collection.addRecord = (meta, data) => {
  collection.insert(Object.assign({}, meta, {
    jsonPayload: data,
  }));
  debug.debug('inserted', meta, data);
};

collection.retrieveBySubscription = ({ catalog, parameter, visuWindow, sessionId, filter }) => {
  const query = {
    $and: [
      // TODO : and we do not search by type like in models/subscriptions???
      { catalog },
      { parameter },
      // TODO : I don't think sessionId is mandatory and systematic, a timeline could be a recordset
      { session: sessionId },
    ],
  };

  if (typeof visuWindow !== 'undefined') {
    const {
      lower,
      upper,
    } = visuWindow;
    if (typeof lower !== 'undefined') {
      query.$and.push({ timestamp: { $gte: lower } });
    }
    if (typeof upper !== 'undefined') {
      query.$and.push({ timestamp: { $lte: upper } });
    }
  }

  if (filter && filter.length) {
    const filters = resolveCacheFilters(filter);
    if (filters.length) {
      query.$and = query.$and.concat(filters); // TODO : move filters computing here (in model)??
    }
  }

  debug.debug('searching for', inspect(query));
  return collection.find(query);
};

module.exports = collection;
