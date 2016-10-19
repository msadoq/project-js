const {
  get: _get,
  set: _set,
  concat: _concat,
} = require('lodash');

let testQueue = {};
let message = {};

const sendToTestWs = (event, payload) => {
  message.event = event;
  message.payload = payload;
};

const flushTestQueue = () => {
  sendToTestWs('timebasedData', testQueue);
  testQueue = {};
};

const addToTestQueue = (remoteId, payload) => {
  const previous = _get(testQueue, [remoteId]);
  if (typeof previous === 'undefined') {
    _set(testQueue, [remoteId], payload);
  } else {
    _set(testQueue, [remoteId], _concat(previous, payload));
  }
  flushTestQueue();
};

module.exports = {
  getMessage: () => message,
  resetMessage: () => { message = {}; },
  addToTestQueue,
  sendToTestWs,
};
