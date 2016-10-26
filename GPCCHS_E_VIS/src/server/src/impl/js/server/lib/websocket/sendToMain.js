// eslint-disable-next-line import/no-extraneous-dependencies
const { constants: globalConstants } = require('common');
const debug = require('../io/debug')('websocket');
const primus = require('./primus');
const {
  get: _get,
  set: _set,
  throttle: _throttle,
} = require('lodash');

let mainQueue = {};

const sendToMain = (event, payload) => {
  const instance = primus.get();
  if (typeof instance === 'undefined') {
    throw new Error('primus wasn\'t inited yet');
  }
  instance.forEach((spark) => {
    if (spark.hsc.identity === 'main') {
      spark.write({ event, payload });
    }
  });
};

const flushMainQueue = _throttle(() => {
  debug.debug('sending data to window');
  const start = process.hrtime();
  sendToMain(globalConstants.EVENT_TIMEBASED_DATA, mainQueue);
  const stop = process.hrtime(start);
  debug.debug('flushing time', stop);
  mainQueue = {};
}, globalConstants.FLUSH_TO_HSC_FREQUENCY);

const addToMainQueue = (remoteId, payload) => {
  debug.debug('adding to queue');
  _set(mainQueue, [remoteId], Object.assign({}, _get(mainQueue, [remoteId]), payload));
  flushMainQueue();
};

module.exports = {
  sendToMain,
  addToMainQueue,
};
