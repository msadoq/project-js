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
import * as types from 'store/types';

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

export const getSession = createSelector(
  (state, { sessionName }) => sessionName,
  getSessions,
  (sessionName, sessions = []) => _.find(_.propEq('name', sessionName), sessions)
);


export const getSessionId = createSelector(
  getSession,
  session => session && session.id
);
