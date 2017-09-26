// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import { get } from '../../common/configurationManager';

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
