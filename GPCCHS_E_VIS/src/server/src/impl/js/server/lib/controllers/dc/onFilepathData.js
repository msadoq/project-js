const logger = require('common/log')('controllers:onFilepathData');
const { decode } = require('common/protobuf');
const reply = require('common/ipc/reply');

/**
 * Handle FMD filepath request response from DC
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports.onFilepathData = (queryIdBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const { string } = decode('dc.dataControllerUtils.String', buffer);
  reply(queryId, { path: string });
};
