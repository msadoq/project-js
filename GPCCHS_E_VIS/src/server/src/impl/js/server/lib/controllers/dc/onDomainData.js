const logger = require('common/log')('controllers:onDomainData');
const globalConstants = require('common/constants');
const { decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

const { sendToMain } = require('../../websocket/sendToMain');

/**
 * Triggered on DC domain request response.
 *
 * - deprotobufferize domains
 * - store domains
 * - forward to client
 *
 * @param websocketHandler
 * @param queryIdBuffer
 * @param domainsBuffer
 */
const domainData = (websocketHandler, queryIdBuffer, domainsBuffer) => {
  logger.verbose('called');

  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return undefined;
  }
  // deprotobufferize domains
  const domains = decode('dc.dataControllerUtils.Domains', domainsBuffer).domains;

  // forward to client
  return websocketHandler(globalConstants.EVENT_DOMAIN_DATA, domains, queryId);
};

const onDomainData = (queryIdBuffer, domainsBuffer) => {
  domainData(sendToMain, queryIdBuffer, domainsBuffer);
};

module.exports = {
  onDomainData,
  domainData,
};
