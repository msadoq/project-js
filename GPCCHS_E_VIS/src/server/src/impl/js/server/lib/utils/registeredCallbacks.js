const debug = require('../io/debug')('utils:registeredCallbacks');
const {
  isString: _isString,
  isEmpty: _isEmpty,
  has: _has,
  isFunction: _isFunction,
  omit: _omit,
} = require('lodash');

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
