import _ from 'lodash/fp';

import {
  DATA_REMOVE_ALL_VIEWDATA,
  HSC_CLOSE_WORKSPACE,
  WS_VIEW_OPENED,
  WS_VIEW_ADD_BLANK,
  WS_PAGE_OPENED,
  WS_WORKSPACE_OPENED,
  WS_VIEW_CLOSE,
  WS_PAGE_CLOSE,
} from 'store/types';


export default (scopedDataReducer, initialState = {}, viewType = null) =>
  (state = {}, action) => {
    switch (action.type) {
      case DATA_REMOVE_ALL_VIEWDATA:
      case HSC_CLOSE_WORKSPACE:
        return {};
      case WS_VIEW_OPENED:
      case WS_VIEW_ADD_BLANK:
        if (action.payload.view.type !== viewType) {
          return state;
        }

        return _.set(
          [action.payload.view.uuid],
          initialState,
          state
        );
      case WS_PAGE_OPENED:
      case WS_WORKSPACE_OPENED: {
        const { views } = action.payload;
        if (!views) {
          return state;
        }
        const newState = {};
        views.forEach((view) => {
          if (view.type !== viewType) {
            return;
          }
          newState[view.uuid] = initialState;
        });
        return { ...state, ...newState };
      }
      case WS_VIEW_CLOSE: {
        const { viewId } = action.payload;
        if (state[viewId]) {
          return _.omit(viewId, state);
        }
        return state;
      }
      case WS_PAGE_CLOSE: {
        const { viewIds } = action.payload;
        if (!viewIds.length) {
          return state;
        }
        let newState = state;
        viewIds.forEach((viewId) => {
          if (state[viewId]) {
            newState = _.omit(viewId, state);
          }
        });
        return newState;
      }
      default: {
        const viewId = _.get(['payload', 'viewId'], action);

        if (viewId && state[viewId]) { // scoped action
          return _.set(
            viewId,
            scopedDataReducer(state[viewId], action),
            state
          );
        }

        let updatedState = state;

        if (!viewId) { // multicast action
          Object.keys(updatedState).forEach((viewKey) => {
            updatedState = _.set(
              viewId,
              scopedDataReducer(state[viewKey], action),
              state
            );
          });
        }

        return updatedState;
      }
    }
  };
