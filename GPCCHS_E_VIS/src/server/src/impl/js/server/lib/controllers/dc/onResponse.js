const _isBuffer = require('lodash/isBuffer');
const _isEqual = require('lodash/isEqual');
const logger = require('common/log')('controllers:onResponse');
const globalConstants = require('common/constants');
const { encode, decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

const protobufSuccess = encode('dc.dataControllerUtils.Status', {
  status: globalConstants.STATUS_SUCCESS,
});

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
 * @param queryIdBuffer
 * @param statusBuffer
 * @param reasonBuffer
 */
module.exports.onResponse = (queryIdBuffer, statusBuffer, reasonBuffer) => {
  logger.verbose('called');

  // check if queryId exists in registeredCallbacks singleton, if not stop logic
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
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
  // websocketHandler(
  //   globalConstants.EVENT_ERROR,
  //   { type: globalConstants.ERRORTYPE_RESPONSE, reason }
  // );
  // TODO SEND TO CLIENT!

  return callback(new Error((typeof reason !== 'undefined') ? reason : 'unknown reason'));
};
