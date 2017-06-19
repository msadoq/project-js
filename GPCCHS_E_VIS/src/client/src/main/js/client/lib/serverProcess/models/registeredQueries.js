const logger = require('../../common/logManager')('utils:registeredQueries');
const _isString = require('lodash/isString');
const _isEmpty = require('lodash/isEmpty');
const _remove = require('lodash/remove');
const _values = require('lodash/values');
const _get = require('lodash/get');
const _reduce = require('lodash/reduce');

const database = require('./loki');

const collection = database.addCollection('registeredQueries',
  {
    unique: 'queryId',
  }
);

collection.getQueryIdIndex = () => collection.constraints.unique.queryId;

collection.addRecord = (queryId, flatDataId) => {
  if (!_isString(queryId) || _isEmpty(queryId)) {
    throw new Error(`setting a new query require a string id '${queryId}'`);
  }
  if (!_isString(flatDataId) || _isEmpty(flatDataId)) {
    throw new Error(`setting a new flat DataId require a string id '${queryId}'`);
  }

  logger.silly(`query registered for '${queryId}'`);
  collection.insert({
    queryId,
    flatDataId,
  });
};

collection.getByQueryId = queryId => _get(collection.by('queryId', queryId), 'flatDataId');

collection.getAll = () => _remove(_values(collection.getQueryIdIndex().keyMap), undefined);

collection.removeMultiQueryIds = (queryIds) => {
  const registeredQueries = _reduce(queryIds, (res, queryId) => {
    const query = collection.by('queryId', queryId);
    if (query) {
      res.push(query);
    }
    return res;
  }, []);
  collection.remove(registeredQueries);
};

collection.removeByQueryId = (queryId) => {
  const registeredQuery = collection.by('queryId', queryId);
  if (!registeredQuery) {
    return;
  }
  collection.remove(registeredQuery);
};


collection.cleanup = () => {
  logger.debug('queries cleared');
  collection.clear();
  collection.getQueryIdIndex().clear();
};

module.exports = collection;
