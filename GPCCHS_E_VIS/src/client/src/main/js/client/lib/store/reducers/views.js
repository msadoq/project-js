import __ from 'lodash/fp';

import * as types from '../types';
import view from './views/view';

// Main views reducer
const views = (stateViews = {}, action) => {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE: // clear views when close a workspace
      return {};
    case types.WS_VIEW_ADD: // add a view
      return __.set(action.payload.viewId, view(undefined, action), stateViews);
    case types.WS_VIEW_REMOVE: { // remove a view
      return __.omit(action.payload.viewId, stateViews);
    }
    default: {
      const payload = action.payload || {};
      if (!payload.viewId || !stateViews[payload.viewId]) {
        return stateViews;
      }
      const currentView = stateViews[payload.viewId];
      return __.set(payload.viewId, view(currentView, action), stateViews);
    }
  }
};

export default views;
