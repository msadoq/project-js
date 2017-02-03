import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import globalConstants from 'common/constants';

/**
 * Apply search on timelines and return corresponding sessionId.
 *
 * @param timelines
 * @param masterSessionId
 * @param search
 * @returns {*}
 */
export default function findTimelines(timelines, masterSessionId, search) {
  if (!timelines || !timelines.length) {
    return { error: 'invalid entry point, no timeline available' };
  }
  if (search === '' || _isNull(search) || _isUndefined(search)) {
    return { error: 'invalid entry point, invalid timeline field' };
  }
  if (search === globalConstants.WILDCARD_CHARACTER
    || search === ''
    || _isNull(search)
    || _isUndefined(search)
  ) {
    if (!masterSessionId) {
      return { error: 'invalid entry point, no timeline set and no master session found' };
    }
    return {
      sessionId: masterSessionId,
      offset: 0,
    };
  }

  const sessions = _map(
    _filter(timelines, t => t.id === search),
    t => ({ sessionId: t.sessionId, offset: t.offset })
  );
  if (sessions.length < 1) {
    return { error: 'invalid entry point, no timeline matches' };
  } else if (sessions.length > 1) {
    return { error: 'invalid entry point, more than one timeline match' };
  }

  return sessions[0];
}
