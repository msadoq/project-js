import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    uplink: {
      name: 'Table Large Data Transfer - Uplink',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true },
        { label: 'LDU ID', title: 'duId', displayed: true },
        { label: 'Status', title: 'status', displayed: true },
        { label: 'Type', title: 'transferType', displayed: true },
        { label: 'File Type', title: 'fileTypeCode', displayed: true },
        { label: 'Start Time', title: 'startTime', displayed: true },
        { label: 'End Time', title: 'endTime', displayed: true },
        { label: 'Size', title: 'size', displayed: true },
        { label: 'Remain Size', title: 'remainingSize', displayed: true },
        { label: '%', title: 'percent', displayed: true },
        { label: 'Reason', title: 'failureCode', displayed: true },
        { label: 'Partition ID', title: 'partitionId', displayed: true },
        { label: 'File ID', title: 'fileId', displayed: true },
        { label: 'Checksum', title: 'fileChecksum', displayed: true },
      ],
    },
    downlink: {
      name: 'Table Large Data Transfer - Downlink',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true },
        { label: 'LDU ID', title: 'duId', displayed: true },
        { label: 'Status', title: 'status', displayed: true },
        { label: 'Type', title: 'transferType', displayed: true },
        { label: 'File Type', title: 'fileTypeCode', displayed: true },
        { label: 'Start Time', title: 'startTime', displayed: true },
        { label: 'End Time', title: 'endTime', displayed: true },
        { label: 'Size', title: 'size', displayed: true },
        { label: 'Remain Size', title: 'remainingSize', displayed: true },
        { label: '%', title: 'percent', displayed: true },
        { label: 'Reason', title: 'failureCode', displayed: true },
        { label: 'Partition ID', title: 'partitionId', displayed: true },
        { label: 'File ID', title: 'fileId', displayed: true },
        { label: 'Checksum', title: 'fileChecksum', displayed: true },
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
