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

/**
 * List of all comObjected (group names) that could be displayed in HistoryView
 *
 * @type {Array}
 */
const availableComObjects = [
  'ReportingParameter',
  'LogbookEvent',
  'ComputedEvent',
  'UserEvent',
  'COP1Status',
];

const comObjectFieldsAreAlreadyDefined = (stateConf, comObject) =>
  stateConf.tables.history.cols.some(col => col.group === comObject);

/**
 * Remove comObject fields that are used by no entry point
 *
 * @param stateConf
 */

const syncDisplayedColumns = (stateConf) => {
  const { entryPoints, tables } = stateConf;
  const { cols } = tables.history;

  const shouldKeepComObject = comObject =>
    comObject === 'default' ||
    entryPoints.some(
      ep => ep.connectedData &&
        ep.connectedData.comObject === comObject &&
        availableComObjects.indexOf(ep.connectedData.comObject) > -1
    );

  const updatedColumns =
    cols.filter(comObjectField => shouldKeepComObject(comObjectField.group));

  return {
    ...stateConf,
    tables: {
      ...stateConf.tables,
      history: {
        ...stateConf.tables.history,
        cols: updatedColumns,
      },
    },
  };
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default (stateConf, action) => {
  switch (action.type) {
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
    case types.WS_VIEW_TABLE_ADD_COLUMNS: {
      const { groupName, fields } = action.payload;
      const tableId = 'history';

      if (comObjectFieldsAreAlreadyDefined(stateConf, groupName)) {
        return stateConf;
      }

      const newColumns =
        fields.map(field => ({
          title: field,
          isDisplayed: true,
          group: groupName,
        }));

      return {
        ...stateConf,
        tables: {
          ...stateConf.tables,
          [tableId]: {
            ...stateConf.tables[tableId],
            cols: [
              ...stateConf.tables[tableId].cols,
              ...newColumns,
            ],
          },
        },
      };
    }
    default:
      return stateConf;
  }
};
