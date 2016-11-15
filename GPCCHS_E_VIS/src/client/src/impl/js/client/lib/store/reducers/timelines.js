import _ from 'lodash';
import * as types from '../types';

/**
 * Reducer
 */
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
      return _.omit(stateTimelines, [action.payload.timelineId]);
    default:
      return stateTimelines;
  }
}

const initialState = {
  id: null,
  offset: 0,
  kind: 'Session',
  sessionId: 0,
  color: null
};

function timeline(stateTimeline = initialState, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD: {
      const configuration = _.get(action, 'payload.configuration', {});
      return Object.assign({}, stateTimeline, {
        id: configuration.id || initialState.id,
        offset: configuration.offset || initialState.offset,
        kind: configuration.kind || initialState.kind,
        color: configuration.color || initialState.color,
        sessionId: (!configuration.sessionId && configuration.sessionId !== 0) ?
          initialState.sessionId : configuration.sessionId,
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
