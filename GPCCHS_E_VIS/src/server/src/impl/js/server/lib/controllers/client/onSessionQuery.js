const debug = require('../../io/debug')('controllers:onSessionQuery');
// eslint-disable-next-line import/no-extraneous-dependencies
const { encode } = require('common/protobuf');
// eslint-disable-next-line import/no-extraneous-dependencies
const zmq = require('common/zmq');
// eslint-disable-next-line import/no-extraneous-dependencies
const registeredCallbacks = require('common/callbacks/register');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

/**
 * Triggered when there is a new session query on HSC
 *
 * - send a SessionQuery message to DC
 *
 * @param spark
 */

const protobufSessionHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_SESSION_QUERY,
});
let idIndex = 0;
const generateSessionId = () => {
  idIndex += 1;
  return `session${idIndex}`;
};

const errorCallback = (err) => {
  if (err) {
    throw err;
  }
};

const sessionQuery = (id, messageHandler) => {
  debug.debug('new session query');

  // create and register queryId
  const queryId = (typeof id === 'undefined') ? generateSessionId() : id;
  registeredCallbacks.set(queryId, errorCallback);
  // protobufferize queryId
  const protobufQueryId = encode('dc.dataControllerUtils.String', {
    string: queryId,
  });

  const queryArgs = [protobufSessionHeader, protobufQueryId];

  messageHandler('dcPush', queryArgs);
};

module.exports = {
  sessionQuery,
  onSessionQuery: queryId => sessionQuery(queryId, zmq.push),
};
