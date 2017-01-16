const handle = require('common/ipc/handle');
const globalConstants = require('common/constants');
const { onDomainsQuery } = require('./onDomainsQuery');
const onPull = require('./onPull');
const { onCacheCleanup } = require('./onCacheCleanup');
const { onTimebasedQuery } = require('./onTimebasedQuery');
const { onSessionsQuery } = require('./onSessionsQuery');
const onServerDebug = require('./onServerDebug');
const { onFmdGet } = require('./onFmdGet');
const { onFmdCreate } = require('./onFmdCreate');
const { onGetMasterSession } = require('./onGetMasterSession');
const { onGetSessionTime } = require('./onGetSessionTime');

const controller = {
  [globalConstants.IPC_METHOD_DOMAINS_REQUEST]: onDomainsQuery,
  [globalConstants.IPC_METHOD_SESSIONS_REQUEST]: onSessionsQuery,
  [globalConstants.IPC_METHOD_CACHE_CLEANUP]: onCacheCleanup,
  [globalConstants.IPC_METHOD_TIMEBASED_PULL]: onPull,
  [globalConstants.IPC_METHOD_TIMEBASED_QUERY]: onTimebasedQuery,
  [globalConstants.IPC_METHOD_SERVER_DEBUG]: onServerDebug,
  [globalConstants.IPC_METHOD_FMD_GET]: onFmdGet,
  [globalConstants.IPC_METHOD_FMD_CREATE]: onFmdCreate,
  [globalConstants.IPC_METHOD_MASTER_SESSION]: onGetMasterSession,
  [globalConstants.IPC_METHOD_SESSION_TIME]: onGetSessionTime,
};

module.exports = data => handle(
  controller,
  data,
  payload => process.send(payload)
);
