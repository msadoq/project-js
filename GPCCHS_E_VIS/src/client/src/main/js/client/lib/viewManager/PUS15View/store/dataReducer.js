// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import _ from 'lodash/fp';
import parameters from 'common/configurationManager';

import { VM_VIEW_PUS15 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus15DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS15View: {
       *      pus015Model: {
       *        pus015PacketStore: [
       *          ...
       *          pus015Packet: []
       *        ],
       *        ...rest
       *      },
       *    },
       *  },
       * },
       */

      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS15], action);

      if (!data) {
        return state;
      }
      let updatedState = state;

      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus015PacketStore'],
          data
        ),
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'onBoardStorages',
        _.getOr(null, ['pus015PacketStore'], data)
        .map(store => ({
          ..._.omit(['pus015Packet'], store),
          dumpEnabled: String(_.getOr('boolean', 'dumpEnabled', store)),
          downlinkStatus: statuses[String(_.getOr(200, 'downlinkStatus', store))],
          storeStatus: statuses[String(_.getOr(200, 'storeStatus', store))],
          lastUpdateModeStoreId: updateTypes[String(_.getOr(200, 'lastUpdateModeStoreId', store))],
          lastUpdateModeStoreType: updateTypes[String(_.getOr(200, 'lastUpdateModeStoreType', store))],
          lastUpdateModeStoreStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStoreStatus', store))],
          lastUpdateModeDownlinkStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeDownlinkStatus', store))],
        }))
      );
      updatedState = injectTabularData(updatedState, 'storageDef',
        _.getOr([], ['pus015PacketStore'], data)
          .reduce((acc, store) => [...acc, ...store.pus015Packet], [])
          .map(packet => ({
            ...packet,
            ...packet.isSubsamplingRatio ? {
              subsamplingRatio: _.getOr('', 'subsamplingRatio', packet),
              lastUpdateModeSubSamplingRatio: updateTypes[String(_.getOr(200, 'lastUpdateModeSubSamplingRatio', packet))],
            } : { subsamplingRatio: '' },
            serviceType: updateTypes[String(_.getOr('', 'serviceType', packet))],
            serviceSubType: updateTypes[String(_.getOr(200, 'serviceSubType', packet))],
            packetType: updateTypes[String(_.getOr(200, 'packetType', packet))],
            lastUpdateModePacketId: updateTypes[String(_.getOr(200, 'lastUpdateModePacketId', packet))],
          }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus15DataReducer, {}, VM_VIEW_PUS15);

export const getPUS15ViewData = state => state[`${VM_VIEW_PUS15}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS15}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS15}Configuration`][viewId];
