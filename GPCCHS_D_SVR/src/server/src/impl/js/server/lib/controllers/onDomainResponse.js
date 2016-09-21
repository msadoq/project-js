const debug = require('../io/debug')('controllers:onDomainResponse');
const primus = require('../io/primus');
const { decode } = require('../protobuf');
const { setDomains } = require('../utils/domains');

// TODO :

/**
 * Triggered on DC domain request response.
 *
 * - de-protobuf
 * - store domains
 * - forward to HSC
 *
 * @param buffer
 */

const sendDomains = (spark, buffer) => {
  debug.verbose('called');

  const message = decode('dc.dataControllerUtils.DomainResponse', buffer);
  debug.debug('domains', message.domains);
  setDomains(message.domains);
  spark.write({
    event: 'domainResponse',
    payload: message.domains,
  });
};

const onDomainResponse = (buffer) => {
  const spark = primus.getMainWebsocket();
  sendDomains(spark, buffer);
};

module.exports = {
  onDomainResponse,
  sendDomains,
};
