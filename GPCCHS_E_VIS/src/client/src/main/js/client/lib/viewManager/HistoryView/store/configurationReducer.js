// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// END-HISTORY
// ====================================================================

// import _ from 'lodash/fp';
import _without from 'lodash/without';
import * as types from 'store/types';
import { SORTING_DESC } from 'constants';


const comObjectFieldsAreAlreadyDefined = (stateConf, comObject) =>
  stateConf.columns.some(col => col[0] === comObject);

/**
 * Remove comObject fields that are used by no entry point
 *
 * @param stateConf
 */

const syncDisplayedColumns = (stateConf) => {
  const { entryPoints, columns } = stateConf;

  const shouldKeepComObject = comObject =>
    comObject === 'default' ||
    entryPoints.some(ep => ep.connectedData && ep.connectedData.comObject === comObject);

  const updatedColumns =
    columns.filter(comObjectArr => shouldKeepComObject(comObjectArr[0]));

  return {
    ...stateConf,
    columns: updatedColumns,
  };
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default (stateConf, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_SORTING:
      return {
        ...stateConf,
        dataOffset: 0,
        sorting: {
          colName: action.payload.colName,
          direction: action.payload.direction || SORTING_DESC,
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
      const { entryPoint } = action.payload;

      return {
        ...stateConf,
        entryPoints: [
          ...stateConf.entryPoints,
          {
            ...entryPoint,
            connectedData: {
              ...(entryPoint.connectedData),
            },
          },
        ],
      };
    }
    case types.WS_VIEW_UPDATE_ENTRYPOINT:
    case types.WS_VIEW_REMOVE_ENTRYPOINT:
      return syncDisplayedColumns(stateConf);
    case types.WS_VIEW_CHANGE_COL_FILTERS : {
      const { colName, value } = action.payload;
      return {
        ...stateConf,
        dataOffset: 0,
        filters: {
          ...stateConf.filters,
          [colName]: value,
        },
      };
    }
    case types.WS_VIEW_TABLE_SCROLL: {
      const { offset } = action.payload;

      return {
        ...stateConf,
        dataOffset: offset,
      };
    }
    case types.WS_VIEW_TABLE_UPDATE_HEIGHT: {
      const { height } = action.payload;

      return {
        ...stateConf,
        layoutHeight: height,
      };
    }
    case types.WS_VIEW_TABLE_ADD_COLUMNS: {
      const { groupName, fields } = action.payload;

      if (comObjectFieldsAreAlreadyDefined(stateConf, groupName)) {
        return stateConf;
      }

      const newColumnEntry = [
        groupName,
        fields.map(field => ({
          field,
          isDisplayed: true,
        })),
      ];

      return {
        ...stateConf,
        columns: [
          ...stateConf.columns,
          newColumnEntry,
        ],
      };
    }
    default:
      return stateConf;
  }
};
