const debug = require('../../io/debug')('controllers:onResponse');

// eslint-disable-next-line no-underscore-dangle
const _isEqual = require('lodash/isEqual');

// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
// eslint-disable-next-line import/no-extraneous-dependencies
const { encode, decode } = require('common/protobuf');

// eslint-disable-next-line import/no-extraneous-dependencies
const registeredCallbacks = require('common/callbacks/register');

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
