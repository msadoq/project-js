import _ from 'lodash';
import { createSelector } from 'reselect';

// simple
export const getSessions = state => state.sessions;

// simple
export const getSession = createSelector(
  (state, { sessionId }) => sessionId,
  getSessions,
  (sessionId, sessions) => _.find(_.defaultTo(sessions, []), s => s.id === sessionId)
);
