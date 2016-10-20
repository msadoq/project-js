const {
  get: _get,
  set: _set,
  concat: _concat,
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
  _set(testQueue, [remoteId], _concat(
      _get(testQueue, [remoteId], []),
      payload
    )
  );
  flushTestQueue();
};

module.exports = {
  getMessage: () => message,
  resetMessage: () => { message = {}; },
  addToTestQueue,
  sendToTestWs,
};
