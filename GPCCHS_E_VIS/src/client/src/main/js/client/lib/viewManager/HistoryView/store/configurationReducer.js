// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Update cols to show in history view
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

// import _ from 'lodash/fp';
import _without from 'lodash/without';
import * as types from 'store/types';
import { SORTING_ASC } from 'constants';

const initialState = {
  allColumns: {},
  sorting: {},
  hiddenColumns: {},
};
/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default (stateConf = initialState, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_SORTING:
      return {
        ...stateConf,
        sorting: {
          colName: action.payload.colName,
          direction: action.payload.direction || SORTING_ASC,
        },
      };
    case types.WS_VIEW_HIDE_COL:
      return {
        ...stateConf,
        hiddenCols: [
          ...stateConf.hiddenCols,
          action.payload.colName,
        ],
      };
    case types.WS_VIEW_SHOW_COL:
      return {
        ...stateConf,
        hiddenCols: _without(stateConf.hiddenCols || [], action.payload.colName),
      };
    case types.WS_VIEW_ADD_COL:
      return {
        ...stateConf,
        allCols: [...stateConf.allCols, action.payload.colName],
      };
    case types.WS_VIEW_REMOVE_COL:
      return {
        ...stateConf,
        allCols: _without(stateConf.allCols || [], action.payload.colName),
        hiddenCols: _without(stateConf.hiddenCols || [], action.payload.colName),
      };
    case types.WS_VIEW_ADD_ENTRYPOINT: {
      return {
        ...stateConf,
        entryPoints: [
          ...stateConf.entryPoints,
          {
            ...action.payload.entryPoint,
            connectedData: {
              ...(action.payload.entryPoint.connectedData),
            },
          },
        ],
      };
    }
    default:
      return stateConf;
  }
};
