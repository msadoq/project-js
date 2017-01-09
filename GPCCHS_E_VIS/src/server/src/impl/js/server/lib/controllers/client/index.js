const handle = require('common/ipc/handle');
const globalConstants = require('common/constants');
const { onDomainQuery } = require('./onDomainQuery');
const onPull = require('./onPull');
const { onCacheCleanup } = require('./onCacheCleanup');
const { onTimebasedQuery } = require('./onTimebasedQuery');
const { onSessionQuery } = require('./onSessionQuery');
const { onFilepathQuery } = require('./onFilepathQuery');

const controller = {
  [globalConstants.IPC_METHOD_DOMAINS_REQUEST]: onDomainQuery,
  [globalConstants.IPC_METHOD_SESSIONS_REQUEST]: onSessionQuery,
  [globalConstants.IPC_METHOD_CACHE_CLEANUP]: onCacheCleanup,
  [globalConstants.IPC_METHOD_TIMEBASED_PULL]: onPull,
  [globalConstants.IPC_METHOD_TIMEBASED_QUERY]: onTimebasedQuery,
  [globalConstants.IPC_METHOD_FILEPATH_REQUEST]: onFilepathQuery,
};

module.exports = data => handle(
  controller,
  data,
  payload => process.send(payload)
);
