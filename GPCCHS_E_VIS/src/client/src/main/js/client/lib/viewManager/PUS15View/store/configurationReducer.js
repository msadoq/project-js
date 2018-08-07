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
        { title: 'serviceApidName', displayed: true },
        { title: 'storeId', displayed: true },
        { title: 'hkStoreStatusParameterName', displayed: true },
        { title: 'dumpEnabled', displayed: true },
        { title: 'storeStatus', displayed: true },
        { title: 'downlinkStatus', displayed: true },
        { title: 'storageType', displayed: true },
        { title: 'storeName', displayed: true },
        { title: 'hkDownlinkStatusParameterName', displayed: true },
      ],
    },
    storageDef: {
      name: 'Storage Definitions',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { title: 'serviceApidName', displayed: true },
        { title: 'packetApid', displayed: true },
        { title: 'packetApidName', displayed: true },
        { title: 'serviceType', displayed: true },
        { title: 'serviceSubType', displayed: true },
        { title: 'sid', displayed: true },
        { title: 'sidLabel', displayed: true },
        { title: 'sidName', displayed: true },
        { title: 'subsamplingRatio', displayed: true },
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
