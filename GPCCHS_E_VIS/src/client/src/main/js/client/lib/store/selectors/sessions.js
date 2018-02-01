// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Add lint rule on selector signatures
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all selectors from selectors/sessions to reducers/sessions
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove Timebar/Controls/ControlsSelectors + tests .
// END-HISTORY
// ====================================================================

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
