// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// END-HISTORY
// ====================================================================

import { parallel } from 'async';
import getLogger from 'common/logManager';
import { dc } from '../ipc';

const TIMEOUT = 2500;

const logger = getLogger('server:fetchInitialData');

/**
 * Operate a ZMQ request with 'header' and return result to callback
 * Returns an error if request wasn't resolve after TIMEOUT ms.
 *
 * @param type
 * @param requestMethod
 * @param callback
 */
function requestWithTimeout(type, requestMethod, callback) {
  logger.info(`requesting ${type}...`);

  // register a timeout
  let timeout = setTimeout(() => {
    timeout = null;
    logger.error(`Timeout while retrieving launching data: ${type}`);
    callback(new Error(`Timeout while retrieving launching data: ${type}`));
  }, TIMEOUT);
  const clear = () => timeout !== null && clearTimeout(timeout);

  // trigger request
  requestMethod((error, payload) => {
    clear();

    logger.info(`${type} received`);
    callback(error, payload);
  });
}

/**
 * Retrieve and pass to callback domains, master session Id and sessions from LPISIS
 *
 * @param callback
 */
export default function fetchInitialData(callback) {
  parallel({
    masterSessionId: fn => requestWithTimeout('master session id', dc.requestMasterSession, fn),
    sessions: fn => requestWithTimeout('sessions', dc.requestSessions, fn),
    domains: fn => requestWithTimeout('domains', dc.requestDomains, fn),
  }, callback);
}
