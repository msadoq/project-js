const { onDomainQuery } = require('./onDomainQuery');
const onPull = require('./onPull');
const { onCacheCleanup } = require('./onCacheCleanup');
const { onTimebasedQuery } = require('./onTimebasedQuery');
const { onSessionQuery } = require('./onSessionQuery');
const { onFilepathQuery } = require('./onFilepathQuery');

module.exports = {
  getDomains: onDomainQuery, // TODO rename + constant
  getSessions: onSessionQuery, // TODO rename + constant
  cleanupCache: onCacheCleanup, // TODO rename + constant
  getData: onPull, // TODO rename + constant
  timebasedQuery: onTimebasedQuery, // TODO rename + constant
  filepathQuery: onFilepathQuery, // TODO rename + constant
};
