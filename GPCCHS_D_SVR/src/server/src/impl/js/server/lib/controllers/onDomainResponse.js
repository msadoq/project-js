const debug = require('../io/debug')('controllers:onDomainResponse');
const async = require('async');
const _ = require('lodash');
const primus = require('../io/primus');
const { decode } = require('../protobuf');
const { setDomains } = require('../utils/domains');

// TODO : test

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

  let message;

  // TODO : simplify, remove async
  async.series([
    (callback) => {
      message = decode('dc.dataControllerUtils.DomainResponse', buffer);
      return callback(null);
    },
    (callback) => {
      debug.debug('domains', message.domains);
      setDomains(message.domains);
      spark.write({
        event: 'domainResponse',
        payload: message.domains,
      });
      return callback(null);
    },
  ], err => (err ? debug.error(err) : debug.verbose('end')));
};

const onDomainResponse = (buffer) => {
  const spark = primus.getMainWebsocket();
  sendDomains(spark, buffer);
};

module.exports = {
  onDomainResponse,
  sendDomains,
};
