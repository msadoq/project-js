import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _isNumber from 'lodash/isNumber';
import * as types from '../types';

export default function timelines(stateTimelines = {}, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD:
      return {
        ...stateTimelines,
        [action.payload.timelineId]: timeline(undefined, action),
      };
    case types.WS_TIMELINE_UPDATE_ID:
      return {
        ...stateTimelines,
        [action.payload.timelineId]: timeline(stateTimelines[action.payload.timelineId], action),
      };
    case types.WS_TIMELINE_UPDATE_OFFSET:
      return {
        ...stateTimelines,
        [action.payload.timelineId]: timeline(stateTimelines[action.payload.timelineId], action),
      };
    case types.WS_TIMELINE_REMOVE:
      return _omit(stateTimelines, [action.payload.timelineId]);
    default:
      return stateTimelines;
  }
}

const initialState = {
  id: null,
  offset: 0,
  kind: 'Session',
  sessionId: null,
  color: null
};

function timeline(stateTimeline = initialState, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD: {
      const configuration = _get(action, 'payload.configuration', {});
      return Object.assign({}, stateTimeline, {
        id: configuration.id || initialState.id,
        offset: configuration.offset || initialState.offset,
        kind: configuration.kind || initialState.kind,
        color: configuration.color || initialState.color,
        sessionId: (_isNumber(configuration.sessionId))
          ? configuration.sessionId
          : initialState.sessionId,
      });
    }
    case types.WS_TIMELINE_UPDATE_ID:
      return { ...stateTimeline, id: action.payload.id };
    case types.WS_TIMELINE_UPDATE_OFFSET:
      return { ...stateTimeline, offset: action.payload.offset };
    default:
      return stateTimeline;
  }
}
