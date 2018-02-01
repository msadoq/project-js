// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Fix bug in update action creator in timelines
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId -> timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace unmountTimeline by removeTimeline .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Discard addAndMountTimeline . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rename TIMELINE_ADD_NEW in TIMELINE_CREATE_NEW .
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Improve store/actions/timelines robustness . .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */

export const createNewTimeline = (timebarUuid, timeline) => {
  const timelineUuid = v4();
  return {
    type: types.WS_TIMELINE_CREATE_NEW,
    payload: {
      timebarUuid,
      timeline: { uuid: timelineUuid, ...timeline },
    },
  };
};

export const removeTimeline = simple(types.WS_TIMELINE_REMOVE, 'timebarUuid', 'timelineUuid');
export const updateId = simple(types.WS_TIMELINE_UPDATE_ID, 'timelineUuid', 'id');
export const updateOffset = simple(types.WS_TIMELINE_UPDATE_OFFSET, 'timelineUuid', 'offset');
export const updateColor = simple(types.WS_TIMELINE_UPDATE_COLOR, 'timelineUuid', 'color');
export const updateSessionName = simple(
  types.WS_TIMELINE_UPDATE_SESSIONNAME,
  'timelineUuid',
  'sessionName'
);

/**
 * Compound actions
 */
export function update(timelineUuid, configuration = {}) {
  return (dispatch) => {
    if (configuration.sessionName) {
      dispatch(updateSessionName(timelineUuid, configuration.sessionName));
    }
    if (configuration.offset) {
      dispatch(updateOffset(timelineUuid, configuration.offset));
    }
    if (configuration.id) {
      dispatch(updateId(timelineUuid, configuration.id));
    }
  };
}
