const debug = require('../io/debug')('controllers:onDcResponse');
const { decode } = require('../protobuf');
const { get, remove } = require('../utils/registeredCallbacks');

/**
 * Triggered on incoming DcResponse message from DC.
 *
 * - de-protobuf
 * - retrieve and unregister registered callback
 * - execute callback
 *
 * @param buffer
 */
const onDcResponse = (buffer) => {
  debug.verbose('called');

  const message = decode('dc.dataControllerUtils.DcResponse', buffer);
  const callback = get(message.id);
  if (!callback) {
    throw new Error('This DC response corresponds to no id');
  }

  remove(message.id);

  if (message.status === 0) { // 'OK'
    return callback(null);
  }
  // 2 = 'WARNING', 1 = 'ERROR'
  if (message.status === 2 || message.status === 1) {
    return callback(new Error(message && message.reason ? message.reason : 'unknown reason'));
  }

  return callback(new Error(`DC Response unknown status '${message.status}'`));
};

module.exports = onDcResponse;
