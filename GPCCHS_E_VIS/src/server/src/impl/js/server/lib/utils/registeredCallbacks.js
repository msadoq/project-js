const debug = require('../io/debug')('utils:registeredCallbacks');

// eslint-disable-next-line no-underscore-dangle
const _isString = require('lodash/isString');
// eslint-disable-next-line no-underscore-dangle
const _isEmpty = require('lodash/isEmpty');
// eslint-disable-next-line no-underscore-dangle
const _has = require('lodash/has');
// eslint-disable-next-line no-underscore-dangle
const _isFunction = require('lodash/isFunction');
// eslint-disable-next-line no-underscore-dangle
const _omit = require('lodash/omit');

let callbacks = {};

function set(id, callback) {
  if (!_isString(id) || _isEmpty(id)) {
    throw new Error(`setting a new callback required a string id '${id}'`);
  }
  if (_has(callbacks, id)) {
    throw new Error(`a callback is already registered for this id '${id}'`);
  }
  if (!_isFunction(callback)) {
    throw new Error(`setting a new callback require a valid function '${id}'`);
  }

  debug.debug(`callback registered for '${id}'`);
  callbacks[id] = callback;
}

function get(id) {
  return callbacks[id];
}

function getAll() {
  return callbacks;
}

function remove(id) {
  callbacks = _omit(callbacks, [id]);
}

function clear() {
  debug.debug('callbacks cleared');
  callbacks = {};
}

module.exports = {
  set,
  get,
  getAll,
  remove,
  clear,
};
