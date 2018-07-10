import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    pus014TmPacket: {
      name: 'Tm Packets',
      sorting: {
        colName: 'packetApid',
        direction: 'DESC',
      },
      cols: [
        { title: 'packetApid', displayed: true }, // A afficher dans le tableau de packets
        { title: 'forwardingStatus', displayed: true }, // A afficher dans le tableau de packets
        { title: 'lastUpdateModeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
        { title: 'lastUpdateTimeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
        { title: 'packetApidName', displayed: true }, // A afficher dans le tableau de packets
        { title: 'serviceApid', displayed: true }, // Inutilisé dans la vue
        { title: 'packetName', displayed: true }, // A afficher dans le tableau de packets
        { title: 'serviceApidName', displayed: true }, // Inutilisé dans la vue
        { title: 'lastUpdateModeRid', displayed: true }, // Tooltip sur rid / ridLabel
        { title: 'lastUpdateTimeRid', displayed: true }, // Tooltip sur rid / ridLabel
        { title: 'rid', displayed: true }, // A afficher dans le tableau de packets
        { title: 'ridLabel', displayed: true }, // A afficher dans le tableau de packets
        { title: 'lastUpdateModeSid', displayed: true }, // Tooltip sur sid, sidLabel
        { title: 'lastUpdateTimeSid', displayed: true }, // Tooltip sur sid, sidLabel
        { title: 'lastUpdateModeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
        { title: 'lastUpdateTimeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
        { title: 'subsamplingRatio', displayed: true }, // A afficher dans le tableau de packets
        { title: 'sid', displayed: true }, // A afficher dans le tableau de packets
        { title: 'sidLabel', displayed: true }, // A afficher dans le tableau de packets
        { title: 'lastUpdateModeTypeSubType', displayed: true }, // Tooltip sur serviceTpe, serviceSubType
        { title: 'lastUpdateTimeTypeSubType', displayed: true }, // Tooltip sur serviceTpe, serviceSubType
        { title: 'serviceTpe', displayed: true }, // A afficher dans le tableau de packets
        { title: 'serviceSubType', displayed: true }, // A afficher dans le tableau de packets
        // { title: 'uniqueId', displayed: true }, // Inutilisé dans la vue
        { title: 'status', displayed: true }, // Non affiché dans la vue.  Si 3 (DELETED), supprimer l’entrée du state
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
  ['pus014TmPacket'].indexOf(action.payload.tableId) !== -1
;
