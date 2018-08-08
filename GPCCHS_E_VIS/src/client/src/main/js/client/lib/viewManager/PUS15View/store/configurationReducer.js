import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    onBoardStorages: {
      name: 'On-Board Storages',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true },
        { label: 'Store ID', title: 'storeId', displayed: true },
        { label: 'HK Status Parameter', title: 'hkStoreStatusParameterName', displayed: true },
        { label: 'Dump Enabled', title: 'dumpEnabled', displayed: true },
        { label: 'Storage Status', title: 'storeStatus', displayed: true },
        { label: 'Downlink Status', title: 'downlinkStatus', displayed: true },
        { label: 'Type', title: 'storageType', displayed: true },
        { label: 'Name', title: 'storeName', displayed: true },
        { label: 'HK Downlink Status Param. Name', title: 'hkDownlinkStatusParameterName', displayed: true },
      ],
    },
    storageDef: {
      name: 'Storage Definitions',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true },
        { label: 'APID', title: 'packetApid', displayed: true },
        { label: 'AP. Name', title: 'packetApidName', displayed: true },
        { label: 'Type', title: 'serviceType', displayed: true },
        { label: 'SubType', title: 'serviceSubType', displayed: true },
        { label: 'SID', title: 'sid', displayed: true },
        { label: 'SID Label', title: 'sidLabel', displayed: true },
        { label: 'SID Name', title: 'sidName', displayed: true },
        { label: 'Sampling Ratio', title: 'subsamplingRatio', displayed: true },
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
  ['onBoardStorages', 'storageDef'].indexOf(action.payload.tableId) !== -1
;
