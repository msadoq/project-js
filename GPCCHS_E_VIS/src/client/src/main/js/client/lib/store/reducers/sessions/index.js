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
  (state, { sessionId }) => sessionId,
  getSessions,
  (sessionId, sessions = []) => _.find(_.propEq('id', sessionId), sessions)
);
