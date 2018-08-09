import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    parameterMonitoringDefinitions: {
      name: 'Parameter Monitoring Definitions',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true },
        { label: 'MID', title: 'monitoringId', displayed: true },
        { label: 'MID Label', title: 'monitoringIdLabel', displayed: true },
        { label: 'Monit. Name', title: 'monitoringName', displayed: true },
        { label: 'Param. ID', title: 'parameterId', displayed: true },
        { label: 'Param. Name', title: 'parameterName', displayed: true },
        { label: 'Monit. Status', title: 'monitoringStatus', displayed: true },
        { label: 'Protect. Status', title: 'protectionStatus', displayed: true },
        { label: 'Interval', title: 'monitoringInterval', displayed: true },
        { label: 'Rep. Number', title: 'repetitionNumber', displayed: true },
        { label: 'Check Type', title: 'checkType', displayed: true },
        { label: 'Val. Param. ID', title: 'validityParameterId', displayed: true },
        { label: 'Val. Param. Name', title: 'validityParameterName', displayed: true },
        { label: 'Val. Param. Mask', title: 'validityParameterMask', displayed: true },
        { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
        { label: 'RID-EL', title: 'ridEL', displayed: true },
        { label: 'RID-EL Label', title: 'ridLabelEL', displayed: true },
        { label: 'Status EL', title: 'ridStatusEL', displayed: true },
        { label: 'Action Status EL', title: 'actionStatusEL', displayed: true },
        { label: 'Action EL', title: 'actionNameEL', displayed: true },
        { label: 'Action Mask EL', title: 'maskEL', displayed: true },
        { label: 'Value EL', title: 'valueEL', displayed: true },
        { label: 'Action EL TC Apid', title: 'actionTcApidEL', displayed: true },
        { label: 'Action EL TC Type', title: 'actionTcTypeEL', displayed: true },
        { label: 'Action EL TC Subtype', title: 'actionTcSubTypeEL', displayed: true },
        { label: 'RID-H', title: 'ridH', displayed: true },
        { label: 'RID-H Label', title: 'ridLabelH', displayed: true },
        { label: 'Status H', title: 'ridStatusH', displayed: true },
        { label: 'Action Status H', title: 'actionStatusH', displayed: true },
        { label: 'Action H', title: 'actionNameH', displayed: true },
        { label: 'Action Mask H', title: 'maskH', displayed: true },
        { label: 'Value H', title: 'valueH', displayed: true },
        { label: 'Action H TC Apid', title: 'actionTcApidH', displayed: true },
        { label: 'Action H TC Type', title: 'actionTcTypeH', displayed: true },
        { label: 'Action H TC Subtype', title: 'actionTcSubTypeH', displayed: true },
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
  ['parameterMonitoringDefinitions'].indexOf(action.payload.tableId) !== -1
;
