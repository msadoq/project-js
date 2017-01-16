const logger = require('common/log')('controllers:onDomainData');
const { decode } = require('common/protobuf');
const reply = require('common/ipc/reply');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (queryIdBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const { domains } = decode('dc.dataControllerUtils.Domains', buffer);
  reply(queryId, { domains });
};
