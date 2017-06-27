const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onDomainData');
const { pop } = require('../../../common/callbacks');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (queryIdBuffer, buffer) => {
  logger.silly('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);
  const callback = pop(queryId);

  const { domains } = decode('dc.dataControllerUtils.Domains', buffer);
  callback(domains);
};
