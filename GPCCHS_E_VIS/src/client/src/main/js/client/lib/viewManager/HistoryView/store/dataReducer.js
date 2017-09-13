import _omit from 'lodash/omit';
import _concat from 'lodash/concat';
import _without from 'lodash/without';
import cleanCurrentViewData from './cleanViewData';
// import { viewRangeAdd, selectDataPerView } from './viewDataUpdate';
// import { getStore } from '../../../serverProcess/store';
// import { getConfigurationByViewId } from '../../selectors';

import * as types from '../../../store/types';
import * as constants from '../../constants';

const initialState = {
  cols: [],
  lines: [],
};
/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function historyViewData(state = {}, action) {
  switch (action.type) {
    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_RELOAD:
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
      const index = action.payload.index || state[viewId].cols.length;
      let newCols = [];
      if (index > 0) {
        newCols = _concat(
          state[viewId].cols.slice(0, index),
          action.payload.colName,
          state[viewId].cols.slice(index)
        );
      } else {
        newCols = _concat(
          action.payload.colName,
          state[viewId].cols
        );
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
    // case types.INJECT_DATA_RANGE: {
    //   const { dataToInject, newViewMap, newExpectedRangeIntervals } = action.payload;
    //   const dataKeys = Object.keys(dataToInject);
    //   // If nothing changed and no data to import, return state
    //   if (!dataKeys.length) {
    //     return state;
    //   }
    //   // since now, state will changed
    //   let newState = state;
    //   const viewIds = Object.keys(state);
    //   for (let i = 0; i < viewIds.length; i += 1) {
    //     const viewId = viewIds[i];
    //     const historyConfig = getConfigurationByViewId(getStore().getState(), { viewId });
    //     const sorting = historyConfig.sorting; // colName, direction
    //     // Data Selection
    //     const epSubState =
    //       selectDataPerView(newViewMap[viewId], newExpectedRangeIntervals, dataToInject, sorting);
    //     if (Object.keys(epSubState).length !== 0) {
    //       // Data injection
    //       const viewState = viewRangeAdd(newState[viewId], viewId, epSubState, historyConfig);
    //       if (viewState !== newState[viewId]) {
    //         newState = { ...newState, [viewId]: viewState };
    //       }
    //     }
    //   }
    //   return newState || {};
    // }
    case types.WS_VIEWDATA_CLEAN: {
      const { previousDataMap, dataMap } = action.payload;

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
          dataMap.expectedRangeIntervals);
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
