const debug = require('../io/debug')('controllers:onDcResponse');
const { decode } = require('../protobuf');
const { get, remove } = require('../utils/registeredCallbacks');

/**
 * Controller that listen for DC incoming Response, simply run registered callback
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

  if (message.status === 'OK') {
    return callback(null);
  }
  if (message.status === 'WARNING' || message.status === 'ERROR') {
    return callback(new Error(message && message.reason ? message.reason : 'unknown reason'));
  }

  return callback(new Error(`DC Response unknown status '${message.status}'`));
};

module.exports = onDcResponse;
