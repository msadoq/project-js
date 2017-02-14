import __ from 'lodash/fp';

import * as types from '../types';
import view from './views/view';

/**
 * Reducer
 */
function views(stateViews = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_REMOVE: {
      return __.omit(action.payload.viewId, stateViews);
    }
    default: {
      const viewId = __.get('payload.viewId', action);
      if (viewId) {
        const nextView = view(stateViews[viewId], action);
        return __.set(viewId, nextView, stateViews);
      }
      return stateViews;
    }
  }
}

export default views;
