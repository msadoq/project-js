import __ from 'lodash/fp';
import * as types from '../../types';

const initialState = {
  id: null,
  offset: 0,
  kind: 'Session',
  sessionId: null,
  color: null,
};

export default function timeline(stateTimeline = initialState, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD: {
      const configuration = __.getOr({}, 'payload.configuration', action);
      return Object.assign({}, stateTimeline, {
        id: configuration.id || initialState.id,
        offset: configuration.offset || initialState.offset,
        kind: configuration.kind || initialState.kind,
        color: configuration.color || initialState.color,
        sessionId: (__.isNumber(configuration.sessionId))
          ? configuration.sessionId
          : initialState.sessionId,
      });
    }
    case types.WS_TIMELINE_UPDATE_ID:
      return { ...stateTimeline, id: action.payload.id };
    case types.WS_TIMELINE_UPDATE_OFFSET:
      return { ...stateTimeline, offset: action.payload.offset };
    case types.WS_TIMELINE_UPDATE_COLOR: {
      return { ...stateTimeline, color: action.payload.color };
    }
    case types.WS_TIMELINE_UPDATE_SESSIONID:
      return { ...stateTimeline, sessionId: action.payload.sessionId };
    default:
      return stateTimeline;
  }
}
