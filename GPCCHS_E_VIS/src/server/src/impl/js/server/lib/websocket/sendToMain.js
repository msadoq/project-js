const debug = require('../io/debug')('websocket');
const primus = require('./primus');
const {
  get: _get,
  set: _set,
  throttle: _throttle,
  concat: _concat,
} = require('lodash');

const FLUSH_FREQUENCY = 25; // ms
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
  sendToMain('timebasedData', mainQueue);
  const stop = process.hrtime(start);
  debug.debug('flushing time', stop);
  mainQueue = {};
}, FLUSH_FREQUENCY);

const addToMainQueue = (remoteId, payload) => {
  debug.debug('adding to queue');
  const previous = _get(mainQueue, [remoteId], []);
  _set(mainQueue, [remoteId], _concat(previous, payload));
  flushMainQueue();
};

module.exports = {
  sendToMain,
  addToMainQueue,
};
