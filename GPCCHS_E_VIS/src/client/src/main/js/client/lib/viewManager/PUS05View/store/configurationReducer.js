import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    onBoardEvents: {
      name: 'On-Board Events',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { title: 'serviceApidName', displayed: true },
        { title: 'rid', displayed: true },
        { title: 'ridLabel', displayed: true },
        { title: 'reportName', displayed: true },
        { title: 'onBoardStatus', displayed: true },
        { title: 'reportShortDescription', displayed: true },
        { title: 'defaultOnBoardStatus', displayed: true },
        { title: 'alarmLevel', displayed: true },
        { title: 'actionName', displayed: true },
        { title: 'reportLongDescription', displayed: true },
      ],
    },
    received: {
      name: 'Received On-Board Events',
      sorting: {
        colName: 'apid',
        direction: 'DESC',
      },
      cols: [
        { title: 'apid', displayed: true },
        { title: 'reportId', displayed: true },
        { title: 'reportName', displayed: true },
        { title: 'eventType', displayed: true },
        { title: 'alarmLevel', displayed: true },
        { title: 'onBoardDate', displayed: true },
        { title: 'groundDate', displayed: true },
        { title: 'Param 1', displayed: true },
        { title: 'Value 1', displayed: true },
        { title: 'Param 2', displayed: true },
        { title: 'Value 2', displayed: true },
        { title: 'Param 3', displayed: true },
        { title: 'Value 3', displayed: true },
        { title: 'Param 4', displayed: true },
        { title: 'Value 4', displayed: true },
        { title: 'Param 5', displayed: true },
        { title: 'Value 5', displayed: true },
        { title: 'Param 6', displayed: true },
        { title: 'Value 6', displayed: true },
        { title: 'Param 7', displayed: true },
        { title: 'Value 7', displayed: true },
        { title: 'Param 8', displayed: true },
        { title: 'Value 8', displayed: true },
        { title: 'Param 9', displayed: true },
        { title: 'Value 9', displayed: true },
        { title: 'Param 10', displayed: true },
        { title: 'Value 10', displayed: true },
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
  ['onBoardEvents', 'received'].indexOf(action.payload.tableId) !== -1
;
