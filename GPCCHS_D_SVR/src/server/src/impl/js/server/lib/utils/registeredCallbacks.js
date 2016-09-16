const debug = require('../io/debug')('utils:registeredCallbacks');
const _ = require('lodash');

let callbacks = {};

function set(id, callback) {
  if (!_.isString(id) || _.isEmpty(id)) {
    throw new Error(`setting a new callback required a string id '${id}'`);
  }
  if (_.has(callbacks, id)) {
    throw new Error(`a callback is already registered for this id '${id}'`);
  }
  if (!_.isFunction(callback)) {
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
  callbacks = _.omit(callbacks, [id]);
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
