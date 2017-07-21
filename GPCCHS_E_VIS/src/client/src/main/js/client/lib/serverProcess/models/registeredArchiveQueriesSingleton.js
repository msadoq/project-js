import { v4 } from 'uuid';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';

let queriesIdCollections = {};

const add = (tbdId, type) => {
  if (!_isString(tbdId) || _isEmpty(tbdId)) {
    throw new Error(`adding a new query required a string id '${tbdId}'`);
  }
  if (_has(queriesIdCollections, tbdId)) {
    throw new Error(`a query is already registered for this id '${tbdId}'`);
  }
  if (!_isString(tbdId)) {
    throw new Error(`invalid type '${type}'`);
  }
  const queryId = v4();
  queriesIdCollections[queryId] = { tbdId, type };
  return queryId;
};

const get = id => queriesIdCollections[id];

const getAll = () => queriesIdCollections;

const remove = (id) => {
  delete queriesIdCollections[id];
};

const pop = (id) => {
  const query = get(id);
  remove(id);
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
