import _has from 'lodash/has';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import { get } from 'common/configurationManager';

let memoizedSessions;
let memoizedSearchs = {};

export function reset(sessions) {
  memoizedSessions = sessions;
  memoizedSearchs = {};
}

export function save(search, result) {
  if (search !== get('WILDCARD_CHARACTER')) {
    _set(memoizedSearchs, [search], result);
  }
}

export function find(
  search,
  sessions,
  masterSessionId,
  viewSessionName,
  pageSessionName,
  workspaceSessionName
) {
  let sessionName = search;
  const wildcardCharacter = get('WILDCARD_CHARACTER');

  if (search === wildcardCharacter) {
    // Look to sessionNames defined on
    // undefined or '*' have the same effect, they are ignored
    if (viewSessionName && viewSessionName !== wildcardCharacter) {
      sessionName = viewSessionName;
    } else if (pageSessionName && pageSessionName !== wildcardCharacter) {
      sessionName = pageSessionName;
    } else if (workspaceSessionName && workspaceSessionName !== wildcardCharacter) {
      sessionName = workspaceSessionName;
    } else {
      return { id: masterSessionId, name: '*' };
    }
  }
  if (!sessions || !sessions.length) {
    return { error: 'invalid entry point, no session available' };
  }
  if (sessionName === '' || _isNull(sessionName) || _isUndefined(sessionName)) {
    return { error: 'invalid entry point, invalid session name' };
  }

  const sessionIds = _filter(sessions, d => d.name === sessionName);
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
 * @param viewSessionName
 * @param pageSessionName
 * @param workspaceSessionName
 * @returns {*}
 */
export default function findSession(
  sessions,
  sessionName,
  masterSessionId,
  viewSessionName,
  pageSessionName,
  workspaceSessionName
) {
  // sessions have changed
  if (memoizedSessions !== sessions) {
    reset(sessions);
  }

  // perform new search
  if (!_has(memoizedSearchs, [sessionName])) {
    const sessionId = find(
      sessionName,
      memoizedSessions,
      masterSessionId,
      viewSessionName,
      pageSessionName,
      workspaceSessionName
    );
    save(sessionName, sessionId);
    return sessionId;
  }

  return _get(memoizedSearchs, [sessionName]);
}
