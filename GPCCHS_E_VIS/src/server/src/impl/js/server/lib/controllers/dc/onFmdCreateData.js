const logger = require('common/log')('controllers:onFmdCreateData');
const globalConstants = require('common/constants');
const { decode } = require('common/protobuf');
const reply = require('common/ipc/reply');

/**
 * Triggered on create FMD document response
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param statusBuffer
 * @param buffer
 */
module.exports = (queryIdBuffer, statusBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const { status } = decode('dc.dataControllerUtils.Status', statusBuffer);
  if (status !== globalConstants.STATUS_SUCCESS) {
    const { string: reason } = decode('dc.dataControllerUtils.String', buffer);
    reply(queryId, { err: reason });
  } else {
    reply(queryId, decode('dc.dataControllerUtils.FMDFileInfo', buffer));
  }
};

