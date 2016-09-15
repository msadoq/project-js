const debug = require('../io/debug')('controllers:onDomainResponse');
const async = require('async');
const _ = require('lodash');
const { decode } = require('../protobuf');

// TODO : test

/**
 * Controller that listen for DC incoming Domain Response
 * @param buffer
 */
module.exports = buffer => {
  debug.verbose('called');

  let message;

  async.series([
    callback => {
      message = decode('dc.dataControllerUtils.DomainResponse', buffer);
      return callback(null);
    },
    callback => {
      // TODO deal with message.domains. And with message.id ?
      debug.debug('domains', message.domains);
      return callback(null);
    },
  ], err => (err ? debug.error(err) : debug.verbose('end')));
};
