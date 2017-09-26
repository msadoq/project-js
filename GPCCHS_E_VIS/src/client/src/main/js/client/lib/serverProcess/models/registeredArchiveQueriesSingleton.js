// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Modify querySingleton => pass queryId as a parameter
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Create registeredArchiveQueriesSingleton models ( and its test)
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// END-HISTORY
// ====================================================================

import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';

let queriesIdCollections = {};

const add = (queryId, tbdId, type, dataId) => {
  if (!_isString(tbdId) || _isEmpty(tbdId)) {
    throw new Error(`adding a new query required a string id '${tbdId}'`);
  }
  if (_has(queriesIdCollections, queryId)) {
    throw new Error(`a query is already registered for this id '${queryId}'`);
  }
  if (!_isString(type)) {
    throw new Error(`invalid type '${type}'`);
  }
  queriesIdCollections[queryId] = { tbdId, type, dataId };
};

const get = queryId => queriesIdCollections[queryId];

const getAll = () => queriesIdCollections;

const remove = (queryId) => {
  delete queriesIdCollections[queryId];
};

const pop = (queryId) => {
  const query = get(queryId);
  remove(queryId);
  return query;
};

const clear = () => {
  queriesIdCollections = {};
};


export default{
  add,
  get,
  pop,
  getAll,
  remove,
  clear,
};
