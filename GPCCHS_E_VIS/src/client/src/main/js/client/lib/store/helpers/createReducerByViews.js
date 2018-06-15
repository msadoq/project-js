// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import * as types from '../types';

// higher order reducer
const createReducerByViews = (simpleReducer, viewType = 'all') => (
  (stateViews = {}, action) => {
    switch (action.type) {
      case types.HSC_CLOSE_WORKSPACE: // clear views when close a workspace
        return {};
      case types.WS_PAGE_CLOSE:
        return _.omit(action.payload.viewIds, stateViews);
      case types.WS_VIEW_OPENED:
      case types.WS_VIEW_ADD_BLANK: {
        if (action.payload.view.type === viewType || viewType === 'all') {
          return _.set(action.payload.view.uuid, simpleReducer(undefined, action), stateViews);
        }
        return stateViews;
      }
      case types.WS_WINDOW_CLOSE:
        return _.omit(action.payload.views, stateViews);
      case types.WS_VIEW_CLOSE: // remove a view
        return _.omit(action.payload.viewId, stateViews);
      case types.WS_PAGE_OPENED:
      case types.WS_WORKSPACE_OPENED: {
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
          const subState = simpleReducer(currentView, action);
          // Update state only if subState is updated to avoid unnecessary computation
          if (stateViews[viewId] !== subState) {
            return _.set(viewId, subState, stateViews);
          }
        }
        return stateViews;
      }
    }
  }
);

export default createReducerByViews;
