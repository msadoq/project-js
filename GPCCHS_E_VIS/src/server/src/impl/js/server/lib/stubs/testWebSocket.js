const {
  get: _get,
  set: _set,
} = require('lodash');
const { constants: globalConstants } = require('common');

let testQueue = {};
let message = {};

const sendToTestWs = (event, payload) => {
  message.event = event;
  message.payload = payload;
};

const flushTestQueue = () => {
  sendToTestWs(globalConstants.EVENT_TIMEBASED_DATA, testQueue);
  testQueue = {};
};

const addToTestQueue = (remoteId, payload) => {
  _set(testQueue, [remoteId], Object.assign({}, _get(testQueue, [remoteId]), payload));
  flushTestQueue();
};

module.exports = {
  getMessage: () => message,
  resetMessage: () => { message = {}; },
  addToTestQueue,
  sendToTestWs,
};
