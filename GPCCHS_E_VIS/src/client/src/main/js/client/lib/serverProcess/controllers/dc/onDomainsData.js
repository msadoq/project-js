const logger = require('../../../common/logManager')('controllers:onDomainData');
const { decode } = require('common/protobuf');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (reply, queryIdBuffer, buffer) => {
  logger.silly('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);

  const { domains } = decode('dc.dataControllerUtils.Domains', buffer);
  reply(queryId, { domains });
};
