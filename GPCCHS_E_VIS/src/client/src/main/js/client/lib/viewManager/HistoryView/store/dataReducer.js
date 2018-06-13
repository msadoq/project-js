// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #7111 : 25/09/2017 : Add current in history view data
// VERSION : 2.0.0 : DM : #5806 : 26/09/2017 : alarm view folders creation .
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #8801 : 19/12/2017 : Do not clean data when reload a view
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import _omit from 'lodash/omit';
import * as types from 'store/types';
import * as constants from 'viewManager/constants';

import { viewRangeAdd, selectDataPerView } from './viewDataUpdate';
import cleanCurrentViewData from '../../HistoryView/store/cleanViewData';

const initialState = {
  cols: [],
  data: {},
  indexes: {
    referenceTimestamp: [],
  },
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
    case types.WS_WORKSPACE_OPENED: {
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
    case types.INJECT_DATA_RANGE: {
      const { dataToInject, newViewMap, newExpectedRangeIntervals, configurations, visuWindow }
        = action.payload;
      const dataKeys = Object.keys(dataToInject);
      // If nothing changed and no data to import, return state
      if (!dataKeys.length) {
        return state;
      }
      // Gets configuration for history views
      const configuration = configurations.HistoryViewConfiguration;
      // since now, state will change
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
    case types.WS_VIEW_TABLE_UPDATE_SORT: {
      const { colName } = action.payload;

      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
// eslint-disable-next-line no-loop-func
        const _sortFunc = index => _.get([...index.split(' '), colName], newState[viewId].data);

        const newIndex =
          _.sortBy(
            _sortFunc,
            newState[viewId].indexes.referenceTimestamp
          );

        newState = {
          ...newState,
          [viewId]: {
            ...newState[viewId],
            indexes: {
              referenceTimestamp: newState[viewId].indexes.referenceTimestamp,
              [colName]: newIndex,
            },
          },
        };
      }

      return newState;
    }
    default:
      return state;
  }
}

export const getHistoryViewData = state => state.HistoryViewData;

export const getData = (state, { viewId }) => state.HistoryViewData[viewId];
export const getConfiguration = (state, { viewId }) => state.HistoryViewConfiguration[viewId];
