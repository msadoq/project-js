const debug = require('../../io/debug')('controllers:onResponse');
const { encode, decode } = require('../../protobuf');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const { sendToMain } = require('../../websocket/sendToMain');
const constants = require('../../constants');
const { isEqual: _isEqual } = require('lodash');
const { constants: globalConstants } = require('common');

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

const protobufSuccess = encode('dc.dataControllerUtils.Status', { status: constants.STATUS_SUCCESS });

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
  /*const status = decode('dc.dataControllerUtils.Status', statusBuffer).status;*/
  // if status is SUCCESS, execute callback and stop logic
  if (_isEqual(statusBuffer, protobufSuccess)) {
    return callback(null);
  }

  debug.debug('decode reason');
  // deprotobufferize reason
  const reason = (typeof reasonBuffer !== 'undefined') ? decode('dc.dataControllerUtils.String', reasonBuffer).string : reasonBuffer;

  // send error message to client and execute callback
  websocketHandler(
    globalConstants.EVENT_ERROR,
    { type: globalConstants.ERRORTYPE_RESPONSE, reason }
  );
  return callback(new Error((typeof reason !== 'undefined') ? reason : 'unknown reason'));
};

module.exports = {
  onResponse: (queryIdBuffer, statusBuffer, reasonBuffer) =>
    response(sendToMain, queryIdBuffer, statusBuffer, reasonBuffer),
  response,
};
