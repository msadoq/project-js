// import _ from 'lodash/fp';
import _without from 'lodash/without';
import * as types from '../../../store/types';
import { SORTING_UP } from '../../../constants';

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default (stateConf, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_SORTING:
      return {
        ...stateConf,
        sorting: {
          colName: action.payload.colName,
          direction: action.payload.direction || SORTING_UP,
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
