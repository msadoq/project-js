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

import { VM_VIEW_PUS144 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus144DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS144View: {
       *      pus0144Model: {
       *        pus0144PacketStore: [
       *          ...
       *          pus0144Packet: []
       *        ],
       *        ...rest
       *      },
       *    },
       *  },
       * },
       */

      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS144], action);

      if (!data) {
        return state;
      }
      let updatedState = state;

      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus0144PacketStore'],
          data
        ),
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'onBoardStorages',
        _.getOr(null, ['pus0144PacketStore'], data)
        .map(store => ({
          ..._.omit(['pus0144Packet'], store),
          dumpEnabled: String(_.getOr(200, 'dumpEnabled', store)),
          status: statuses[_.getOr(200, 'status', store)], // map schedule status constant
          lastUpdateModeStoreId: updateTypes[_.getOr(200, 'lastUpdateModeStoreId', store)], // map schedule lastUpdateModeStoreId constant
          lastUpdateModeStoreType: updateTypes[_.getOr(200, 'lastUpdateModeStoreType', store)], // map schedule lastUpdateModeStoreType constant
          lastUpdateModeStoreStatus: updateTypes[_.getOr(200, 'lastUpdateModeStoreStatus', store)], // map schedule lastUpdateModeStoreStatus constant
        }))
      );
      updatedState = injectTabularData(updatedState, 'storageDef',
        _.getOr([], ['pus0144PacketStore'], data)
          .reduce((acc, store) => [...acc, ...store.pus0144Packet], [])
          .map(packet => ({
            ...packet,
            serviceType: updateTypes[_.getOr('', 'serviceType', packet)], // map packets serviceType constant
            serviceSubType: updateTypes[_.getOr(200, 'serviceSubType', packet)], // map packets serviceSubType constant
            packetType: updateTypes[_.getOr(200, 'packetType', packet)], // map packet packetType constant
            isSubsamplingRatioSet: String(_.getOr('', 'isSubsamplingRatioSet', packet)),
            lastUpdateModePacketId: updateTypes[_.getOr(200, 'lastUpdateModePacketId', packet)], // map schedule lastUpdateModePacketId constant
            lastUpdateModeSubSamplingRatio: updateTypes[_.getOr(200, 'lastUpdateModeSubSamplingRatio', packet)], // map schedule lastUpdateModeSubSamplingRatio constant
          }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus144DataReducer, {}, VM_VIEW_PUS144);

export const getPUS144ViewData = state => state[`${VM_VIEW_PUS144}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS144}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS144}Configuration`][viewId];
