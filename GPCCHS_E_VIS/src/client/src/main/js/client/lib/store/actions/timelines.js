import _isNumber from 'lodash/isNumber';
import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMELINE_ADD, 'timelineUuid', 'configuration');
export const remove = simple(types.WS_TIMELINE_REMOVE, 'timelineUuid');
export const updateId = simple(types.WS_TIMELINE_UPDATE_ID, 'timelineUuid', 'id');
export const updateOffset = simple(types.WS_TIMELINE_UPDATE_OFFSET, 'timelineUuid', 'offset');
export const updateColor = simple(types.WS_TIMELINE_UPDATE_COLOR, 'timelineUuid', 'color');
export const updateSessionId = simple(
  types.WS_TIMELINE_UPDATE_SESSIONID,
  'timelineUuid',
  'sessionId'
);

/**
 * Compound actions
 */
export function update(timelineUuid, configuration) {
  return (dispatch) => {
    if (_isNumber(configuration.sessionId)) {
      dispatch(updateSessionId(timelineUuid, configuration.sessionId));
    }
    if (configuration.offset) {
      dispatch(updateOffset(timelineUuid, configuration.offset));
    }
    if (configuration.id) {
      dispatch(updateId(timelineUuid, configuration.id));
    }
  };
}
