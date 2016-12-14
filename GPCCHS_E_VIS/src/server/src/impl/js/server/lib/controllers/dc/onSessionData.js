const logger = require('common/log')('controllers:onSessionData');
const globalConstants = require('common/constants');
const { sendToMain } = require('../../websocket/sendToMain');
const { decode } = require('common/protobuf');
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
  logger.verbose('called');

  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

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
