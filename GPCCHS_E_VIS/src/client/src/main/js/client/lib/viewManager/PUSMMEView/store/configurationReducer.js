import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

// const initialConfiguration = {
//   tables: {
//     subSchedules: {
//       name: 'Sub schedules',
//       sorting: {
//         colName: 'ssId',
//         direction: 'DESC',
//       },
//       cols: [
//         { label: 'ssId', title: 'ssId', displayed: true },
//         { label: 'ssIdLabel', title: 'ssIdLabel', displayed: true },
//         { label: 'status', title: 'status', displayed: true },
//         { label: 'lastUpdateModeExecTimeFirstTc', title: 'lastUpdateModeExecTimeFirstTc', displayed: true },
//         { label: 'lastUpdateTimeExecTimeFirstTc', title: 'lastUpdateTimeExecTimeFirstTc', displayed: true },
//         { label: 'serviceApid', title: 'serviceApid', displayed: true },
//         { label: 'serviceApidName', title: 'serviceApidName', displayed: true },
//       ],
//     },
//     enabledApids: {
//       name: 'Enabled APIDs',
//       sorting: {
//         colName: 'apid',
//         direction: 'DESC',
//       },
//       cols: [
//         { title: 'apid', displayed: true },
//         { title: 'apidName', displayed: true },
//         { title: 'status', displayed: true },
//         { title: 'serviceApid', displayed: true },
//         { title: 'serviceApidName', displayed: true },
//       ],
//     },
//     commands: {
//       name: 'Commands',
//       sorting: {
//         colName: 'commandApid',
//         direction: 'DESC',
//       },
//       cols: [
//         { title: 'commandApid', displayed: true },
//         { title: 'commandApidName', displayed: true },
//         { title: 'commandName', displayed: true },
//         { title: 'commandDescription', displayed: true },
//         { title: 'commandSequenceCount', displayed: true },
//         { title: 'commandSourceId', displayed: true },
//         { title: 'commandSsId', displayed: true },
//         { title: 'serviceApid', displayed: true },
//         { title: 'serviceApidName', displayed: true },
//         { title: 'commandGroundStatus', displayed: true },
//         { title: 'commandStatus', displayed: true },
//         { title: 'currentExecutionTime', displayed: true },
//         { title: 'initialExecutionTime', displayed: true },
//         { title: 'totalTimeShiftOffset', displayed: true },
//       ],
//     },
//   },
// };

export default (stateConf = {}, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK: {
      return {
        // ...initialConfiguration,
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
