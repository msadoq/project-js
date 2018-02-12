// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all selectors from selectors/sessions to reducers/sessions
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : Fix / refacto and test timebar controls components
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import _find from 'lodash/find';
import _isNull from 'lodash/isNumber';
import _filter from 'lodash/filter';
import _isUndefined from 'lodash/isUndefined';
import * as types from 'store/types';
import { getMasterSessionId } from 'store/reducers/masterSession';
import { getTimelineById } from 'store/reducers/timelines';
import { getPageSessionName } from 'store/reducers/pages';
import { getView } from '../views';
import { get } from '../../../common/configurationManager';
import { getSessionName } from '../hsc';

/* --- Reducer -------------------------------------------------------------- */
export default function sessionsReducer(state = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_SESSIONS:
      return _.clone(action.payload.sessions);
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */
export const getSessions = state => state.sessions;
export const getSessionByTimelineId = createSelector(
  getTimelineById,
  getSessions,
  (timeline, sessions) => _find(sessions, session =>
    _.getOr({}, ['sessionName'], timeline) === session.name
  )
);

export const getSession = createSelector(
  (state, { sessionName }) => sessionName,
  getSessions,
  (sessionName, sessions = []) => _.find(_.propEq('name', sessionName), sessions)
);

export const getSessionId = createSelector(
  getSession,
  session => session && session.id
);

/**
 * @param sessionName
 * @param viewId
 * @param pageId
 * @return
 *  found session if exists
 *  or undefined if not
 *  or error if cannot proceed to fallback
 */
export const getSessionByNameWithFallback = createSelector(
  (state, { sessionName }) => sessionName,
  getMasterSessionId,
  getSessions,
  getView,
  (state, { pageId }) => getPageSessionName(state, { pageId }),
  getSessionName,
  (search, masterSessionId, sessions = [], view, pageSessionName, workspaceSessionName) => {
    let sessionName = search;
    const wildcardCharacter = get('WILDCARD_CHARACTER');
    if (sessionName === wildcardCharacter) {
      if (view && view.sessionName && view.sessionName !== wildcardCharacter) { // 1. view
        sessionName = view.sessionName;
      } else if (pageSessionName && pageSessionName !== wildcardCharacter) {  // 2. page
        sessionName = pageSessionName;
      } else if (workspaceSessionName && workspaceSessionName !== wildcardCharacter) { // 3. workspace
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
);
