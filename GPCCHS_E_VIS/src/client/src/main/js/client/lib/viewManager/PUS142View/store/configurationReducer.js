import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    functionalMonitoring: {
      name: 'Functional Monitoring',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'APID Name', title: 'serviceApidName', displayed: true },
        { label: 'FID', title: 'fmonId', displayed: true },
        { label: 'FID Label', title: 'fmonIdLabel', displayed: true },
        { label: 'Name', title: 'fmonName', displayed: true },
        { label: 'Status', title: 'status', displayed: true },
        { label: 'Checking Status', title: 'checkingStatus', displayed: true },
        { label: 'Protect. Status', title: 'protectionStatus', displayed: true },
        { label: 'RID', title: 'rid', displayed: true },
        { label: 'RID Label', title: 'ridLabel', displayed: true },
        { label: 'RID Status', title: 'ridStatus', displayed: true },
        { label: 'Pakect Name', title: 'packetName', displayed: true }, // pending confirmation
        { label: 'Val. Param', title: 'validityParameterId', displayed: true },
        { label: 'Val. Mask', title: 'validityParameterMask', displayed: true },
        { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
        { label: 'Action TC APID', title: 'actionTcApid', displayed: true },
        { label: 'Action TC Type', title: 'actionTcType', displayed: true },
        { label: 'Action TC SubType', title: 'actionTcSubType', displayed: true },
        { label: 'Action Status', title: 'actionStatus', displayed: true },
        { label: 'Action Name', title: 'actionName', displayed: true },
      ],
    },
    parameterMonitorings: {
      name: 'Parameter Monitorings',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { title: 'serviceApidName', displayed: true },
        { title: 'fmonId', displayed: true },
        { title: 'fmonIdLabel', displayed: true },
        { title: 'paramMonId', displayed: true },
        { title: 'paramMonName', displayed: true },
        { title: 'lastUpdateModeId', displayed: true },
        { title: 'lastUpdateTimeId', displayed: true },
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
  ['functionalMonitoring', 'parameterMonitorings'].indexOf(action.payload.tableId) !== -1
;
