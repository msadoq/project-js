const debug = require('../../io/debug')('controllers:onResponse');
const { decode } = require('../../protobuf');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const { getMainWebsocket } = require('../../io/primus');
/**
 * Triggered on incoming DcResponse message from DC.
 *
 * - deprotobufferize
 * - check if queryId exists in registeredCallbacks singleton, if no stop logic
 * - unregister queryId
 * - if status is SUCCESS, execute callback and stop logic
 * - send error message to client and execute callback
 *
 * @param buffer
 */
const response = (spark, buffer) => {
  debug.verbose('called');

  // deprotobufferize buffer
  const message = decode('dc.dataControllerUtils.DcResponse', buffer);
  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(message.id);
  if (!callback) {
    throw new Error('This DC response corresponds to no id');
  }

  // unregister queryId
  registeredCallbacks.remove(message.id);

  // if status is SUCCESS, execute callback and stop logic
  if (message.status === 0) { // OK
    return callback(null);
  }

  // send error message to client and execute callback
  spark.write({
    event: 'responseError',
    payload: message.reason,
  });
  return callback(new Error(message && message.reason ? message.reason : 'unknown reason'));
};

module.exports = {
  onResponse: (buffer) => {
    const mainWebsocket = getMainWebsocket();
    return response(mainWebsocket, buffer);
  },
  response,
};
