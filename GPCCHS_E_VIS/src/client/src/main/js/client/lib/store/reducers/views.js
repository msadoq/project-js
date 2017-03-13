import _ from 'lodash/fp';

import * as types from '../types';
import view from './views/view';

const loadViews = (stateViews, action) => {
  const setPayloadView = _.set('payload.view');
  const singleViewReducer = stateView => view(undefined, setPayloadView(stateView, action));
  return _.compose(
    _.defaults(stateViews),          // 3. merge with old stateViews
    _.indexBy('uuid'),               // 2. index views array by uuid
    _.map(singleViewReducer)         // 1. apply single view reducer on all views
  )(action.payload.views);
};

// Main views reducer
const views = (stateViews = {}, action) => {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE: // clear views when close a workspace
      return {};
    case types.WS_VIEW_OPEN:
    case types.WS_VIEW_ADD_BLANK: // add a view
      return _.set(action.payload.view.uuid, view(undefined, action), stateViews);
    case types.WS_VIEW_CLOSE: // remove a view
      return _.omit(action.payload.viewId, stateViews);
    case types.WS_PAGE_OPEN:
    case types.WS_WORKSPACE_OPEN: {
      return loadViews(stateViews, action);
    }
    default: {
      const viewId = _.get('payload.viewId', action);
      const currentView = _.get(viewId, stateViews);
      if (currentView) {
        return _.set(action.payload.viewId, view(currentView, action), stateViews);
      }
      return stateViews;
    }
  }
};

export default views;
