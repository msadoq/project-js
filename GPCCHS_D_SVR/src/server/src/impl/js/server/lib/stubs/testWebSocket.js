const _ = require('lodash');

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
  const previous = _.get(testQueue, [remoteId]);
  if (typeof previous === 'undefined') {
    _.set(testQueue, [remoteId], payload);
  } else {
    _.set(testQueue, [remoteId], _.concat(previous, payload));
  }
  flushTestQueue();
};

module.exports = {
  getMessage: () => message,
  resetMessage: () => { message = {}; },
  addToTestQueue,
  sendToTestWs,
};
