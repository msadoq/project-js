import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    packets: {
      name: 'House-Keeping and Diagnostic Packets',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'APID Name', title: 'serviceApidName', displayed: true },
        { label: 'SID', title: 'sid', displayed: true },
        { label: 'SID Label', title: 'sidLabel', displayed: true },
        { label: 'Name', title: 'packetName', displayed: true },
        { label: 'Type', title: 'packetType', displayed: true },
        { label: 'AP Name', title: 'packetApidName', displayed: true },
        { label: 'Status', title: 'status', displayed: true },
        { label: 'Val. Param. ID', title: 'validityParameterId', displayed: true },
        { label: 'Val. Param. Name', title: 'validityParameterName', displayed: true },
        { label: 'Val. Param. Mask', title: 'validityParameterMask', displayed: true },
        { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
        { label: 'Collect. Int.', title: 'collectionInterval', displayed: true },
        { label: 'Forward. Status', title: 'forwardingStatusTypeSubtype', displayed: true },
        { label: 'Forward. Status RID SID', title: 'forwardingStatusRidSid', displayed: true },
        { label: 'Subsamp. Ratio', title: 'subsamplingRatio', displayed: true },
        { label: 'Gen. Mode', title: 'generationMode', displayed: true },
        { label: 'Packet APID', title: 'packetApid', displayed: true },
        { label: 'Service APID', title: 'serviceApid', displayed: true },
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
  ['packets'].indexOf(action.payload.tableId) !== -1
;
