/* eslint no-underscore-dangle:0 import/no-extraneous-dependencies:0 */
const _isBuffer = require('lodash/isBuffer');
const _isEqual = require('lodash/isEqual');
const globalConstants = require('common/constants');
const { encode, decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');
const debug = require('../../io/debug')('controllers:onResponse');
const { sendToMain } = require('../../websocket/sendToMain');

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

const protobufSuccess = encode('dc.dataControllerUtils.Status', { status: globalConstants.STATUS_SUCCESS });

const response = (websocketHandler, queryIdBuffer, statusBuffer, reasonBuffer) => {
  debug.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(queryId);
  if (typeof callback === 'undefined') {
    return undefined;
  }

  // unregister queryId
  registeredCallbacks.remove(queryId);

  // if status is SUCCESS, execute callback and stop logic
  if (_isEqual(statusBuffer, protobufSuccess)) {
    return callback(null);
  }

  // deprotobufferize reason
  const reason = _isBuffer(reasonBuffer)
    ? decode('dc.dataControllerUtils.String', reasonBuffer).string
    : reasonBuffer;

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
