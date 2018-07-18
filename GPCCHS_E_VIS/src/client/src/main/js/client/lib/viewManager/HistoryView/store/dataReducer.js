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
import { viewRangeAdd, selectDataPerView } from './viewDataUpdate';
import cleanCurrentViewData from './cleanViewData';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { VM_VIEW_HISTORY } from '../../constants';
import {
  WS_VIEW_ADD_BLANK,
  INJECT_DATA_RANGE,
  WS_VIEW_UPDATE_ENTRYPOINT_NAME,
  WS_VIEWDATA_CLEAN, WS_VIEW_REMOVE_ENTRYPOINT,
} from '../../../store/types';
import {
  mapTabularData,
  DATA_STATE_KEY, removeTabularData,
} from '../../commonData/reducer';


/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
const scopedHistoryDataReducer = (state = {}, action, viewId) => {
  switch (action.type) {
    case WS_VIEW_ADD_BLANK: {
      return _.set(
        ['tables', 'history', DATA_STATE_KEY, 'sort'],
        'referenceTimestamp',
        state
      );
    }
    case INJECT_DATA_RANGE: {
      const {
        dataToInject,
        newViewMap,
        newExpectedRangeIntervals,
        configurations,
        visuWindow,
      }
        = action.payload;

      const historyConfig = configurations.HistoryViewConfiguration[viewId];

      const dataKeys = Object.keys(dataToInject);
      if (!dataKeys.length) {
        return state;
      }
      let updatedState = state;
      const epSubState =
        selectDataPerView(newViewMap[viewId], newExpectedRangeIntervals, dataToInject);
      if (Object.keys(epSubState).length !== 0) {
        updatedState =
          viewRangeAdd(updatedState, viewId, epSubState, historyConfig, visuWindow);
      }
      return updatedState;
    }
    case WS_VIEWDATA_CLEAN: {
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
    case WS_VIEW_UPDATE_ENTRYPOINT_NAME: {
      const { epId, epName } = action.payload;

      return mapTabularData(state, 'history', (el) => {
        if (el.id === epId) {
          return {
            ...el,
            epName,
          };
        }

        return el;
      });
    }
    case WS_VIEW_REMOVE_ENTRYPOINT: {
      const { entryPointId } = action.payload;

      return removeTabularData(state, 'history', e => e.id === entryPointId);
    }
    default:
      return state;
  }
};

export const getData = (state, { viewId }) => state.HistoryViewData[viewId];

export default createScopedDataReducer(scopedHistoryDataReducer, {}, VM_VIEW_HISTORY);
