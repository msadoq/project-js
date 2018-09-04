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

import _ from 'lodash/fp';
import * as types from 'store/types';

const HISTORY_TABLE_ID = 'history';

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

const REPORTING_DEFAULT_FIELDS = ['apid', 'service', 'subService', 'packetType'];

const comObjectFieldsAreAlreadyDefined = (stateConf, comObject) =>
  stateConf.tables.history.cols.some(col => col.group === comObject);

/**
 * Remove comObject fields that are used by no entry point from the specified `stateConf`
 *
 * @param {object} stateConf
 * @return {object} the updated stateConf
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

  return _.set(
    ['tables', HISTORY_TABLE_ID, 'cols'],
    updatedColumns,
    stateConf
  );
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default (stateConf, action) => {
  switch (action.type) {
    case types.WS_VIEW_ADD_ENTRYPOINT: {
      const { entryPoint } = action.payload;

      const existingEntryPoints = _.getOr([], 'entryPoints', stateConf);

      return _.set(
        'entryPoints',
        [...existingEntryPoints, entryPoint],
        stateConf
      );
    }
    case types.WS_VIEW_UPDATE_ENTRYPOINT:
    case types.WS_VIEW_REMOVE_ENTRYPOINT:
      return syncDisplayedColumns(stateConf);
    case types.WS_VIEW_TABLE_ADD_COLUMNS: {
      const { groupName, fields } = action.payload;
      if (comObjectFieldsAreAlreadyDefined(stateConf, groupName)) {
        return stateConf;
      }

      let updatedFields = fields;

      if (groupName === 'ReportingParameter') {
        updatedFields = [...fields, ...REPORTING_DEFAULT_FIELDS];
      }

      const colsPath = ['tables', HISTORY_TABLE_ID, 'cols'];

      const existingColumns = _.getOr([], ['tables', HISTORY_TABLE_ID, 'cols'], stateConf);

      const newColumns =
        updatedFields.map(field => ({
          title: field,
          displayed: true,
          group: groupName,
        }));

      return _.set(colsPath, [...existingColumns, ...newColumns], stateConf);
    }
    default:
      return stateConf;
  }
};
