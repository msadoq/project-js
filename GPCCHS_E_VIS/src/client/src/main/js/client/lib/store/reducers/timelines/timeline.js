import _ from 'lodash/fp';
import * as types from 'store/types';

const initialState = {
  id: null,
  offset: 0,
  kind: 'Session',
  sessionName: null,
  color: '#31b0d5',
};

export default function timeline(stateTimeline = initialState, action) {
  switch (action.type) {
    case types.WS_TIMELINE_CREATE_NEW:
    case types.WS_WORKSPACE_OPENED: {
      return _.merge(stateTimeline, action.payload.timeline);
    }
    case types.WS_TIMELINE_UPDATE_ID:
      return { ...stateTimeline, id: action.payload.id };
    case types.WS_TIMELINE_UPDATE_OFFSET:
      return { ...stateTimeline, offset: action.payload.offset };
    case types.WS_TIMELINE_UPDATE_COLOR: {
      return { ...stateTimeline, color: action.payload.color };
    }
    case types.WS_TIMELINE_UPDATE_SESSIONNAME:
      return { ...stateTimeline, sessionName: action.payload.sessionName };
    default:
      return stateTimeline;
  }
}
