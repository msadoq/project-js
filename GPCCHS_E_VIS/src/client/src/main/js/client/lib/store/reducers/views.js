import __ from 'lodash/fp';

import * as types from '../types';
import {
  updateAxis,
  addAxis,
  removeAxis,
} from './views/axes';
import view from './views/view';

/**
 * Reducer
 */
export default function views(stateViews = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_REMOVE:
      return __.omit(action.payload.viewId, stateViews);

    // VIEW AXIS
    case types.WS_VIEW_UPDATE_AXIS:
      return updateAxis(stateViews, action);
    case types.WS_VIEW_ADD_AXIS:
      return addAxis(stateViews, action);
    case types.WS_VIEW_REMOVE_AXIS:
      return removeAxis(stateViews, action);

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
