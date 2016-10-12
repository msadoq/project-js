const debug = require('../io/debug')('websocket');
const primus = require('./primus');
const _ = require('lodash');

const TIMESTEP = 100; // 100 ms
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

const flushMainQueue = _.throttle(() => {
  debug.debug('sending data to window');
  const start = process.hrtime();
  sendToMain('timebasedData', mainQueue);
  const stop = process.hrtime(start);
  debug.debug('flushing time', stop);
  mainQueue = {};
}, TIMESTEP);

const addToMainQueue = (remoteId, payload) => {
  debug.debug('adding to queue');
  const previous = _.get(mainQueue, [remoteId], []);
  _.set(mainQueue, [remoteId], _.concat(previous, payload));
  flushMainQueue();
};

module.exports = {
  sendToMain,
  addToMainQueue,
};
