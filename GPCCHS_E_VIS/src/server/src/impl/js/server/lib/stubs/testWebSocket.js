const {
  get: _get,
  set: _set,
} = require('lodash');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

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
