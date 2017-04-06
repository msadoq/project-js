import _has from 'lodash/has';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import { get } from 'common/parameters';

let memoizedSessions;
let memoizedSearchs = {};

export function reset(sessions) {
  memoizedSessions = sessions;
  memoizedSearchs = {};
}

export function save(search, result) {
  _set(memoizedSearchs, [search], result);
}

export function find(search, sessions, masterSessionId) {
  if (search === get('WILDCARD_CHARACTER')) {
    // return { error: 'invalid entry point, session wildcard not already supported' };
    return { id: masterSessionId };
  }
  if (!sessions || !sessions.length) {
    return { error: 'invalid entry point, no session available' };
  }
  if (search === '' || _isNull(search) || _isUndefined(search)) {
    return { error: 'invalid entry point, invalid session name' };
  }

  // const sessionIds = _map(_filter(sessions, d => d.name === search), d => d.id);
  const sessionIds = _filter(sessions, d => d.name === search);
  if (sessionIds.length < 1) {
    return { error: 'invalid entry point, no session matches' };
  } else if (sessionIds.length > 1) {
    return { error: 'invalid entry point, more than one session match' };
  }

  return sessionIds[0];
}

/**
 * Apply search on sessions and return corresponding sessionId.
 *
 * Search is memoized until session list is common to the whole app.
 *
 * @param sessions
 * @param search
 * @returns {*}
 */
export default function findSession(sessions, sessionName, masterSessionId) {
  // sessions have changed
  if (memoizedSessions !== sessions) {
    reset(sessions);
  }

  // perform new search
  if (!_has(memoizedSearchs, [sessionName])) {
    save(sessionName, find(sessionName, memoizedSessions, masterSessionId));
  }

  return _get(memoizedSearchs, [sessionName]);
}
