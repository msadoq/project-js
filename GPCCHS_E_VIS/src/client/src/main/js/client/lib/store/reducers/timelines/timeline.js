import _ from 'lodash/fp';
import * as types from '../../types';

const initialState = {
  id: null,
  offset: 0,
  kind: 'Session',
  sessionId: null,
  color: '#31b0d5',
};

export default function timeline(stateTimeline = initialState, action) {
  switch (action.type) {
    case types.WS_TIMELINE_CREATE_NEW:
    case types.WS_LOAD_DOCUMENTS: {
      return _.merge(stateTimeline, action.payload.timeline);
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
