const logger = require('common/log')('utils:registeredQueries');
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

collection.addRecord = (queryId, remoteId) => {
  if (!_isString(queryId) || _isEmpty(queryId)) {
    throw new Error(`setting a new query require a string id '${queryId}'`);
  }
  if (!_isString(remoteId) || _isEmpty(remoteId)) {
    throw new Error(`setting a new remoteId require a string id '${queryId}'`);
  }

  logger.debug(`query registered for '${queryId}'`);
  collection.insert({
    queryId,
    remoteId,
  });
};

collection.getByQueryId = queryId => _get(collection.by('queryId', queryId), 'remoteId');

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
