import _ from 'lodash/fp';

import * as types from './types';
import view from './reducers/views/view';

// higher order reducer
const createReducerByViews = (simpleReducer, viewType = 'all') => (
  (stateViews = {}, action) => {
    switch (action.type) {
      case types.HSC_CLOSE_WORKSPACE: // clear views when close a workspace
        return {};
      case types.WS_PAGE_CLOSE:
        return _.omit(action.payload.viewIds, stateViews);
      case types.WS_VIEW_OPEN:
      case types.WS_VIEW_ADD_BLANK: // add a view
        return _.set(action.payload.view.uuid, simpleReducer(undefined, action), stateViews);
      case types.WS_VIEW_CLOSE: // remove a view
        return _.omit(action.payload.viewId, stateViews);
      case types.WS_PAGE_OPEN:
      case types.WS_WORKSPACE_OPEN: {
        const setPayloadView = _.set('payload.view');
        const singleViewReducer = stateView => view(undefined, setPayloadView(stateView, action));
        const filterViews = viewType !== 'all' ? _.filter(_.propEq('viewType', viewType)) : _.identity;
        return _.compose(
          _.defaults(stateViews),       // 4. merge with old stateViews
          _.indexBy('uuid'),            // 3. index views array by uuid
          _.map(singleViewReducer),     // 2. apply single view reducer on each view
          filterViews                   // 1. filter views by viewType if given
        )(action.payload.views);
      }
      default: {
        const viewId = _.get('payload.viewId', action);
        const currentView = _.get(viewId, stateViews);
        if (currentView) {
          return _.set(action.payload.viewId, simpleReducer(currentView, action), stateViews);
        }
        return stateViews;
      }
    }
  }
);

export default createReducerByViews;
