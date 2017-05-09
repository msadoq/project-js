import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import { get } from 'common/parameters';

/**
 * Apply search on timelines and return corresponding sessionId.
 *
 * @param timelines
 * @param search
 * @returns {*}
 */
export default function findTimelines(timelines, search) {
  if (search === get('WILDCARD_CHARACTER')) {
    return { sessionName: get('WILDCARD_CHARACTER'), offset: 0 };
  }
  if (search === '' || _isNull(search) || _isUndefined(search)) {
    return { error: 'invalid entry point, no timeline set' };
  }
  if (!timelines || !timelines.length) {
    return { error: 'invalid entry point, no timeline available' };
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
