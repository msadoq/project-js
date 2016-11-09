const debug = require('../../io/debug')('controllers:onDomainData');
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
const { sendToMain } = require('../../websocket/sendToMain');
// eslint-disable-next-line import/no-extraneous-dependencies
const { decode } = require('common/protobuf');
const { setDomains } = require('../../utils/domains');
const registeredCallbacks = require('../../utils/registeredCallbacks');

/**
 * Triggered on DC domain request response.
 *
 * - deprotobufferize domains
 * - store domains
 * - forward to client
 *
 * @param buffer
 */

const domainData = (websocketHandler, queryIdBuffer, domainsBuffer) => {
  debug.verbose('called');

  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  debug.debug('decoded queryId', queryId);

  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return undefined;
  }
  // deprotobufferize domains
  const domains = decode('dc.dataControllerUtils.Domains', domainsBuffer).domains;

  // store domains
  setDomains(domains);
  // forward to client
  return websocketHandler(globalConstants.EVENT_DOMAIN_RESPONSE, domains);
};

const onDomainData = (queryIdBuffer, domainsBuffer) => {
  domainData(sendToMain, queryIdBuffer, domainsBuffer);
};

module.exports = {
  onDomainData,
  domainData,
};
