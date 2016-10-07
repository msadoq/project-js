const debug = require('../../io/debug')('controllers:onDomainData');
const { sendToMain } = require('../../websocket/sendToMain');
const { decode } = require('../../protobuf');
const { setDomains } = require('../../utils/domains');
const registeredCallbacks = require('../../utils/registeredCallbacks');
const _ = require('lodash');

// TODO :

/**
 * Triggered on DC domain request response.
 *
 * - deprotobufferize domains
 * - store domains
 * - forward to client
 *
 * @param buffer
 */

const domainData = (websocketHandler, queryIdBuffer, ...domainsBuffer) => {
  debug.verbose('called');

  // deprotobufferize queryId
  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  debug.debug('decoded queryId', queryId);

  // check if queryId exists in registeredCallbacks singleton, if no stop logic
  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    throw new Error('This Domain Data corresponds to no queryId');
  }
  debug.debug(`${domainsBuffer.length} domains`);
  // deprotobufferize domains
  const domains = _.map(domainsBuffer, domainBuffer => decode('dc.dataControllerUtils.Domain', domainBuffer));

  // store domains
  setDomains(domains);
  // forward to client
  websocketHandler('domainResponse', domains);
};

const onDomainData = (queryIdBuffer, ...domainsBuffer) => {
  domainData(sendToMain, queryIdBuffer, ...domainsBuffer);
};

module.exports = {
  onDomainData,
  domainData,
};
