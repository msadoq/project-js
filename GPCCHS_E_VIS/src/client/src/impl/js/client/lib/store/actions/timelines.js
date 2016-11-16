import _isNumber from 'lodash/isNumber';
import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMELINE_ADD, 'timelineId', 'configuration');
export const remove = simple(types.WS_TIMELINE_REMOVE, 'timelineId');
export const updateId = simple(types.WS_TIMELINE_UPDATE_ID, 'timelineId', 'id');
export const updateName = simple(types.WS_TIMELINE_UPDATE_NAME, 'timelineId', 'name');
export const updateOffset = simple(types.WS_TIMELINE_UPDATE_OFFSET, 'timelineId', 'offset');
export const updateSessionId = simple(
  types.WS_TIMELINE_UPDATE_SESSIONID,
  'timelineId',
  'sessionId'
);

/**
 * Compound actions
 */
export function update(timelineId, configuration) {
  return (dispatch) => {
    if (configuration.name) {
      dispatch(updateName(timelineId, configuration.name));
    }
    if (_isNumber(configuration.sessionId)) {
      dispatch(updateSessionId(timelineId, configuration.sessionId));
    }
    if (configuration.offset) {
      dispatch(updateSessionId(timelineId, configuration.offset));
    }
    if (configuration.id) {
      dispatch(updateName(timelineId, configuration.id));
    }
  };
}
