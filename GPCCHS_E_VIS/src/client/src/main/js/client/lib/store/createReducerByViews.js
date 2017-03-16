import _ from 'lodash/fp';

import * as types from './types';

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
        const singleViewReducer = stateView => (
          simpleReducer(undefined, setPayloadView(stateView, action))
        );
        const filterViews = viewType !== 'all' ? _.filter(_.propEq('type', viewType)) : _.identity;
        const ret = _.compose(
          _.defaults(stateViews),         // 4. merge with old stateViews
          _.mapValues(singleViewReducer), // 3. apply single view reducer on each view
          _.indexBy('uuid'),              // 2. index views array by uuid
          filterViews                     // 1. filter views by viewType if given
        )(action.payload.views);
        return ret;
      }
      default: {
        const viewId = _.get('payload.viewId', action);
        const currentView = _.get(viewId, stateViews);
        if (currentView) {
          return _.set(viewId, simpleReducer(currentView, action), stateViews);
        }
        return stateViews;
      }
    }
  }
);

export default createReducerByViews;
