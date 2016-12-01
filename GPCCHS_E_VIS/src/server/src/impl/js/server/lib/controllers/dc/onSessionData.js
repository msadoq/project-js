const debug = require('../../io/debug')('controllers:onSessionData');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
const { sendToMain } = require('../../websocket/sendToMain');
// eslint-disable-next-line import/no-extraneous-dependencies
const { decode } = require('common/protobuf');
// eslint-disable-next-line import/no-extraneous-dependencies
const registeredCallbacks = require('common/callbacks');

/**
 * Triggered on DC session request response.
 *
 * - deprotobufferize sessions
 * - forward to client
 *
 * @param websocketHandler
 * @param queryIdBuffer
 * @param sessionsBuffer
 */

const sessionData = (websocketHandler, queryIdBuffer, sessionsBuffer) => {
  debug.verbose('called');

  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  debug.debug('decoded queryId', queryId);

  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return undefined;
  }
  // deprotobufferize sessions
  const sessions = decode('dc.dataControllerUtils.Sessions', sessionsBuffer).sessions;

  // forward to client
  return websocketHandler(globalConstants.EVENT_SESSION_DATA, sessions, queryId);
};

const onSessionData = (queryIdBuffer, sessionsBuffer) => {
  sessionData(sendToMain, queryIdBuffer, sessionsBuffer);
};

module.exports = {
  onSessionData,
  sessionData,
};
