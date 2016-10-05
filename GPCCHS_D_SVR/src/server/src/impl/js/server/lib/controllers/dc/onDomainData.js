const debug = require('../../io/debug')('controllers:onDomainData');
const { getMainWebsocket } = require('../../io/primus');
const { decode } = require('../../protobuf');
const { setDomains } = require('../../utils/domains');

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

const sendDomainData = (spark, buffer) => {
  debug.verbose('called');

  // deprotobufferize domains
  const message = decode('dc.dataControllerUtils.DomainResponse', buffer);
  debug.debug('domains', message.domains);
  // store domains
  setDomains(message.domains);
  // forward to client
  spark.write({
    event: 'domainResponse',
    payload: message.domains,
  });
};

const onDomainData = (buffer) => {
  const spark = getMainWebsocket();
  sendDomainData(spark, buffer);
};

module.exports = {
  onDomainData,
  sendDomainData,
};
