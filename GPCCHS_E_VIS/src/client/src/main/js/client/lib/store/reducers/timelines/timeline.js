// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Refacto timelines reducer OK .
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Timeline has default color in reducer. Fixing Timebar/timelines/TimelineFields default props.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_OPEN action and remove WS_LOAD_DOCUMENTS
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Discard addAndMountTimeline . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Refacto loadDocumentsInStore from documentManager .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rename TIMELINE_ADD_NEW in TIMELINE_CREATE_NEW .
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from '../../types';

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
