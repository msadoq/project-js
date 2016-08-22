const debug = require('../io/debug')('models:cacheJson');
const database = require('../io/loki');
const { resolveCacheFilters } = require('../dataCache/filterApi');
const util = require('util');

const collection = database.addCollection('cacheJson');

collection.addRecord = (meta, data) => {
  collection.insert(Object.assign({}, meta, {
    jsonPayload: data,
  }));
  debug.debug('inserted', meta, data);
};

collection.retrieveBySubscription = ({ catalog, parameter, visuWindow, sessionId, filter }) => {
  const {
    lower,
    upper,
  } = visuWindow;
  const filters = resolveCacheFilters(filter);

  debug.debug(
    `Retrieving ${parameter} from ${catalog} for [${lower},${upper}] interval`,
    util.inspect(filters)
  );

  const query = {
    $and: [
      {
        catalog,
      }, {
        parameter,
      }, {
        timestamp: {
          $gte: lower,
        },
      }, {
        timestamp: {
          $lte: upper,
        },
      }, {
        session: sessionId,
      },
    ],
  };

  if (filters.length) {
    query.$and.push(filters);
  }

  debug.debug('searching for', query);
  return collection.find(query);
};

// TODO : unit test

module.exports = collection;
