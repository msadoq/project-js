import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getAllMessages } from '../../../store/reducers/messages';
import { getSession } from '../../../store/reducers/sessions';
import { getTimebarMasterId } from '../../../store/reducers/timebars';
import { getTimebarTimelinesSelector } from '../../../store/selectors/timebars';

export const getMasterTimelineById = createSelector(
  getTimebarMasterId,
  getTimebarTimelinesSelector,
  (masterTimelineId, timebarTimelines) => {
    if (!masterTimelineId) {
      return undefined;
    }
    if (_.isEmpty(timebarTimelines)) {
      return undefined;
    }
    if (timebarTimelines[0].id === masterTimelineId) {
      return timebarTimelines[0];
    }
    return undefined;
  }
);

export const getTimeSetterMessages = createSelector(
  getAllMessages,
  (state, { timebarUuid }) => timebarUuid,
  (messages, timebarUuid) => _.getOr(null, `timeSetter-${timebarUuid}`, messages)
);

export const getMasterTimelineExists = createSelector(
  getMasterTimelineById,
  Boolean
);

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
