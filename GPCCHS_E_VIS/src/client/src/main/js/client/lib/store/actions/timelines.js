import { v4 } from 'uuid';
import simple from '../simpleActionCreator';
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
