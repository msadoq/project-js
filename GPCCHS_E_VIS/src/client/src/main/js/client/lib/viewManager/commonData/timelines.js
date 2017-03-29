import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import { get } from 'common/parameters';

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
  if (search === get('WILDCARD_CHARACTER')
    || search === ''
    || _isNull(search)
    || _isUndefined(search)
  ) {
    if (!masterSessionId) {
      return { error: 'invalid entry point, no timeline set and no master session found' };
    }
    return {
      sessionId: masterSessionId,
      sessionName: '*',
      offset: 0,
    };
  }

  const sessions = _map(
    _filter(timelines, t => t.id === search),
    t => ({ sessionName: t.sessionName, offset: t.offset })
  );
  if (sessions.length < 1) {
    return { error: 'invalid entry point, no timeline matches' };
  } else if (sessions.length > 1) {
    return { error: 'invalid entry point, more than one timeline match' };
  }

  return sessions[0];
}
