import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    packetForwarding: {
      name: 'Table Packet Forwarding',
      sorting: {
        colName: 'serviceApidName',
        direction: 'DESC',
      },
      cols: [
        { label: 'Apid Name', title: 'serviceApidName', displayed: true }, // Inutilisé dans la vue
        { label: 'Name', title: 'packetName', displayed: true }, // A afficher dans le tableau de packets
        { label: 'APID', title: 'packetApid', displayed: true }, // A afficher dans le tableau de packets
        { label: 'AP Name', title: 'packetApidName', displayed: true }, // A afficher dans le tableau de packets
        { label: 'Type', title: 'serviceType', displayed: true }, // A afficher dans le tableau de packets
        { label: 'SubType', title: 'serviceSubType', displayed: true }, // A afficher dans le tableau de packets
        { label: 'Fwd Status (APID/T/ST)', title: 'forwardingStatus', displayed: true }, // A afficher dans le tableau de packets
        { label: 'RID', title: 'rid', displayed: true }, // A afficher dans le tableau de packets
        { label: 'RID Label', title: 'ridLabel', displayed: true }, // A afficher dans le tableau de packets
        { label: 'SID', title: 'sid', displayed: true }, // A afficher dans le tableau de packets
        { label: 'SID Label', title: 'sidLabel', displayed: true }, // A afficher dans le tableau de packets
        { label: 'Sample Ratio', title: 'subsamplingRatio', displayed: true }, // A afficher dans le tableau de packets
        { label: 'Packet Type', title: 'packetType', displayed: true }, // Tooltip sur serviceType, serviceSubType
        { label: 'Fwd Status RID SID', title: 'forwardingStatusRidSid', displayed: true }, // Tooltip sur serviceType, serviceSubType
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
  ['packetForwarding'].indexOf(action.payload.tableId) !== -1
;
