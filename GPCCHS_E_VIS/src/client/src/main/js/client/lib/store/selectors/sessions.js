import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getSession } from '../reducers/sessions';
import { getMasterTimelineById } from '../selectors/timelines';

const getCurrentSession = (state, ownProps) => {
  const masterTimeline = getMasterTimelineById(state, ownProps);
  if (masterTimeline) {
    const currentSession = getSession(state, { sessionName: masterTimeline.sessionName });
    return currentSession;
  }
  return null;
};

export const getCurrentSessionId = createSelector(
  getCurrentSession,
  _.get('id')
);

export const getCurrentSessionExists = createSelector(
  getCurrentSession,
  Boolean
);
