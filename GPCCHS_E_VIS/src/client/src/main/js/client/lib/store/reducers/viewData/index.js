import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import * as types from '../../types';
import cleanViewData from '../../../dataManager/cleanViewData';
import inject from '../../../dataManager/inject';

/* --- Reducer -------------------------------------------------------------- */
export default function viewData(state = {}, action) {
  switch (action.type) {

    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.DATA_UPDATE_VIEWDATA: {
      const newViewMap = action.payload.newViewMap;
      const oldViewMap = action.payload.oldViewMap;
      const oldIntervals = action.payload.oldExpectedIntervals;
      const newIntervals = action.payload.newExpectedIntervals;
      const dataKeys = Object.keys(action.payload.dataToInject);
      // If nothing changed and no data to import, return state
      const viewMapIsEqual = _.isEqual(newViewMap, oldViewMap);
      const intervalsAreEqual = _.isEqual(newIntervals, oldIntervals);
      if (viewMapIsEqual && intervalsAreEqual && !dataKeys.length) {
        return state;
      }
      // since now, state will changed
      let newState;
      // if view definitions have changed => cleaning
      newState = cleanViewData(state, oldViewMap, newViewMap, oldIntervals, newIntervals);

      // Add payloads
      if (dataKeys.length) {
        newState = inject(newState, newViewMap, newIntervals, action.payload.dataToInject);
      }
      return newState || {};
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getViewData = state => state.viewData;
export const getData = createSelector(
  (state, { viewId }) => viewId,
  getViewData,
  _.get
);
