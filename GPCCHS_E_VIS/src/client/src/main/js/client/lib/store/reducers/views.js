import __ from 'lodash/fp';

import composeReducers from '../composeReducers';
import * as types from '../types';
import view from './views/view';

// Main views reducer
function views(stateViews = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE: // clear views when close a workspace
      return {};
    case types.WS_VIEW_REMOVE: { // remove a view
      return __.omit(action.payload.viewId, stateViews);
    }
    default:
      return stateViews;
  }
}

// This is the all views reducer
const allViews = (stateViews = {}, action) => {
  const viewId = __.get('payload.viewId', action);
  if (viewId) {
    const nextView = view(stateViews[viewId], action);
    return __.set(viewId, nextView, stateViews);
  }
  return stateViews;
};

export default composeReducers(views, allViews);
