import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    onBoardCtrlProcedures: {
      name: 'On-Board Control Procedures',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'APID Name', title: 'serviceApidName', displayed: true },
        { label: 'APID', title: 'serviceApid', displayed: true },
        { label: 'Status', title: 'status', displayed: true },
        { label: 'OBCP ID', title: 'obcpId', displayed: true },
        { label: 'OBCP Status', title: 'obcpStatus', displayed: true },
        { label: 'Step', title: 'stepId', displayed: true },
        { label: 'Partition', title: 'partitionId', displayed: true },
        { label: 'Observability Level', title: 'observabilityLevel', displayed: true },
        { label: 'Priority', title: 'priority', displayed: true },
      ],
    },
    procedureParameters: {
      name: 'Procedure Parameters',
      sorting: {
        colName: 'obcpId',
        direction: 'DESC',
      },
      cols: [
        { label: 'OBCP ID', title: 'obcpId', displayed: true },
        { label: 'Parameter ID', title: 'parameterId', displayed: true },
        { label: 'Parameter Name', title: 'parameterName', displayed: true },
        { label: 'Value', title: 'value', displayed: true },
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
  ['onBoardCtrlProcedures', 'procedureParameters'].indexOf(action.payload.tableId) !== -1
;
