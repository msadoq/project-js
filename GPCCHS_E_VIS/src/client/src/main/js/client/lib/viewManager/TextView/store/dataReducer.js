import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

import cleanCurrentViewData from './cleanViewData';
import { selectDataPerView, viewDataUpdate } from './viewDataUpdate';
// import cleanViewData from './cleanViewData';

import * as types from '../../../store/types';
import * as constants from '../../constants';

const initialState = {
  index: {},
  values: {},
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function textViewData(state = {}, action) {
  switch (action.type) {
    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_VIEW_ADD_BLANK:
      if (action.payload.view.type !== constants.VM_VIEW_TEXT) {
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
          if (view.type !== constants.VM_VIEW_TEXT) {
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
    case types.INJECT_DATA_LAST: {
      const oldIntervals = action.payload.oldExpectedLastIntervals;
      const newIntervals = action.payload.newExpectedLastIntervals;
      const { dataToInject, newViewMap, oldViewMap } = action.payload;
      const dataKeys = Object.keys(dataToInject);
      // If nothing changed and no data to import, return state
      const viewMapIsEqual = _isEqual(newViewMap, oldViewMap);
      const intervalsAreEqual = _isEqual(newIntervals, oldIntervals);
      if (viewMapIsEqual && intervalsAreEqual && !dataKeys.length) {
        return state;
      }
      // since now, state will changed
      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
        const viewData = state[viewId];
        // Cleaning
        const subState = cleanCurrentViewData(
          viewData,
          oldViewMap[viewId],
          newViewMap[viewId],
          oldIntervals,
          newIntervals);
        if (subState !== viewData) {
          newState = { ...newState, [viewId]: subState };
        }
        if (dataKeys.length) {
          // Data Selection
          const epSubState = selectDataPerView(
            newViewMap[viewId],
            newIntervals,
            dataToInject,
            newState[viewId]);
          if (Object.keys(epSubState).length !== 0) {
            const viewState = viewDataUpdate(newState[viewId], epSubState);
            if (viewState !== newState[viewId]) {
              newState = { ...newState, [viewId]: viewState };
            }
          }
        }
      }
      return newState || {};
    }
    /* case types.WS_VIEWDATA_CLEAN: {
      console.log('INJECT NEW DATA');
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
    } */
    default:
      return state;
  }
}

export const getTextViewData = state => state.TextViewData;

export const getData = (state, { viewId }) => state.TextViewData[viewId];
