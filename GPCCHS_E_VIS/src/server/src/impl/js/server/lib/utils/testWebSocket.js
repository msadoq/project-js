// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

let queue = {};
let message = {};

const sendToTestWs = (event, payload, queryId) => {
  message.event = event;
  message.payload = payload;
  message.queryId = queryId;
};

const flushTestQueue = () => {
  sendToTestWs(globalConstants.EVENT_TIMEBASED_DATA, queue);
  queue = {};
};

const addToTestQueue = (remoteId, payloads) => {
  if (!Object.keys(payloads).length) {
    return;
  }
  if (typeof queue[remoteId] === 'undefined') {
    queue[remoteId] = {};
  }

  queue[remoteId] = Object.assign(queue[remoteId], payloads);
};

module.exports = {
  getMessage: () => message,
  resetMessage: () => { message = {}; },
  addToTestQueue,
  sendToTestWs,
  flushTestQueue,
};
