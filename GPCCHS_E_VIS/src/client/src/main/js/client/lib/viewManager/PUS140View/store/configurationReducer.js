import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';
//
// const initialConfiguration = {
//   tables: {
//     parameters: {
//       name: 'Parameters',
//       sorting: {
//         colName: 'serviceApidName',
//         direction: 'DESC',
//       },
//       cols: [
//         { title: 'serviceApidName', displayed: true },
//         { title: 'serviceApid', displayed: true },
//         { title: 'apidName', displayed: true },
//         { title: 'parameterId', displayed: true },
//         { title: 'parameterName', displayed: true },
//         { title: 'initialValue', displayed: true },
//         { title: 'currentValue', displayed: true },
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
  ['onBoardStorages', 'storageDef'].indexOf(action.payload.tableId) !== -1
;
