const debug = require('../io/debug')('utils:registeredQueries');
const _ = require('lodash');

let queries = {};

function set(queryId, remoteId) {
  if (!_.isString(queryId) || _.isEmpty(queryId)) {
    throw new Error(`setting a new query require a string id '${queryId}'`);
  }
  if (_.has(queries, queryId)) {
    throw new Error(`a query is already registered for this id '${queryId}'`);
  }
  if (!_.isString(remoteId) || _.isEmpty(remoteId)) {
    throw new Error(`setting a new remoteId require a string id '${queryId}'`);
  }

  debug.debug(`query registered for '${queryId}'`);
  queries[queryId] = remoteId;
}

function get(queryId) {
  return queries[queryId];
}

function getAll() {
  return queries;
}

function remove(queryId) {
  queries = _.omit(queries, [queryId]);
}

function removeMulti(queryIds) {
  queries = _.omit(queries, queryIds);
}

function clear() {
  debug.debug('queries cleared');
  queries = {};
}

module.exports = {
  set,
  get,
  getAll,
  remove,
  removeMulti,
  clear,
};
