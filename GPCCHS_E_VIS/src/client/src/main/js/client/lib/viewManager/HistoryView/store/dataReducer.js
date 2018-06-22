/* eslint-disable no-restricted-syntax */
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


import * as types from 'store/types';
import { viewRangeAdd, selectDataPerView } from './viewDataUpdate';
import cleanCurrentViewData from './cleanViewData';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { VM_VIEW_HISTORY } from '../../constants';


/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
const scopedHistoryDataReducer = (state = {}, action, viewId) => {
  switch (action.type) {
    case types.INJECT_DATA_RANGE: {
      const { dataToInject, newViewMap, newExpectedRangeIntervals }
        = action.payload;

      const dataKeys = Object.keys(dataToInject);
      if (!dataKeys.length) {
        return state;
      }
      let updatedState = state;
      const epSubState =
        selectDataPerView(newViewMap[viewId], newExpectedRangeIntervals, dataToInject);
      if (Object.keys(epSubState).length !== 0) {
        updatedState =
          viewRangeAdd(updatedState, viewId, epSubState);
      }
      return updatedState;
    }
    case types.WS_VIEWDATA_CLEAN: {
      const { previousDataMap, dataMap, configuration } = action.payload;
      let updatedState = state;
      updatedState = cleanCurrentViewData(
        updatedState,
        previousDataMap.perView[viewId],
        dataMap.perView[viewId],
        previousDataMap.expectedRangeIntervals,
        dataMap.expectedRangeIntervals,
        configuration.HistoryViewConfiguration[viewId]
      );
      return updatedState;
    }
    default:
      return state;
  }
};

export const getData = (state, { viewId }) => state.HistoryViewData[viewId];

export default createScopedDataReducer(scopedHistoryDataReducer, {}, VM_VIEW_HISTORY);
