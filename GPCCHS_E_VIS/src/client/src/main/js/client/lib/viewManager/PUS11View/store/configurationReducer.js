import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    subSchedules: {
      name: 'Sub schedules',
      sorting: {
        colName: 'ssId',
        direction: 'DESC',
      },
      cols: [
        { title: 'ssId', displayed: true }, // A afficher dans le tableau SubSchedules
        { title: 'ssIdLabel', displayed: true }, // A afficher dans le tableau SubSchedules
        { title: 'status', displayed: true }, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue. Si 3 (DELETED), supprimer l’entrée du state
        // { title: 'lastUpdateModeSubScheduleId', displayed: true }, // Tooltip sur ssId
        // { title: 'lastUpdateTimeSubscheduleId', displayed: true }, // Tooltip sur ssId
        // { title: 'lastUpdateModeStatus', displayed: true }, // Tooltip sur Status
        // { title: 'lastUpdateTimeStatus', displayed: true }, // Tooltip sur Status
        { title: 'lastUpdateModeExecTimeFirstTc', displayed: true }, // A afficher dans le tableau SubSchedules
        { title: 'lastUpdateTimeExecTimeFirstTc', displayed: true }, // A afficher dans le tableau SubSchedules
        { title: 'serviceApid', displayed: true }, // A afficher dans le tableau SubSchedules
        { title: 'serviceApidName', displayed: true }, // A afficher dans le tableau SubSchedules
        // { title: 'uniqueId', displayed: true }, // inutilisé dans la vue
      ],
    },
    enabledApids: {
      name: 'Enabled APIDs',
      sorting: {
        colName: 'apid',
        direction: 'DESC',
      },
      cols: [
        { title: 'apid', displayed: true }, // à afficher dans le tableau Enabled AP
        { title: 'apidName', displayed: true }, // A afficher dans le tableau Enabled AP
        // { title: 'lastUpdateModeApid', displayed: true }, // Tooltip sur apid / apidName
        // { title: 'lastUpdateTimeApid', displayed: true }, // Tooltip sur apid / apidName
        { title: 'status', displayed: true }, // N’afficher dans le tableau des Apids que ceux dont le status est à Enabled
        { title: 'serviceApid', displayed: true }, // A afficher dans le tableau Enabled AP
        { title: 'serviceApidName', displayed: true }, // A afficher dans le tableau Enabled AP
        // { title: 'uniqueId', displayed: true }, // inutilisé dans la vue
      ],
    },
    commands: {
      name: 'Commands',
      sorting: {
        colName: 'commandApid',
        direction: 'DESC',
      },
      cols: [
        // { title: 'uniqueId', displayed: true }, // inutilisé dans la vue
        { title: 'commandApid', displayed: true }, // A afficher dans le tableau Commands
        { title: 'commandApidName', displayed: true }, // A afficher dans le tableau Commands
        { title: 'commandName', displayed: true }, // A afficher dans le tableau Commands
        { title: 'commandDescription', displayed: true }, // A afficher dans le tableau Commands
        { title: 'commandSequenceCount', displayed: true }, // A afficher dans le tableau Commands
        { title: 'commandSourceId', displayed: true }, // A afficher dans le tableau Commands
        { title: 'commandSsId', displayed: true }, // A afficher dans le tableau Commands
        { title: 'serviceApid', displayed: true }, // A afficher dans le tableau Commands
        { title: 'serviceApidName', displayed: true }, // A afficher dans le tableau Commands
        // { title: 'lastUpdateModeCommandId', displayed: true }, // Tooltip sur commandSsId
        // { title: 'lastUpdateTimeCommandId', displayed: true }, // Tooltip sur commandSsId
        // { title: 'commandBinaryProfile', displayed: true }, // A afficher dans la popin
        // { title: 'lastUpdateModeBinProf', displayed: true }, // Tooltip dans la popin
        // { title: 'lastUpdateTimeBinProf', displayed: true }, // Tooltip dans la popin
        { title: 'commandGroundStatus', displayed: true }, // A afficher dans le tableau Commands
        // { title: 'lastUpdateModeGroundStatus', displayed: true }, // Tooltip sur commandGroundStatus
        // { title: 'lastUpdateTimeGroundStatus', displayed: true }, // Tooltip sur commandGroundStatus
        { title: 'commandStatus', displayed: true }, // A afficher dans le tableau Commands. Si 3 (DELETED), supprimer l’entrée du state
        // { title: 'lastUpdateModeStatus', displayed: true }, // Tooltip sur status
        // { title: 'lastUpdateTimeStatus', displayed: true }, // Tooltip sur status
        { title: 'currentExecutionTime', displayed: true }, // A afficher dans le tableau Commands
        // { title: 'lastUpdateModeCurrentExecTime', displayed: true }, // Tooltip sur currentExecutionTime
        // { title: 'lastUpdateTimeCurrentExecTime', displayed: true }, // Tooltip sur currentExecutionTime
        { title: 'initialExecutionTime', displayed: true }, // A afficher dans le tableau Commands
        // { title: 'lastUpdateModeInitialExecTime', displayed: true }, // Tooltip sur initialExecutionTime
        // { title: 'lastUpdateTimeInitialExecTime', displayed: true }, // Tooltip sur initialExecutionTime
        { title: 'totalTimeShiftOffset', displayed: true }, // A afficher dans le tableau Commands
        // { title: 'lastUpdateModeTotalTimeShiftOffset', displayed: true }, // Tooltip sur totalTimeShiftOffset
        // { title: 'lastUpdateTimeTotalTimeShiftOffset', displayed: true }, // Tooltip sur totalTimeShiftOffset
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
