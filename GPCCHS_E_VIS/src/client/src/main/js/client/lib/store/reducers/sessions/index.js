import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import * as types from '../../types';

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
