const debug = require('../../io/debug')('controllers:onResponse');
const { decode } = require('../../protobuf');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const { sendToMain } = require('../../websocket/sendToMain');
const constants = require('../../constants');

/**
 * Triggered on incoming DcResponse message from DC.
 *
 * - deprotobufferize queryId
 * - check if queryId exists in registeredCallbacks singleton, if no stop logic
 * - unregister queryId
 * - deprotobufferize status
 * - if status is SUCCESS, execute callback and stop logic
 * - deprotobufferize reason
 * - send error message to client and execute callback
 *
 * @param buffer
 */
const response = (websocketHandler, queryIdBuffer, statusBuffer, reasonBuffer) => {
  debug.verbose('called');

  debug.debug('decode queryId');
  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(queryId);
  if (typeof callback === 'undefined') {
    return undefined;
  }

  // unregister queryId
  registeredCallbacks.remove(queryId);

  debug.debug('decode status');
  // deprotobufferize status
  const status = decode('dc.dataControllerUtils.Status', statusBuffer).status;
  // if status is SUCCESS, execute callback and stop logic
  if (status === constants.STATUS_SUCCESS) {
    return callback(null);
  }

  debug.debug('decode reason');
  // deprotobufferize reason
  const reason = (typeof reasonBuffer !== 'undefined') ? decode('dc.dataControllerUtils.String', reasonBuffer).string : reasonBuffer;

  // send error message to client and execute callback
  websocketHandler('error', { type: constants.ERRORTYPE_RESPONSE, reason });
  return callback(new Error((typeof reason !== 'undefined') ? reason : 'unknown reason'));
};

module.exports = {
  onResponse: (queryIdBuffer, statusBuffer, reasonBuffer) =>
    response(sendToMain, queryIdBuffer, statusBuffer, reasonBuffer),
  response,
};
