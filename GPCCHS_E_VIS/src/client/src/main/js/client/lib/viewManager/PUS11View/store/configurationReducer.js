import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    subSchedules: {
      name: 'Sub schedules',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'APID Name', title: 'serviceApidName', displayed: true }, // A afficher dans le tableau SubSchedules
        { label: 'SSID', title: 'ssId', displayed: true }, // A afficher dans le tableau SubSchedules
        { label: 'SSID Label', title: 'ssIdLabel', displayed: true }, // A afficher dans le tableau SubSchedules
        { label: 'Status', title: 'status', displayed: true }, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue. Si 3 (DELETED), supprimer l’entrée du state
        { label: 'First TC Time', title: 'executionTimeFirstTc', displayed: true }, // A afficher dans le tableau SubSchedules
      ],
    },
    enabledApids: {
      name: 'Enabled APIDs',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true }, // A afficher dans le tableau Enabled AP
        { label: 'APID', title: 'apid', displayed: true }, // à afficher dans le tableau Enabled AP
        { label: 'Name', title: 'apidName', displayed: true }, // A afficher dans le tableau Enabled AP
        { label: 'Update Type', title: 'lastUpdateModeApid', displayed: true }, // A afficher dans le tableau Enabled AP
        { label: 'Update Time', title: 'lastUpdateTimeApid', displayed: true }, // A afficher dans le tableau Enabled AP
      ],
    },
    commands: {
      name: 'Commands',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true },
        { label: 'SSID', title: 'commandSsId', displayed: true },
        { label: 'Cmd. Name', title: 'commandName', displayed: true },
        { label: 'Cmd. Short Description', title: 'commandDescription', displayed: true },
        { label: 'Cmd. AP Name', title: 'commandApidName', displayed: true },
        { label: 'Seq. Count', title: 'commandSequenceCount', displayed: true },
        { label: 'Source ID', title: 'commandSourceId', displayed: true },
        { label: 'Cmd. Status', title: 'commandStatus', displayed: true },
        { label: 'Ground Status', title: 'commandGroundStatus', displayed: true },
        { label: 'Init. Exec. Time', title: 'initialExecutionTime', displayed: true },
        { label: 'Cur. Exec. Time', title: 'currentExecutionTime', displayed: true },
        { label: 'Tot. Time Shift', title: 'totalTimeShiftOffset', displayed: true },
      ],
    },
  },
};

export default (stateConf = {}, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK: {
      return {
        ...initialConfiguration,
        ...action.payload.view.configuration,
      };
    }
    case types.WS_VIEW_UPDATE_TABLE_COLS: {
      return isValidTableId(action)
        ? _set(`tables.${action.payload.tableId}.cols`, _getOr([], 'payload.cols', action), stateConf)
        : stateConf
        ;
    }
    default:
      return stateConf;
  }
};

export const isValidTableId = action =>
  _has('payload.tableId', action) &&
  ['enabledApids', 'subSchedules', 'commands'].indexOf(action.payload.tableId) !== -1
;
