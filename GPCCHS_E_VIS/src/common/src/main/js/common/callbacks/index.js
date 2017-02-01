const _isString = require('lodash/isString');
const _isEmpty = require('lodash/isEmpty');
const _has = require('lodash/has');
const _isFunction = require('lodash/isFunction');

const getLogger = require('../log');

const logger = getLogger('common:registeredCallbacks');

let callbacks = {};

const set = (id, callback) => {
  if (!_isString(id) || _isEmpty(id)) {
    throw new Error(`setting a new callback required a string id '${id}'`);
  }
  if (_has(callbacks, id)) {
    throw new Error(`a callback is already registered for this id '${id}'`);
  }
  if (!_isFunction(callback)) {
    throw new Error(`setting a new callback require a valid function '${id}'`);
  }

  logger.silly(`callback registered for '${id}'`);
  callbacks[id] = callback;
};

const get = id => callbacks[id];

const getAll = () => callbacks;

const remove = (id) => {
  delete callbacks[id];
};

const pop = (id) => {
  const callback = get(id);
  remove(id);
  return callback;
};

const clear = () => {
  logger.debug('callbacks cleared');
  callbacks = {};
};

module.exports = {
  set,
  get,
  pop,
  getAll,
  remove,
  clear,
};
