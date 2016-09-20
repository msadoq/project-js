const debug = require('../io/debug')('controllers:onDomainResponse');
const async = require('async');
const { decode } = require('../protobuf');

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
module.exports = (buffer) => {
  debug.verbose('called');

  let message;

  // TODO : simplify, remove async
  async.series([
    (callback) => {
      message = decode('dc.dataControllerUtils.DomainResponse', buffer);
      return callback(null);
    },
    (callback) => {
      // TODO deal with message.domains. And with message.id ?
      debug.debug('domains', message.domains);
      return callback(null);
    },
  ], err => (err ? debug.error(err) : debug.verbose('end')));
};
