import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    parameterMonitoringDefinitions: {
      name: 'Parameter Monitoring Definitions',
      sorting: {
        colName: 'monitoringId',
        direction: 'DESC',
      },
      cols: [
        { title: 'monitoringId', displayed: true },
        { title: 'monitoringIdLabel', displayed: true },
        { title: 'monitoringName', displayed: true },
        { title: 'parameterId', displayed: true },
        { title: 'parameterName', displayed: true },
        { title: 'monitoringStatus', displayed: true },
        { title: 'protectionStatus', displayed: true },
        { title: 'monitoringInterval', displayed: true },
        { title: 'repetitionNumber', displayed: true },
        { title: 'checkType', displayed: true },
        { title: 'validityParameterId', displayed: true },
        { title: 'validityParameterName', displayed: true },
        { title: 'validityParameterMask', displayed: true },
        { title: 'validityParameterExpectedValue', displayed: true },
        { title: 'ridEL', displayed: true },
        { title: 'ridLabelEL', displayed: true },
        { title: 'ridStatusEL', displayed: true },
        { title: 'actionStatusEL', displayed: true },
        { title: 'actionNameEL', displayed: true },
        { title: 'maskEL', displayed: true },
        { title: 'valueEL', displayed: true },
        { title: 'actionTcApidEL', displayed: true },
        { title: 'actionTcTypeEL', displayed: true },
        { title: 'actionTcSubTypeEL', displayed: true },
        { title: 'ridH', displayed: true },
        { title: 'ridLabelH', displayed: true },
        { title: 'ridStatusH', displayed: true },
        { title: 'actionStatusH', displayed: true },
        { title: 'actionNameH', displayed: true },
        { title: 'maskH', displayed: true },
        { title: 'valueH', displayed: true },
        { title: 'actionTcApidH', displayed: true },
        { title: 'actionTcTypeH', displayed: true },
        { title: 'actionTcSubTypeH', displayed: true },
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
