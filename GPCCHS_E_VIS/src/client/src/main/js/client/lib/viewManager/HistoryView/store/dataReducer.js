// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

import _omit from 'lodash/omit';
import _concat from 'lodash/concat';
import _without from 'lodash/without';
import * as types from 'store/types';
import * as constants from 'viewManager/constants';

import cleanCurrentViewData from './cleanViewData';
import { viewRangeAdd, selectDataPerView } from './viewDataUpdate';

const initialState = {
  cols: [],
  lines: [],
  data: {},
  indexes: {},
  current: {},
};
/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function historyViewData(state = {}, action) {
  switch (action.type) {
    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_OPENED:
    case types.WS_VIEW_ADD_BLANK:
      if (action.payload.view.type !== constants.VM_VIEW_HISTORY) {
        return state;
      }
      return { ...state, [action.payload.view.uuid]: initialState };
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
      {
        const { views } = action.payload;
        if (!views) {
          return state;
        }
        const newState = {};
        views.forEach((view) => {
          if (view.type !== constants.VM_VIEW_HISTORY) {
            return;
          }
          newState[view.uuid] = initialState;
        });
        return { ...state, ...newState };
      }
    case types.WS_VIEW_CLOSE: {
      const { viewId } = action.payload;
      if (state[viewId]) {
        return _omit(state, viewId);
      }
      return state;
    }
    case types.WS_PAGE_CLOSE: {
      const { viewIds } = action.payload;
      if (!viewIds.length) {
        return state;
      }
      let newState = state;
      viewIds.forEach((viewId) => {
        if (state[viewId]) {
          newState = _omit(newState, viewId);
        }
      });
      return newState;
    }
    case types.WS_VIEW_SHOW_COL: {
      const viewId = action.payload.viewId;
      // Add at the end if no index defined
      let index = action.payload.index;
      if (!index) {
        index = -1;
      }
      let newCols = [];
      if (index > 0 && index < state[viewId].cols.length) {
        newCols = _concat(
          state[viewId].cols.slice(0, index),
          action.payload.colName,
          state[viewId].cols.slice(index)
        );
      } else if (index === 0) {
        newCols = _concat(action.payload.colName, state[viewId].cols);
      } else {
        newCols = _concat(state[viewId].cols, action.payload.colName);
      }

      return { ...state,
        [viewId]: {
          ...state[viewId],
          cols: newCols,
        },
      };
    }
    case types.WS_VIEW_HIDE_COL: {
      const viewId = action.payload.viewId;
      return { ...state,
        [viewId]: {
          ...state[viewId],
          cols: _without(state[action.payload.viewId].cols || [], action.payload.colName),
        },
      };
    }
    case types.INJECT_DATA_RANGE: {
      const { dataToInject, newViewMap, newExpectedRangeIntervals, configurations, visuWindow }
        = action.payload;
      const dataKeys = Object.keys(dataToInject);
      // If nothing changed and no data to import, return state
      if (!dataKeys.length) {
        return state;
      }
      // Gets configurationfor history views
      const configuration = configurations.HistoryViewConfiguration;
      // since now, state will changed
      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
        // Data Selection
        const epSubState =
          selectDataPerView(newViewMap[viewId], newExpectedRangeIntervals, dataToInject);
        if (Object.keys(epSubState).length !== 0) {
          // Data injection
          const viewState =
            viewRangeAdd(newState[viewId], viewId, epSubState, configuration[viewId], visuWindow);
          if (viewState !== newState[viewId]) {
            newState = { ...newState, [viewId]: viewState };
          }
        }
      }
      return newState || {};
    }
    case types.WS_VIEWDATA_CLEAN: {
      const { previousDataMap, dataMap, configuration } = action.payload;

      // since now, state will changed
      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
        const viewData = state[viewId];

        // Cleaning
        const subState = cleanCurrentViewData(
          viewData,
          previousDataMap.perView[viewId],
          dataMap.perView[viewId],
          previousDataMap.expectedRangeIntervals,
          dataMap.expectedRangeIntervals,
          configuration
        );
        if (subState !== viewData) {
          newState = { ...newState, [viewId]: subState };
        }
      }
      return newState;
    }
    default:
      return state;
  }
}

export const getHistoryViewData = state => state.HistoryViewData;

export const getData = (state, { viewId }) => state.HistoryViewData[viewId];
