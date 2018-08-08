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
        { label: 'APID Name', title: 'serviceApidName', displayed: true },
        { label: 'RID', title: 'rid', displayed: true },
        { label: 'RID Label', title: 'ridLabel', displayed: true },
        { label: 'Name', title: 'reportName', displayed: true },
        { label: 'Status', title: 'onBoardStatus', displayed: true },
        { label: 'Event Short Description', title: 'reportShortDescription', displayed: true },
        { label: 'Event Default Status', title: 'defaultOnBoardStatus', displayed: true },
        { label: 'Alarm Level', title: 'alarmLevel', displayed: true },
        { label: 'Action Name', title: 'actionName', displayed: true },
        { label: 'Event Long Description', title: 'reportLongDescription', displayed: true },
      ],
    },
    received: {
      name: 'Received On-Board Events',
      sorting: {
        colName: 'apid',
        direction: 'DESC',
      },
      cols: [
        { label: 'APID', title: 'apid', displayed: true },
        { label: 'Report ID', title: 'reportId', displayed: true },
        { label: 'Report Name', title: 'reportName', displayed: true },
        { label: 'Event Type', title: 'eventType', displayed: true },
        { label: 'Alarm Lvl', title: 'alarmLevel', displayed: true },
        { label: 'OnBoard Date', title: 'onBoardDate', displayed: true },
        { label: 'Ground Date', title: 'groundDate', displayed: true },
        { label: 'Param 1', title: 'param1', displayed: true },
        { label: 'Param 2', title: 'param2', displayed: true },
        { label: 'Param 3', title: 'param3', displayed: true },
        { label: 'Param 4', title: 'param4', displayed: true },
        { label: 'Param 5', title: 'param5', displayed: true },
        { label: 'Param 6', title: 'param6', displayed: true },
        { label: 'Param 7', title: 'param7', displayed: true },
        { label: 'Param 8', title: 'param8', displayed: true },
        { label: 'Param 9', title: 'param9', displayed: true },
        { label: 'Param 10', title: 'param10', displayed: true },
        { label: 'Value 1', title: 'value1', displayed: true },
        { label: 'Value 2', title: 'value2', displayed: true },
        { label: 'Value 3', title: 'value3', displayed: true },
        { label: 'Value 4', title: 'value4', displayed: true },
        { label: 'Value 5', title: 'value5', displayed: true },
        { label: 'Value 6', title: 'value6', displayed: true },
        { label: 'Value 7', title: 'value7', displayed: true },
        { label: 'Value 8', title: 'value8', displayed: true },
        { label: 'Value 9', title: 'value9', displayed: true },
        { label: 'Value 10', title: 'value10', displayed: true },
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
